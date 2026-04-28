import { motion } from "framer-motion";
import { Cpu, Layers, Database, Zap } from "lucide-react";

const layers = [
  { name: "Input", detail: "224 × 224 × 3 (RGB)", color: "bg-primary/20 text-primary" },
  { name: "MobileNetV2 Base", detail: "ImageNet pre-trained, 17 bottleneck blocks", color: "bg-accent text-accent-foreground" },
  { name: "GlobalAveragePooling2D", detail: "Spatial reduction → 1280-dim vector", color: "bg-accent text-accent-foreground" },
  { name: "Dense (128, ReLU)", detail: "Feature compression layer", color: "bg-accent text-accent-foreground" },
  { name: "Dropout (0.3)", detail: "Regularization to prevent overfitting", color: "bg-accent text-accent-foreground" },
  { name: "Dense (1, Sigmoid)", detail: "Binary output: melanoma probability", color: "bg-destructive/15 text-destructive" },
];

const trainingConfig = [
  { icon: Database, label: "Dataset", value: "HAM10000 (10,015 images)" },
  { icon: Cpu, label: "Optimizer", value: "Adam (lr = 1e-4)" },
  { icon: Layers, label: "Batch Size", value: "32" },
  { icon: Zap, label: "Early Stopping", value: "Patience 5, 25 epochs" },
];

const ModelArchitectureSection = () => {
  return (
    <section id="architecture" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            MobileNetV2 <span className="text-gradient-primary">Architecture</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Custom fine-tuned MobileNetV2 with depthwise separable convolutions, trained on
            HAM10000 dermoscopic dataset for skin cancer classification.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Layer Stack */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl bg-card border border-border p-6"
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-5">Model Layers</h3>
            <div className="space-y-2">
              {layers.map((layer, i) => (
                <motion.div
                  key={layer.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-center justify-between rounded-lg px-4 py-3 ${layer.color}`}
                >
                  <span className="font-mono text-sm font-semibold">{layer.name}</span>
                  <span className="text-xs opacity-80">{layer.detail}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Total trainable parameters: ~2.4M • Model file: skin_cancer_model.h5
            </p>
          </motion.div>

          {/* Training Config */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="rounded-xl bg-card border border-border p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-5">Training Configuration</h3>
              <div className="grid grid-cols-2 gap-4">
                {trainingConfig.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent shrink-0">
                      <item.icon className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-semibold text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-card border border-border p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">Threshold Analysis</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Medical threshold tuning for melanoma sensitivity (from your trained model — 91% accuracy):
              </p>
              <div className="space-y-2">
                {[
                  { threshold: "0.40", accuracy: "91.0%", recall: "42.3%" },
                  { threshold: "0.35", accuracy: "90.5%", recall: "49.8%" },
                  { threshold: "0.30", accuracy: "89.7%", recall: "54.2%" },
                  { threshold: "0.25", accuracy: "88.6%", recall: "60.1%" },
                ].map((row) => (
                  <div key={row.threshold} className="flex items-center justify-between text-sm rounded-lg bg-muted px-4 py-2">
                    <span className="font-mono text-foreground">t = {row.threshold}</span>
                    <span className="text-muted-foreground">Acc: {row.accuracy}</span>
                    <span className="text-muted-foreground">Recall: {row.recall}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Model Files Included:</strong> The trained MobileNetV2 model (skin_cancer_model.h5) and training notebook (skin_cancer_mobilenetv2_final.ipynb) are bundled in the project under <code className="text-xs bg-muted px-1 rounded">public/model/</code>. The TensorFlow.js converted weights (model.json + group1-shard1of1.bin) power the 7-category HAM10000 classification with 91% accuracy.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ModelArchitectureSection;
