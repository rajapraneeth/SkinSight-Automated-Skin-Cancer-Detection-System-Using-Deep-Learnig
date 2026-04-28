import { motion } from "framer-motion";
import { ArrowDown, Brain, Zap, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-skin-analysis.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="AI Skin Analysis Technology" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/30" />
      </div>

      <div className="container relative z-10 mx-auto px-6 py-32">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm border border-primary/30 mb-6">
              <Brain className="h-4 w-4" /> MobileNetV2 · Deep Learning
            </span>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight text-primary-foreground mb-6">
              Skin
              <span className="text-secondary"> Sight</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-4 leading-relaxed">
              Automated Skin Cancer Detection System powered by Deep Learning — achieving <strong className="text-secondary">91% accuracy</strong> with MobileNetV2 architecture.
            </p>

            <p className="text-sm text-primary-foreground/60 mb-8">
              Raghu Institute of Technology (A) · Department of CSE
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 glow-primary"
                onClick={() => document.getElementById("analysis")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Eye className="mr-2 h-5 w-5" /> Try Analysis
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              {[
                { icon: Zap, value: "91%", label: "Accuracy" },
                { icon: Brain, value: "0.94", label: "AUC Score" },
                { icon: Eye, value: "7", label: "Lesion Types" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-center"
                >
                  <p className="font-display text-2xl md:text-3xl font-bold text-secondary">{stat.value}</p>
                  <p className="text-xs text-primary-foreground/60">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/50"
      >
        <ArrowDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
