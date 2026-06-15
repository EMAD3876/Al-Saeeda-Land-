import { Link } from "react-router-dom";
import { ArrowLeft, UtensilsCrossed } from "lucide-react";

export default function SeafoodPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center">
      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-accent mb-6">
        <UtensilsCrossed size={48} />
      </div>
      <h1 className="text-4xl font-bold text-white mb-4">المأكولات البحرية</h1>
      <p className="text-white/60 max-w-md mx-auto mb-8 text-lg">
        اكتشف تشكيلتنا الفاخرة من الأسماك الطازجة المحضرة على الطريقة التهامية الأصيلة بخلطاتنا السرية.
      </p>
      <Link to="/menu" className="bg-accent text-primary font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:scale-[1.02] transition">
        تصفح القائمة الكاملة <ArrowLeft size={18} />
      </Link>
    </div>
  );
}
