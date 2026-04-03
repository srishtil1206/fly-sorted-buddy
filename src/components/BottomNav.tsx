import { Compass, Bookmark, Sparkles, User } from "lucide-react";

const navItems = [
  { icon: Compass, label: "Home", active: true },
  { icon: Bookmark, label: "Saved", active: false },
  { icon: Sparkles, label: "Premium", active: false },
  { icon: User, label: "Profile", active: false },
];

const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg pb-[env(safe-area-inset-bottom)]">
    <div className="mx-auto flex max-w-lg items-center justify-around py-2">
      {navItems.map((item) => (
        <button
          key={item.label}
          className={`flex flex-col items-center gap-0.5 px-4 py-1.5 transition-colors duration-150 ${
            item.active ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <item.icon size={22} strokeWidth={item.active ? 2.4 : 1.8} />
          <span className={`text-[10px] ${item.active ? "font-bold" : "font-medium"}`}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  </nav>
);

export default BottomNav;
