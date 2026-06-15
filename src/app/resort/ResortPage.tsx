import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ResortPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center bg-dark/20">
      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-accent mb-6">
        <span className="text-4xl font-bold">🌴</span>
      </div>
      <h1 className="text-4xl font-bold text-white mb-4">منتزه العائلة</h1>
      <p className="text-white/60 max-w-md mx-auto mb-8 text-lg">
        مساحات واسعة، ألعاب آمنة للأطفال، وجلسات عائلية هادئة لتجربة متكاملة تجمع بين متعة الترفيه ولذة المذاق.
      </p>
      <Link to="/gallery" className="bg-accent text-primary font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:scale-[1.02] transition">
        شاهد الصور <ArrowLeft size={18} />
      </Link>
    </div>
  );
}
