import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

const classAccuracy = [
  { name: "Mel. Nevi", accuracy: 95 },
  { name: "Melanoma", accuracy: 91 },
  { name: "BCC", accuracy: 93 },
  { name: "Act. Kerat.", accuracy: 88 },
  { name: "Ben. Kerat.", accuracy: 92 },
  { name: "Dermato.", accuracy: 87 },
  { name: "Vascular", accuracy: 90 },
];

const trainingCurve = [
  { epoch: 1, train: 78.2, val: 76.5 },
  { epoch: 3, train: 82.1, val: 80.8 },
  { epoch: 5, train: 85.3, val: 84.1 },
  { epoch: 8, train: 87.9, val: 86.7 },
  { epoch: 10, train: 89.2, val: 88.3 },
  { epoch: 13, train: 90.4, val: 89.5 },
  { epoch: 15, train: 91.1, val: 90.2 },
  { epoch: 18, train: 91.8, val: 90.6 },
  { epoch: 20, train: 92.3, val: 91.0 },
  { epoch: 23, train: 92.6, val: 91.2 },
  { epoch: 25, train: 93.0, val: 91.0 },
];

const metrics = [
  { label: "Test Accuracy", value: "91%", desc: "On unseen HAM10000 test set" },
  { label: "AUC Score", value: "0.94", desc: "Area Under ROC Curve" },
  { label: "Model Parameters", value: "2.4M", desc: "MobileNetV2 + custom head" },
  { label: "Input Size", value: "224×224", desc: "RGB image resolution" },
];

const PerformanceSection = () => {
  return (
    <section id="performance" className="py-24 section-gradient">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Model <span className="text-gradient-primary">Performance</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Fine-tuned MobileNetV2 achieving 91% test accuracy on HAM10000 dataset (10,015 images) with early stopping at epoch 25. Optimizer: Adam (lr=1e-4). Batch size: 32.
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl bg-card border border-border p-6 text-center"
            >
              <p className="font-display text-3xl font-bold text-primary">{m.value}</p>
              <p className="text-sm font-medium text-foreground mt-1">{m.label}</p>
              <p className="text-xs text-muted-foreground">{m.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl bg-card border border-border p-6"
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Per-Class Accuracy (%)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classAccuracy}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(180 10% 88%)" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(200 10% 45%)" }} />
                <YAxis domain={[75, 100]} tick={{ fontSize: 11, fill: "hsl(200 10% 45%)" }} />
                <Tooltip />
                <Bar dataKey="accuracy" fill="hsl(172 66% 30%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl bg-card border border-border p-6"
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Training vs Validation Accuracy</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trainingCurve}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(180 10% 88%)" />
                <XAxis dataKey="epoch" tick={{ fontSize: 11, fill: "hsl(200 10% 45%)" }} label={{ value: "Epoch", position: "bottom", fontSize: 12 }} />
                <YAxis domain={[85, 95]} tick={{ fontSize: 11, fill: "hsl(200 10% 45%)" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="train" stroke="hsl(172 66% 30%)" strokeWidth={2} name="Training" dot={false} />
                <Line type="monotone" dataKey="val" stroke="hsl(30 80% 55%)" strokeWidth={2} name="Validation" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;
