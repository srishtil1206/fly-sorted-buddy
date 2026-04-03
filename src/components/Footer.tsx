import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="mx-auto max-w-lg px-5 pb-28 pt-10">
    <div className="border-t border-border/60 pt-6">
      <p className="text-center text-xs font-semibold text-muted-foreground">
        Made in India 🇮🇳
      </p>
      <div className="mt-3 flex items-center justify-center gap-4">
        <Link to="/about" className="text-xs text-muted-foreground hover:text-foreground min-h-[44px] flex items-center">
          About
        </Link>
        <Link to="/contact" className="text-xs text-muted-foreground hover:text-foreground min-h-[44px] flex items-center">
          Contact
        </Link>
        <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground min-h-[44px] flex items-center">
          Privacy Policy
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
