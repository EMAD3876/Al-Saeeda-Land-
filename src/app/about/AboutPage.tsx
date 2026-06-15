import { MapPin, Phone, Mail, Clock, ShieldCheck, HeartHandshake, UtensilsCrossed } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">قصتنا</h1>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            بدأت رحلتنا من شغفنا بتقديم تجربة طعام استثنائية تعكس أصالة وعراقة المطبخ التهامي الأصيل في قلب عروس البحر الأحمر "الحديدة".
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white/5 border-y border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-accent">مخبازة، مطعم، منتزه العائلة!</h2>
              <div className="space-y-6 text-white/80 text-lg leading-relaxed">
                <p>
                  السعيدة لاند ليس مجرد مطعم للمأكولات البحرية، بل هو وجهة ترفيهية متكاملة تهدف إلى جمع العائلة والأصدقاء في مساحات مصممة لراحتكم.
                </p>
                <p>
                  نفتخر بمخبازتنا التي تقدم الخبز الطازج والمأكولات الشعبية التهامية، إلى جانب مطعمنا الذي يختار أجود أسماك البحر الأحمر يومياً ليتم تحضيرها بأيدي أمهر الطهاة.
                </p>
                <p>
                  ولأننا نهتم بمتعة العائلة، وفرنا منتزهاً واسعاً يحتوي على ألعاب آمنة للأطفال ومساحات خضراء لتستمتعوا بوجباتكم في أجواء رائعة ومريحة.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="h-64 bg-dark/40 rounded-2xl border border-white/10 flex items-center justify-center p-8 text-center flex-col gap-4">
                <UtensilsCrossed size={48} className="text-accent" />
                <h3 className="text-white font-bold text-xl">أصالة المذاق</h3>
              </div>
              <div className="h-64 bg-accent rounded-2xl flex items-center justify-center p-8 text-center flex-col gap-4 shadow-2xl translate-y-8">
                <HeartHandshake size={48} className="text-primary" />
                <h3 className="text-primary font-bold text-xl">خدمة بابتسامة</h3>
              </div>
              <div className="h-64 bg-white rounded-2xl flex items-center justify-center p-8 text-center flex-col gap-4 shadow-xl">
                <ShieldCheck size={48} className="text-primary" />
                <h3 className="text-primary font-bold text-xl">جودة ونظافة</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details/Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-dark/50 border border-white/10 p-10 rounded-2xl hover:bg-white/5 transition-all">
              <div className="w-20 h-20 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">موقع يجمعنا</h3>
              <p className="text-white/60">في قلب مدينة الحديدة، ليكون الوصول إلينا سهلاً لتجربة لا تنسى.</p>
            </div>
            
            <div className="bg-dark/50 border border-white/10 p-10 rounded-2xl hover:bg-white/5 transition-all">
              <div className="w-20 h-20 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <UtensilsCrossed size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">قائمة واسعة</h3>
              <p className="text-white/60">من المأكولات البحرية الفاخرة إلى المشاوي والخبز الطازج، لدينا ما يرضي جميع الأذواق.</p>
            </div>
            
            <div className="bg-dark/50 border border-white/10 p-10 rounded-2xl hover:bg-white/5 transition-all">
               <div className="w-20 h-20 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartHandshake size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">مناسبات متجددة</h3>
              <p className="text-white/60">استعد لمناسبتك القادمة معنا، سواء كانت حفلة عائلية أو تجمعاً خاصاً.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
