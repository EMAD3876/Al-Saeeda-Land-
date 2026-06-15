import { useState, useEffect } from "react";
import { UtensilsCrossed, Info } from "lucide-react";

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

type Category = {
  id: number;
  name: string;
  menu_items: MenuItem[];
};

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/menu")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("Invalid menu response:", data);
          setCategories([]);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error("Menu fetch error:", e);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">قائمة الطعام</h1>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            اكتشف تشكيلتنا الواسعة من أشهى المأكولات البحرية، والمشاوي، والخبز الطازج من مخبازتنا.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
            <UtensilsCrossed size={64} className="mx-auto text-white/20 mb-4" />
            <p className="text-white/60 text-lg">لم يتم إضافة أصناف إلى القائمة بعد.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {categories.map((category) => (
              <div key={category.id} className="scroll-mt-24" id={`cat-${category.id}`}>
                <h2 className="text-3xl font-bold text-accent mb-8 flex items-center gap-3">
                  <span className="w-8 h-1 bg-accent inline-block"></span>
                  {category.name}
                </h2>
                
                {category.menu_items.length === 0 ? (
                  <p className="text-white/50 text-sm">لا توجد أصناف متاحة في هذا القسم حالياً.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.menu_items.map((item) => (
                      <div key={item.id} className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all group flex flex-col">
                        <div className="h-48 bg-dark/50 relative">
                          {item.image ? (
                            <img src={item.image} alt={item.name} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/20">
                              <UtensilsCrossed size={40} />
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-white">{item.name}</h3>
                            <span className="text-accent font-bold whitespace-nowrap mr-4 bg-dark py-1 px-3 rounded-lg border border-accent/20">
                              {item.price} ريال
                            </span>
                          </div>
                          <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">
                            {item.description || "بدون تفاصيل إضافية"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
