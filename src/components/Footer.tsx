import { Shield } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card py-8">
    <div className="container mx-auto px-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Shield className="h-5 w-5 text-primary" />
        <span className="font-display font-bold text-foreground">SkinSight</span>
      </div>
      <p className="text-xs text-muted-foreground max-w-md mx-auto">
        This is a research project by Raghu Institute of Technology. Not intended as a substitute for professional medical advice, diagnosis, or treatment.
      </p>
      <p className="text-xs text-muted-foreground mt-4">© 2026 SkinSight · All rights reserved</p>
    </div>
  </footer>
);

export default Footer;
