import { Outlet, Link } from "react-router-dom";
import { UtensilsCrossed, Phone, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils.js";

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "الرئيسية", path: "/" },
    { name: "قائمة الطعام", path: "/menu" },
    { name: "مأكولات بحرية", path: "/seafood" },
    { name: "المخبازة", path: "/bakery" },
    { name: "منتزه العائلة", path: "/resort" },
    { name: "احتفالات ومناسبات", path: "/events" },
    { name: "احجز الآن", path: "/reservation", highlight: true },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-white dir-rtl">
      {/* Top Banner Contact */}
      <div className="bg-primary border-b border-white/10 text-white text-xs py-1.5 px-4 hidden sm:flex justify-between items-center">
        <span>أهلاً بكم في مطعم ومنتزه السعيدة لاند - الخيار الأمثل للعائلة!</span>
        <div className="flex gap-4 items-center">
          <a href="tel:+96700000000" className="flex items-center gap-1 hover:text-accent transition">
            <Phone size={14} /> اتصل للطلب
          </a>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-primary border-b border-accent/30 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2">
              <UtensilsCrossed className="text-secondary h-8 w-8" />
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-tight text-white flex items-center gap-2">
                  <span className="text-accent">السعيدة</span>
                  <span className="text-white opacity-90">لاند</span>
                </span>
                <span className="text-xs text-accent font-medium mt-1">مخبازة، مطعم، منتزه</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-reverse space-x-6">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    link.highlight 
                      ? "bg-accent text-primary px-6 py-2 rounded-full font-bold shadow-lg shadow-black/20 hover:scale-[1.02] transition-transform"
                      : "text-white opacity-80 hover:text-accent hover:opacity-100"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white opacity-80 hover:text-accent focus:outline-none"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden bg-primary border-t border-accent/20 px-4 pt-2 pb-4 space-y-1 shadow-lg shadow-black/5">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  link.highlight 
                    ? "bg-accent text-primary mt-4 text-center font-bold"
                    : "text-white opacity-80 hover:bg-white/5 hover:text-accent"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full bg-primary relative">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-dark/80 backdrop-blur-md text-white py-12 border-t border-accent/30 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <UtensilsCrossed className="text-accent h-8 w-8" />
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-tight text-white">السعيدة لاند</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              تجربة بحرية استثنائية تجمع بين المذاق الأصيل والراحة العائلية في قلب الحديدة.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg text-accent mb-4 border-b border-slate-700 pb-2 inline-block">روابط هامة</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li><Link to="/menu" className="hover:text-accent transition">قائمة الطعام</Link></li>
              <li><Link to="/seafood" className="hover:text-accent transition">المأكولات البحرية</Link></li>
              <li><Link to="/reservation" className="hover:text-accent transition">احجز طاولتك</Link></li>
              <li><Link to="/about" className="hover:text-accent transition">من نحن</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-accent mb-4 border-b border-slate-700 pb-2 inline-block">تواصل معنا</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>المدينة: الحديدة، اليمن</li>
              <li>هاتف: +967 000 000 000</li>
              <li>واتساب: +967 000 000 000</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-accent mb-4 border-b border-slate-700 pb-2 inline-block">ساعات العمل</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>يومياً: 8:00 صباحاً - 12:00 منتصف الليل</li>
              <li>يوم الجمعة: 1:00 ظهراً - 1:00 صباحاً</li>
            </ul>
          </div>
        </div>
          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
          جميع الحقوق محفوظة &copy; {new Date().getFullYear()} - مطعم ومنتزه السعيدة لاند
        </div>
      </footer>
    </div>
  );
}
