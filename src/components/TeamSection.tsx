import { motion } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";

const team = [
  { name: "P. G. Raja Praneeth", id: "223J1A05D9" },
  { name: "P. Yesaswi Narayani", id: "223J1A05D3" },
  { name: "P. Rajini", id: "223J1A05E9" },
  { name: "Sk. Affrin Meher", id: "223J1A05G1" },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-24 section-gradient">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-gradient-primary">Team</span>
          </h2>
          <p className="text-muted-foreground">
            Raghu Institute of Technology (A) · Department of Computer Science & Engineering
          </p>
        </motion.div>

        {/* Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto mb-12 rounded-xl bg-card border border-border p-6 text-center"
        >
          <div className="flex justify-center mb-3">
            <div className="rounded-full bg-accent p-3">
              <BookOpen className="h-6 w-6 text-accent-foreground" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Project Guide</p>
          <h3 className="font-display text-xl font-semibold text-foreground">Mr. D. Sekhar</h3>
          <p className="text-sm text-muted-foreground">Assistant Professor</p>
        </motion.div>

        {/* Members */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {team.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl bg-card border border-border p-5 text-center"
            >
              <div className="flex justify-center mb-3">
                <div className="rounded-full bg-accent p-2">
                  <GraduationCap className="h-5 w-5 text-accent-foreground" />
                </div>
              </div>
              <h4 className="font-display text-sm font-semibold text-foreground">{m.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{m.id}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
