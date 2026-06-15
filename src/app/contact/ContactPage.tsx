import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">تواصل معنا</h1>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            نحن هنا للرد على استفساراتكم وحجوزاتكم. يسعدنا تواصلكم معنا دائماً.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
              <h2 className="text-2xl font-bold text-accent mb-6">معلومات التواصل</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-white/10 p-4 rounded-full text-white">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">العنوان</h3>
                    <p className="text-white/60">مدينة الحديدة، تقاطع شارع الكورنيش، اليمن</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-white/10 p-4 rounded-full text-white">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">الهاتف</h3>
                    <p className="text-white/60" dir="ltr">+967 000 000 000</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-white/10 p-4 rounded-full text-white">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">البريد الإلكتروني</h3>
                    <p className="text-white/60">info@alsaeedaland.com</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-white/10 p-4 rounded-full text-white">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">ساعات العمل</h3>
                    <p className="text-white/60">يومياً من 8:00 صباحاً حتى 12:00 منتصف الليل<br/>الجمعة: 1:00 ظهراً إلى 1:00 صباحاً</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
              <h2 className="text-2xl font-bold text-accent mb-6">تواصل معنا عبر واتساب</h2>
              <p className="text-white/60 mb-6">للحجوزات السريعة والاستفسارات بصورة مباشرة يمكنك مراسلتنا في أي وقت.</p>
              <a 
                href="https://wa.me/96700000000" 
                target="_blank" rel="noreferrer"
                className="w-full bg-[#25D366] text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:opacity-90 flex items-center justify-center gap-2 text-lg"
              >
                اضغط هنا للمراسلة المباشرة
              </a>
            </div>
          </div>

          <div className="bg-dark/50 border border-white/10 p-2 rounded-2xl overflow-hidden h-[600px]">
            {/* Google Maps placeholder, should ideally be replaced with proper map iframe */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122394.38058253164!2d42.9463991!3d14.795816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x160f2bb90f9b008d%3A0xc07a2de9adbdc269!2sAl%20Hudaydah%2C%20Yemen!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: '14px', filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%)' }} // Dark mode filter trick
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </div>
    </div>
  );
}
