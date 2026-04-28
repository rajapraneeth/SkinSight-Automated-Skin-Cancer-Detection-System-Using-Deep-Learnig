import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Users, Globe } from "lucide-react";
import diverseImage from "@/assets/diverse-skin-types.jpg";

const DiversitySection = () => {
  return (
    <section id="diversity" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Skin Type <span className="text-gradient-warm">Inclusivity</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Addressing the critical bias in HAM10000 dataset and our approach to make skin cancer detection work for all skin types in India.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img src={diverseImage} alt="Diverse skin types in India" className="rounded-xl shadow-[var(--shadow-elevated)] w-full" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Problem */}
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                <h3 className="font-display text-lg font-semibold text-foreground">The HAM10000 Bias</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The HAM10000 dataset predominantly contains images of <strong>fair-skinned (Fitzpatrick I–III)</strong> individuals from European populations. This creates a significant bias — the model may underperform on <strong>darker skin tones (Fitzpatrick IV–VI)</strong> common across India.
              </p>
            </div>

            {/* Solution */}
            <div className="rounded-xl border border-primary/20 bg-accent p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="h-6 w-6 text-primary" />
                <h3 className="font-display text-lg font-semibold text-foreground">Our Correction Approach</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Users className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <span><strong>Data Augmentation:</strong> Color jittering, brightness/contrast adjustments to simulate diverse skin tones during training</span>
                </li>
                <li className="flex items-start gap-2">
                  <Globe className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <span><strong>Supplementary Datasets:</strong> Incorporating ISIC 2019/2020 & PAD-UFES-20 (Brazilian dataset with darker skin tones) for broader representation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <span><strong>Fitzpatrick Scale Labeling:</strong> Stratified evaluation across skin types to ensure consistent accuracy (target ≥88%) for all groups</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <span><strong>Transfer Learning Adaptation:</strong> Fine-tuning on localized Indian dermatology datasets with clinician-verified labels</span>
                </li>
              </ul>
            </div>

            {/* Fitzpatrick Scale */}
            <div className="flex gap-1">
              {[
                { type: "I", color: "#FCEBD5" },
                { type: "II", color: "#F1C89A" },
                { type: "III", color: "#D4A574" },
                { type: "IV", color: "#B07C4F" },
                { type: "V", color: "#7B5232" },
                { type: "VI", color: "#4A2F1B" },
              ].map((s) => (
                <div key={s.type} className="flex-1 text-center">
                  <div className="h-8 rounded-md mb-1" style={{ backgroundColor: s.color }} />
                  <span className="text-[10px] text-muted-foreground">Type {s.type}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DiversitySection;
