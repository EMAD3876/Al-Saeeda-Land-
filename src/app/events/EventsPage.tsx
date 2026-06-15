import { Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";

export default function EventsPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center bg-dark/20">
      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-accent mb-6">
        <Calendar size={48} />
      </div>
      <h1 className="text-4xl font-bold text-white mb-4">احتفالات ومناسبات</h1>
      <p className="text-white/60 max-w-md mx-auto mb-8 text-lg">
        نجهز لكم المكان الأنسب لاحتفالاتكم ومناسباتكم السعيدة، مع قوائم طعام مخصصة وخدمة تفوق التوقعات.
      </p>
      <div className="flex gap-4">
        <Link to="/contact" className="bg-accent text-primary font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:scale-[1.02] transition">
          تواصـل معنـا للحجـز <ArrowLeft size={18} />
        </Link>
      </div>
    </div>
  );
}
