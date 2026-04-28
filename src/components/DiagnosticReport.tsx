import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Siren,
  Clock,
  Stethoscope,
  Activity,
  Eye,
  FileText,
  Phone,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { SkinAnalysisResult } from "@/lib/skinAnalysis";

const riskConfig = {
  low: { color: "text-success", bg: "bg-success/10", border: "border-success/30", icon: CheckCircle, label: "Low Risk" },
  moderate: { color: "text-warning", bg: "bg-warning/10", border: "border-warning/30", icon: AlertTriangle, label: "Moderate Risk" },
  high: { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30", icon: XCircle, label: "High Risk" },
  critical: { color: "text-destructive", bg: "bg-destructive/15", border: "border-destructive/50", icon: Siren, label: "Critical — Seek Immediate Care" },
};

const urgencyConfig = {
  routine: { color: "text-success", label: "Routine", icon: Clock },
  soon: { color: "text-warning", label: "Schedule Soon", icon: Clock },
  urgent: { color: "text-destructive", label: "Urgent", icon: AlertTriangle },
  emergency: { color: "text-destructive", label: "Emergency", icon: Siren },
};

interface DiagnosticReportProps {
  result: SkinAnalysisResult;
  patientName?: string;
}

const DiagnosticReport = ({ result, patientName }: DiagnosticReportProps) => {
  const risk = riskConfig[result.risk] || riskConfig.moderate;
  const urgency = urgencyConfig[result.urgency] || urgencyConfig.routine;
  const RiskIcon = risk.icon;
  const UrgencyIcon = urgency.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Patient Name Header */}
      {patientName && (
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Diagnostic Report For</p>
          <h3 className="font-display text-2xl font-bold text-foreground">{patientName}</h3>
          <p className="text-xs text-muted-foreground mt-1">{new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
      )}

      {/* Risk + Urgency Header */}
      <div className={`rounded-xl border ${risk.border} ${risk.bg} p-4`}>
        <div className="flex items-center gap-3 mb-2">
          <RiskIcon className={`h-6 w-6 ${risk.color}`} />
          <span className={`font-display text-lg font-bold ${risk.color}`}>{risk.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <UrgencyIcon className={`h-4 w-4 ${urgency.color}`} />
          <span className={`text-sm font-medium ${urgency.color}`}>{urgency.label}</span>
        </div>
      </div>

      {/* Diagnosis */}
      <div className="rounded-xl bg-card border border-border p-5">
        <div className="flex items-start gap-3 mb-3">
          <Activity className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-display text-xl font-bold text-foreground">{result.diagnosis}</h3>
            <p className="text-sm text-muted-foreground">{result.fullName}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm mb-3">
          <span className="text-muted-foreground">Confidence: <strong className="text-foreground">{result.confidence}%</strong></span>
          <span className="text-muted-foreground">Stage: <strong className="text-foreground">{result.stage}</strong></span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{result.description}</p>
      </div>

      {/* Observed Characteristics */}
      {result.characteristics?.length > 0 && (
        <div className="rounded-xl bg-card border border-border p-5">
          <div className="flex items-center gap-2 mb-3">
            <Eye className="h-5 w-5 text-primary" />
            <h4 className="font-display font-semibold text-foreground">Observed Characteristics</h4>
          </div>
          <ul className="space-y-1.5">
            {result.characteristics.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Doctor Consultation */}
      {result.doctorConsultation?.required && (
        <div className={`rounded-xl border ${result.urgency === "emergency" || result.urgency === "urgent" ? "border-destructive/40 bg-destructive/5" : "border-warning/30 bg-warning/5"} p-5`}>
          <div className="flex items-center gap-2 mb-3">
            <Stethoscope className={`h-5 w-5 ${result.urgency === "emergency" || result.urgency === "urgent" ? "text-destructive" : "text-warning"}`} />
            <h4 className="font-display font-semibold text-foreground">Doctor Consultation Required</h4>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground"><strong className="text-foreground">Timeframe:</strong> {result.doctorConsultation.timeframe}</p>
            <p className="text-muted-foreground"><strong className="text-foreground">Specialist:</strong> {result.doctorConsultation.specialistType}</p>
            <p className="text-muted-foreground"><strong className="text-foreground">Reason:</strong> {result.doctorConsultation.reason}</p>
          </div>
          {(result.urgency === "emergency" || result.urgency === "urgent") && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-destructive/10 p-3">
              <Phone className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">
                Please contact a dermatologist immediately
              </span>
            </div>
          )}
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations?.length > 0 && (
        <div className="rounded-xl bg-card border border-border p-5">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-primary" />
            <h4 className="font-display font-semibold text-foreground">Recommendations</h4>
          </div>
          <ol className="space-y-2">
            {result.recommendations.map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                {r}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Differential Diagnosis */}
      {result.differentialDiagnosis?.length > 0 && (
        <div className="rounded-xl bg-card border border-border p-5">
          <h4 className="font-display font-semibold text-foreground mb-3">Differential Diagnosis</h4>
          <div className="space-y-2.5">
            {result.differentialDiagnosis.map((d, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">{d.condition}</span>
                  <span className="text-muted-foreground">{d.probability}%</span>
                </div>
                <Progress value={d.probability} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skin Type Note */}
      {result.skinTypeNote && (
        <div className="rounded-xl bg-accent/50 border border-accent p-4">
          <p className="text-sm text-accent-foreground">
            <strong>Skin Type Note:</strong> {result.skinTypeNote}
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="rounded-lg bg-muted p-3">
        <p className="text-xs text-muted-foreground text-center">
          ⚠ This AI analysis is for informational purposes only and does not constitute medical advice. 
          Always consult a qualified dermatologist for proper diagnosis and treatment.
        </p>
      </div>
    </motion.div>
  );
};

export default DiagnosticReport;
