import { useNavigate, useLocation } from "react-router-dom";
import { Compass, Bookmark, Sparkles, User } from "lucide-react";

const navItems = [
  { icon: Compass, label: "Home", path: "/" },
  { icon: Bookmark, label: "Saved", path: "/saved" },
  { icon: Sparkles, label: "Premium", path: "/premium" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-lg items-center justify-around py-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-0.5 min-h-[44px] min-w-[44px] px-4 py-1.5 transition-colors duration-150 ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon size={22} strokeWidth={active ? 2.4 : 1.8} />
              <span className={`text-[10px] ${active ? "font-bold" : "font-medium"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
