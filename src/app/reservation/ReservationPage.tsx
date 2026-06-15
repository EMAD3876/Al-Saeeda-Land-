import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar as CalendarIcon, Clock, Users, MessageSquare, UtensilsCrossed, Phone, User, CheckCircle2 } from "lucide-react";
import { cn } from "../../lib/utils";

const reservationSchema = z.object({
  fullName: z.string()
    .min(3, { message: "الاسم يجب أن يكون 3 أحرف على الأقل" })
    .regex(/^[\u0600-\u06FFa-zA-Z\s]+$/, { message: "الاسم يجب أن يحتوي على أحرف فقط" }),
  mobile: z.string()
    .min(9, { message: "رقم الهاتف يجب أن يكون 9 أرقام على الأقل" })
    .regex(/^[0-9]+$/, { message: "رقم الهاتف يجب أن يحتوي على أرقام فقط" }),
  date: z.string().min(1, { message: "يرجى اختيار تاريخ الحجز" }),
  time: z.string().min(1, { message: "يرجى اختيار وقت الحجز" }),
  guestsCount: z.string().min(1, { message: "يرجى تحديد عدد الضيوف" }),
  notes: z.string().optional()
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

export default function ReservationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guestsCount: "2"
    }
  });

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any non-numeric characters immediately
    const val = e.target.value.replace(/[^0-9]/g, "");
    setValue("mobile", val, { shouldValidate: true });
  };

  const onSubmit = async (data: ReservationFormValues) => {
    setIsSubmitting(true);
    setServerError("");
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          mobile: data.mobile,
          dateTime: `${data.date}T${data.time}:00`,
          guestsCount: parseInt(data.guestsCount, 10),
          notes: data.notes
        })
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "حدث خطأ أثناء الحجز");
      }

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setServerError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl text-center space-y-6">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-accent/20 text-accent">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black text-white">تم الحجز بنجاح!</h2>
          <p className="text-white/70 text-lg">
            شكراً لثقتكم بنا. سيتم التواصل معكم قريباً لتأكيد الحجز.
          </p>
          <div className="pt-4">
            <button
              onClick={() => {
                setIsSuccess(false);
                setValue("fullName", "");
                setValue("mobile", "");
                setValue("notes", "");
              }}
              className="w-full bg-accent text-primary font-bold py-4 rounded-xl shadow-lg hover:scale-[1.02] transition-transform"
            >
              حجز جديد
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">احجز طاولتك</h1>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            تأكد من حجز طاولتك مسبقاً لتضمن تجربة استثنائية دون انتظار.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
              <h3 className="text-2xl font-bold text-white mb-6">معلومات هامة</h3>
              
              <ul className="space-y-6 text-white/80">
                <li className="flex gap-4">
                  <div className="bg-white/10 p-3 rounded-full text-accent h-fit">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">أوقات الذروة</h4>
                    <p className="text-sm leading-relaxed">
                      يفضل الحجز المسبق في عطلة نهاية الأسبوع والمناسبات الرسمية قبل 24 ساعة على الأقل.
                    </p>
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <div className="bg-white/10 p-3 rounded-full text-accent h-fit">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">المجموعات الكبيرة</h4>
                    <p className="text-sm leading-relaxed">
                      للحجوزات التي تتجاوز 10 أشخاص أو لحجز صالة المناسبات يرجى التواصل معنا هاتفياً.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="bg-white/10 p-3 rounded-full text-accent h-fit">
                    <UtensilsCrossed size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">الطلبات الخاصة</h4>
                    <p className="text-sm leading-relaxed">
                      يمكنكم طلب تجهيزات خاصة أو تحديد وجبات معينة في حقل الملاحظات.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
              
              {serverError && (
                <div className="mb-6 bg-red-500/20 border border-red-500/50 text-white p-4 rounded-xl flex items-center gap-2">
                  <span className="font-bold">خطأ:</span> {serverError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                
                {/* Full Name */}
                <div>
                  <label className="block text-white font-bold mb-2 flex items-center gap-2">
                    <User size={18} className="text-accent" /> الاسم الكريم
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    className={cn(
                      "w-full bg-dark/50 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all",
                      errors.fullName ? "border-red-500 focus:ring-red-500/30" : "border-white/10 focus:border-accent focus:ring-accent/30"
                    )}
                    placeholder="الاسم الثلاثي"
                  />
                  {errors.fullName && <p className="text-red-400 text-sm mt-2 font-medium">{errors.fullName.message}</p>}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-white font-bold mb-2 flex items-center gap-2">
                    <Phone size={18} className="text-accent" /> رقم الهاتف
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    {...register("mobile")}
                    onChange={handleMobileChange}
                    className={cn(
                      "w-full bg-dark/50 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all text-left dir-ltr",
                      errors.mobile ? "border-red-500 focus:ring-red-500/30" : "border-white/10 focus:border-accent focus:ring-accent/30"
                    )}
                    placeholder="07xxxxxxxx"
                  />
                  {errors.mobile && <p className="text-red-400 text-sm mt-2 font-medium">{errors.mobile.message}</p>}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-white font-bold mb-2 flex items-center gap-2">
                    <CalendarIcon size={18} className="text-accent" /> تاريخ الحجز
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    {...register("date")}
                    className={cn(
                      "w-full bg-dark/50 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all [color-scheme:dark]",
                      errors.date ? "border-red-500 focus:ring-red-500/30" : "border-white/10 focus:border-accent focus:ring-accent/30"
                    )}
                  />
                  {errors.date && <p className="text-red-400 text-sm mt-2 font-medium">{errors.date.message}</p>}
                </div>

                {/* Time */}
                <div>
                  <label className="block text-white font-bold mb-2 flex items-center gap-2">
                    <Clock size={18} className="text-accent" /> وقت الحجز
                  </label>
                  <input
                    type="time"
                    {...register("time")}
                    className={cn(
                      "w-full bg-dark/50 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all [color-scheme:dark]",
                      errors.time ? "border-red-500 focus:ring-red-500/30" : "border-white/10 focus:border-accent focus:ring-accent/30"
                    )}
                  />
                  {errors.time && <p className="text-red-400 text-sm mt-2 font-medium">{errors.time.message}</p>}
                </div>

                {/* Guests */}
                <div className="md:col-span-2">
                  <label className="block text-white font-bold mb-2 flex items-center gap-2">
                    <Users size={18} className="text-accent" /> عدد الضيوف
                  </label>
                  <select
                    {...register("guestsCount")}
                    className={cn(
                      "w-full bg-dark/50 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all",
                      errors.guestsCount ? "border-red-500 focus:ring-red-500/30" : "border-white/10 focus:border-accent focus:ring-accent/30"
                    )}
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={n} className="bg-dark text-white text-base">{n} شخص</option>
                    ))}
                    <option value="11" className="bg-dark text-white text-base">أكثر من 10 (يرجى توضيح العدد في الملاحظات)</option>
                  </select>
                  {errors.guestsCount && <p className="text-red-400 text-sm mt-2 font-medium">{errors.guestsCount.message}</p>}
                </div>

                {/* Notes */}
                <div className="md:col-span-2">
                  <label className="block text-white font-bold mb-2 flex items-center gap-2">
                    <MessageSquare size={18} className="text-accent" /> ملاحظات إضافية
                  </label>
                  <textarea
                    {...register("notes")}
                    className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all min-h-[120px]"
                    placeholder="طلبات خاصة، مناسبة معينة، ترتيبات مسبقة..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-primary font-bold text-lg py-4 rounded-xl shadow-xl hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري إرسال الحجز...
                  </span>
                ) : (
                  "تأكيد الحجز"
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
