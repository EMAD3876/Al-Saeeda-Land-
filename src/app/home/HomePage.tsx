import { Link } from "react-router-dom";
import { ArrowLeft, Clock, MapPin, Phone, Star, CheckCircle, UtensilsCrossed } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Motif */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0M-10 10L10 -10M30 50L50 30" stroke="#D4AF37" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-8">
          <span className="inline-block py-1 px-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-semibold tracking-wide text-accent">
            وجهتك الأولى في الحديدة
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight drop-shadow-lg text-white">
            تجربة بحرية استثنائية تجمع بين <span className="text-accent">المذاق الأصيل</span> والراحة العائلية
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-200 drop-shadow-md leading-relaxed">
            استمتع بأشهى المأكولات البحرية، والمخبازة التقليدية، في أجواء عائلية مميزة مع منتزه ترفيهي وصالات للحفلات.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-8">
            <Link 
              to="/reservation" 
              className="bg-accent text-primary font-bold py-4 px-8 rounded-xl shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 text-lg"
            >
              احجز طاولة
            </Link>
            <Link 
              to="/menu" 
              className="bg-white/5 border border-white/20 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all hover:bg-white/10 flex items-center justify-center gap-2 text-lg"
            >
              عرض القائمة
            </Link>
            <a 
              href="https://wa.me/96700000000" 
              target="_blank" rel="noreferrer"
              className="bg-[#25D366] text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all hover:opacity-90 flex items-center justify-center gap-2 text-lg"
            >
              واتساب
            </a>
            <a 
              href="tel:+96700000000" 
              className="bg-secondary text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all hover:opacity-90 flex items-center justify-center gap-2 text-lg"
            >
              اتصل الآن
            </a>
          </div>
        </div>

        {/* Visual Decorative Element (Floating Card) - Hidden on small screens */}
        <div className="hidden lg:block absolute left-16 bottom-20 w-80 p-1 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl z-20">
          <div className="p-6 text-white text-right">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-secondary text-[10px] font-bold px-2 py-1 rounded">موصى به</span>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                <span className="w-2 h-2 rounded-full bg-white/20"></span>
                <span className="w-2 h-2 rounded-full bg-white/20"></span>
              </div>
            </div>
            <div className="text-lg font-bold mb-1">سمك الكنعد المشوي</div>
            <div className="text-xs opacity-60 mb-4">بالخلطة التهامية الأصيلة وخبز الموفى الساخن</div>
            <div className="flex items-end justify-between px-1">
              <button className="p-2 rounded-full bg-white/10 hover:bg-accent hover:text-primary transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
              <div className="text-accent font-bold">4,500 ريال</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Grid */}
      <section className="bg-dark/50 backdrop-blur-md border border-white/10 py-12 relative z-20 -mt-8 mx-4 sm:mx-8 lg:mx-auto max-w-6xl rounded-2xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          <div className="flex items-start gap-4 text-white">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-accent">
              <Clock size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">ساعات العمل</h3>
              <p className="opacity-60 text-sm font-semibold">يومياً: 8:00 ص - 12:00 م<br/>الجمعة: 1:00 م - 1:00 ص</p>
            </div>
          </div>
          <div className="flex items-start gap-4 text-white border-t md:border-t-0 md:border-r border-white/10 pt-6 md:pt-0 md:pr-8">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-accent">
              <MapPin size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">الموقع</h3>
              <p className="opacity-60 text-sm font-semibold">الحديدة، اليمن<br/>موقع استراتيجي وسهل الوصول</p>
            </div>
          </div>
          <div className="flex items-start gap-4 text-white border-t md:border-t-0 md:border-r border-white/10 pt-6 md:pt-0 md:pr-8">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-accent">
              <Phone size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">تواصل معنا</h3>
              <p className="opacity-60 text-sm font-semibold">استفسارات وحجوزات<br/>+967 000 000 000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Highlight */}
      <section className="py-24 bg-primary relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">اختيارات السعيدة المتنوعة</h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
            <p className="mt-6 text-slate-300 max-w-2xl mx-auto text-lg">
              نقدم لكم تشكيلة واسعة تلبي جميع الأذواق، من خيرات البحر الطازجة إلى المخبوزات الشهية والمشاوي العابقة بنكهة الأصالة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden transition-all group hover:bg-white/10">
              <div className="h-64 bg-dark/30 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition duration-500 z-10"></div>
                <UtensilsCrossed size={64} className="text-white group-hover:scale-110 transition duration-500 h-full w-full object-cover p-12 opacity-10" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3">مأكولات بحرية</h3>
                <p className="text-white/60 mb-6 leading-relaxed">
                  أسماك طازجة يومياً من بحر الحديدة، محضرة بأنامل طهاة محترفين بخلطاتنا السرية.
                </p>
                <Link to="/seafood" className="text-accent font-bold hover:text-white flex items-center gap-1 transition">
                  اكتشف المزيد <ArrowLeft size={16} />
                </Link>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden transition-all group hover:bg-white/10">
              <div className="h-64 bg-dark/30 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition duration-500 z-10"></div>
                 {/* Placeholder for bakery visual */}
                 <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white/10 font-bold text-6xl">مخبازة</span>
                 </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3">المخبازة اليمنية</h3>
                <p className="text-white/60 mb-6 leading-relaxed">
                  طعم الأصالة في خبز التنور الطازج والمخبوزات التقليدية التي لا تكتمل المائدة بدونها.
                </p>
                <Link to="/bakery" className="text-accent font-bold hover:text-white flex items-center gap-1 transition">
                  اكتشف المزيد <ArrowLeft size={16} />
                </Link>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden transition-all group hover:bg-white/10">
              <div className="h-64 bg-dark/30 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition duration-500 z-10"></div>
                  {/* Placeholder for resort visual */}
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white/10 font-bold text-6xl">منتزه</span>
                  </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3">منتزه العائلة</h3>
                <p className="text-white/60 mb-6 leading-relaxed">
                  مساحات خضراء، ألعاب أطفال، وجلسات عائلية مريحة لتجربة متكاملة لا تُنسى.
                </p>
                <Link to="/resort" className="text-accent font-bold hover:text-white flex items-center gap-1 transition">
                  اكتشف المزيد <ArrowLeft size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-24 bg-dark text-white relative overflow-hidden border-t border-b border-white/10">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black mb-4">ماذا يقول ضيوفنا؟</h2>
             <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1, 2, 3].map((i) => (
               <div key={i} className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700">
                 <div className="flex gap-1 text-accent mb-4">
                   <Star size={20} fill="currentColor" />
                   <Star size={20} fill="currentColor" />
                   <Star size={20} fill="currentColor" />
                   <Star size={20} fill="currentColor" />
                   <Star size={20} fill="currentColor" />
                 </div>
                 <p className="text-slate-300 mb-6 leading-relaxed line-clamp-4">
                   "تجربة مذهلة بكل المقاييس. الأسماك طازجة جداً والخدمة ممتازة، بالإضافة إلى أن المنتزه يوفر مساحة رائعة للأطفال للعب أثناء تناولنا الطعام."
                 </p>
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center font-bold text-xl">
                      ض
                   </div>
                   <div>
                     <h4 className="font-bold">ضيف كريم</h4>
                     <p className="text-slate-500 text-sm">زائر محلي</p>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-black text-white">جاهز لتجربة لا تُنسى؟</h2>
          <p className="text-xl text-white/70">
            سواء كنت تخطط لغداء عمل، أو عشاء عائلي، أو حفلة خاصة، فريق السعيدة لاند مستعد لخدمتك.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link 
              to="/reservation" 
              className="bg-accent text-primary font-bold py-4 px-10 rounded-xl shadow-xl transition transform hover:scale-[1.02] text-lg"
            >
              احجز الآن
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
