import { motion } from "framer-motion";
import { Target, Cpu, Smartphone, Stethoscope } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Problem Statement",
    desc: "Dermoscopic images are visually similar, making it difficult to distinguish between benign lesions and malignant melanoma. Traditional biopsy is invasive and time-intensive.",
  },
  {
    icon: Cpu,
    title: "MobileNetV2 Architecture",
    desc: "Custom MobileNetV2 backbone (ImageNet pre-trained) with GlobalAveragePooling2D → Dense(128, ReLU) → Dropout(0.3) → Sigmoid output, fine-tuned on HAM10000 for skin cancer detection.",
  },
  {
    icon: Smartphone,
    title: "HAM10000 Dataset",
    desc: "Trained on 10,015 dermoscopic images across 7 categories (nv, mel, bcc, bkl, akiec, df, vasc) with 70/15/15 train-val-test split and stratified sampling.",
  },
  {
    icon: Stethoscope,
    title: "Clinical Impact",
    desc: "Serves as a first-level screen in primary care, providing objective probability scores to prioritize high-risk cases for biopsy.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 section-gradient">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            About <span className="text-gradient-primary">SkinSight</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Early diagnosis of skin cancer is pivotal for patient survival, yet dermatological expert availability is globally uneven. SkinSight bridges this gap with AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl bg-card p-8 border border-border hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                  <f.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{f.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
