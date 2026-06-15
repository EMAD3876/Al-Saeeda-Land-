import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, CalendarDays, UtensilsCrossed, Image as ImageIcon, Settings, LogOut } from "lucide-react";
import { cn } from "../../lib/utils";

export default function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { name: "نظرة عامة", path: "/admin", icon: LayoutDashboard },
    { name: "الحجوزات", path: "/admin/reservations", icon: CalendarDays },
    { name: "قائمة الطعام", path: "/admin/menu", icon: UtensilsCrossed },
    { name: "المعرض", path: "/admin/gallery", icon: ImageIcon },
    { name: "الإعدادات", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans dir-rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col shadow-2xl relative z-20">
        <div className="p-6 h-20 border-b border-white/10 flex items-center">
          <h2 className="font-bold text-2xl tracking-tight">لوحة الإدارة</h2>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                  isActive 
                    ? "bg-accent text-primary shadow-lg" 
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/5 rounded-xl transition-all">
            <LogOut size={20} />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-50 relative z-10">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <h1 className="text-xl font-bold text-primary">ألساحـة الإدارية</h1>
          <div className="flex items-center gap-4 text-sm font-semibold text-slate-600 bg-slate-100 px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            متصل: المسؤول
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
