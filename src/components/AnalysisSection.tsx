import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Loader2, Camera, RotateCcw, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import DiagnosticReport from "@/components/DiagnosticReport";
import { analyzeSkinImage, type SkinAnalysisResult } from "@/lib/skinAnalysis";
import { supabase } from "@/integrations/supabase/client";

const AnalysisSection = () => {
  const [patientName, setPatientName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<SkinAnalysisResult | null>(null);
  const { toast } = useToast();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) processFile(file);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File too large", description: "Please upload an image under 10MB.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const runAnalysis = async () => {
    if (!imagePreview) return;
    setAnalyzing(true);
    setResult(null);
    try {
      const analysisResult = await analyzeSkinImage(imagePreview);
      setResult(analysisResult);

      // Save to database
      await supabase.from("skin_analyses").insert({
        patient_name: patientName,
        diagnosis: analysisResult.diagnosis,
        diagnosis_code: analysisResult.diagnosisCode,
        full_name: analysisResult.fullName,
        confidence: analysisResult.confidence,
        risk: analysisResult.risk,
        stage: analysisResult.stage,
        urgency: analysisResult.urgency,
        description: analysisResult.description,
        characteristics: analysisResult.characteristics as any,
        recommendations: analysisResult.recommendations as any,
        doctor_consultation: analysisResult.doctorConsultation as any,
        differential_diagnosis: analysisResult.differentialDiagnosis as any,
        skin_type_note: analysisResult.skinTypeNote,
      });
    } catch (err) {
      toast({
        title: "Analysis Failed",
        description: err instanceof Error ? err.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setImagePreview(null);
    setResult(null);
    setNameSubmitted(false);
    setPatientName("");
  };

  const handleNameSubmit = () => {
    if (!patientName.trim()) {
      toast({ title: "Name required", description: "Please enter the patient's name to proceed.", variant: "destructive" });
      return;
    }
    setNameSubmitted(true);
  };

  return (
    <section id="analysis" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Skin Lesion <span className="text-gradient-warm">Scanner</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload a photo of your skin lesion for AI-powered analysis. Get instant classification, 
            risk assessment, staging information, and doctor consultation recommendations.
          </p>
          <p className="text-xs text-destructive mt-2 font-medium">
            ⚠ For informational purposes only — always consult a dermatologist for medical diagnosis.
          </p>
        </motion.div>

        {!nameSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="rounded-xl bg-card border border-border p-8 text-center">
              <div className="rounded-full bg-accent p-5 w-fit mx-auto mb-6">
                <User className="h-10 w-10 text-accent-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Patient Information</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Enter the patient's full name. This will appear on the diagnostic report.
              </p>
              <Input
                placeholder="Enter full name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                className="mb-4 text-center h-12 text-base"
                maxLength={100}
              />
              <Button
                onClick={handleNameSubmit}
                className="w-full bg-primary text-primary-foreground rounded-full h-12 text-base"
              >
                Continue to Scanner <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        ) : (
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Upload area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="relative rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors bg-card p-8 text-center min-h-[360px] flex flex-col items-center justify-center cursor-pointer"
              onClick={() => !imagePreview && document.getElementById("file-input")?.click()}
            >
              {imagePreview ? (
                <div className="relative w-full">
                  <img
                    src={imagePreview}
                    alt="Uploaded skin lesion"
                    className="max-h-72 mx-auto rounded-lg object-contain"
                  />
                  {analyzing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 rounded-lg backdrop-blur-sm">
                      <div className="text-center">
                        <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-2" />
                        <p className="text-sm font-medium text-primary-foreground bg-primary/80 rounded-full px-4 py-1">
                          Analyzing lesion...
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="mb-4 rounded-full bg-accent p-5">
                    <Camera className="h-10 w-10 text-accent-foreground" />
                  </div>
                  <p className="font-display font-semibold text-foreground text-lg mb-1">
                    Upload Skin Lesion Photo
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drop image here or click to browse · JPG, PNG
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center text-xs text-muted-foreground">
                    <span className="bg-muted px-3 py-1 rounded-full">Dermoscopic images</span>
                    <span className="bg-muted px-3 py-1 rounded-full">Close-up photos</span>
                    <span className="bg-muted px-3 py-1 rounded-full">Clinical photos</span>
                  </div>
                </>
              )}
              <input
                id="file-input"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {imagePreview && (
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={runAnalysis}
                  disabled={analyzing}
                  className="flex-1 bg-primary text-primary-foreground rounded-full h-12 text-base"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-5 w-5" /> Analyze Lesion
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={resetAnalysis}
                  disabled={analyzing}
                  className="rounded-full h-12"
                >
                  <RotateCcw className="mr-2 h-4 w-4" /> New Scan
                </Button>
              </div>
            )}
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-h-[700px] overflow-y-auto pr-1"
          >
            <AnimatePresence mode="wait">
              {analyzing ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl bg-card border border-border p-8 min-h-[360px] flex flex-col items-center justify-center"
                >
                  <Loader2 className="h-14 w-14 animate-spin text-primary mb-4" />
                  <p className="font-display text-lg font-semibold text-foreground">
                    AI Analysis in Progress
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 text-center max-w-xs">
                    Classifying lesion across 7 categories using MobileNetV2 architecture 
                    with skin diversity correction...
                  </p>
                  <div className="flex gap-2 mt-6">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="h-2 w-2 rounded-full bg-primary"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <DiagnosticReport result={result} patientName={patientName} />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="rounded-xl bg-card border border-border p-8 min-h-[360px] flex flex-col items-center justify-center text-center"
                >
                  <div className="rounded-full bg-muted p-5 mb-4">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <p className="font-display text-lg font-semibold text-foreground">
                    Your Diagnostic Report
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                    Upload a skin lesion photo and click "Analyze" to receive a detailed 
                    diagnostic report with risk assessment and recommendations.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        )}
      </div>
    </section>
  );
};

export default AnalysisSection;
