export type SkinAnalysisResult = {
  diagnosis: string;
  diagnosisCode: string;
  fullName: string;
  confidence: number;
  risk: "low" | "moderate" | "high" | "critical";
  stage: string;
  urgency: "routine" | "soon" | "urgent" | "emergency";
  description: string;
  characteristics: string[];
  recommendations: string[];
  doctorConsultation: {
    required: boolean;
    timeframe: string;
    specialistType: string;
    reason: string;
  };
  differentialDiagnosis: { condition: string; probability: number }[];
  skinTypeNote: string;
};

export async function analyzeSkinImage(imageBase64: string): Promise<SkinAnalysisResult> {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-skin`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ imageBase64 }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: "Analysis failed" }));
    if (response.status === 429) throw new Error("Rate limit exceeded. Please wait a moment and try again.");
    if (response.status === 402) throw new Error("Service quota exceeded. Please try again later.");
    throw new Error(err.error || "Analysis failed");
  }

  return response.json();
}
