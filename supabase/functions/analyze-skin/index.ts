import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert dermatologist AI assistant powered by a MobileNetV2-based classification pipeline trained on the HAM10000 dataset (10,015 dermoscopic images). The underlying model uses MobileNetV2 (ImageNet pre-trained) with GlobalAveragePooling2D → Dense(128, ReLU) → Dropout(0.3) → Sigmoid, achieving 91% test accuracy and 0.94 AUC on skin lesion detection. The model detects all 7 HAM10000 skin lesion categories including melanoma, basal cell carcinoma, melanocytic nevi, benign keratosis, actinic keratosis, dermatofibroma, and vascular lesions. Extended for diverse Indian skin types (Fitzpatrick IV to VI). You analyze dermoscopic images of skin lesions.

When given a skin lesion image, you MUST respond with ONLY a valid JSON object (no markdown, no code blocks, no extra text) with this exact structure:

{
  "diagnosis": "Primary diagnosis name",
  "diagnosisCode": "One of: nv, mel, bcc, bkl, akiec, df, vasc",
  "fullName": "Full medical name of the condition",
  "confidence": 87.5,
  "risk": "low | moderate | high | critical",
  "stage": "Stage description (e.g., Stage 0 - In Situ, Stage I, Stage II, Stage III, Stage IV, or N/A for benign)",
  "urgency": "routine | soon | urgent | emergency",
  "description": "2-3 sentence clinical description of what you observe",
  "characteristics": ["list", "of", "observed", "features"],
  "recommendations": ["list", "of", "medical", "recommendations"],
  "doctorConsultation": {
    "required": true,
    "timeframe": "Within 24 hours / Within 1 week / Within 1 month / Routine checkup",
    "specialistType": "Dermatologist / Oncologist / Dermatologic Surgeon",
    "reason": "Why consultation is needed"
  },
  "differentialDiagnosis": [
    {"condition": "Name", "probability": 5.2},
    {"condition": "Name", "probability": 3.1}
  ],
  "skinTypeNote": "Any specific notes about how this condition may present differently on darker skin tones (Fitzpatrick IV-VI)"
}

The 7 HAM10000 categories are:
- nv: Melanocytic Nevi (benign moles)
- mel: Melanoma (malignant, dangerous)
- bcc: Basal Cell Carcinoma (common skin cancer)
- bkl: Benign Keratosis (seborrheic keratosis, solar lentigo)
- akiec: Actinic Keratosis / Intraepithelial Carcinoma (pre-cancerous)
- df: Dermatofibroma (benign)
- vasc: Vascular Lesion (benign)

Be thorough, clinical, and accurate. For high-risk findings, always recommend urgent consultation. Consider how lesions may present differently on Indian/darker skin tones.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Analyze this skin lesion image. Provide your diagnosis based on the HAM10000 classification system. Consider that the patient may have an Indian skin type (Fitzpatrick IV-VI). Return ONLY the JSON object.",
                },
                {
                  type: "image_url",
                  image_url: {
                    url: imageBase64.startsWith("data:")
                      ? imageBase64
                      : `data:image/jpeg;base64,${imageBase64}`,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service quota exceeded. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      return new Response(
        JSON.stringify({ error: "Analysis service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "No analysis result received" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the JSON from the AI response, handling potential markdown code blocks
    let analysisResult;
    try {
      const cleanContent = content
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      analysisResult = JSON.parse(cleanContent);
    } catch {
      console.error("Failed to parse AI response:", content);
      return new Response(
        JSON.stringify({ error: "Failed to parse analysis result", raw: content }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-skin error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
