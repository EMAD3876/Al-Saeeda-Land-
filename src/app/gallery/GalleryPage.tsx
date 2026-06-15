import { useState, useEffect } from "react";
import { Image as ImageIcon, Maximize2 } from "lucide-react";

type GalleryItem = {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
};

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.error("Invalid gallery response:", data);
          setItems([]);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error("Gallery fetch error:", e);
        setLoading(false);
      });
  }, []);

  const categories = ["ALL", ...Array.from(new Set(items.map(i => i.category)))];
  const filteredItems = activeCategory === "ALL" ? items : items.filter(i => i.category === activeCategory);

  return (
    <div className="min-h-screen bg-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">معرض الصور</h1>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            تصفح صور المطعم، الوجبات، المخبازة، والمنتزه العائلي لتتعرف أكثر على السعيدة لاند.
          </p>
        </div>

        {/* Categories Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-bold transition-all ${
                  activeCategory === cat 
                    ? "bg-accent text-primary shadow-lg" 
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                }`}
              >
                {cat === "ALL" ? "الكل" : cat}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
            <ImageIcon size={64} className="mx-auto text-white/20 mb-4" />
            <p className="text-white/60 text-lg">لم يتم إضافة صور إلى المعرض بعد.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer bg-dark/50"
                onClick={() => setSelectedImage(item.imageUrl)}
              >
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title || "صورة من المعرض"} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20">
                    <ImageIcon size={40} />
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  {item.title && <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>}
                  <span className="text-accent text-sm font-semibold">{item.category}</span>
                  <button className="absolute top-4 right-4 bg-white/20 p-2 rounded-full text-white backdrop-blur-sm">
                    <Maximize2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="صورة مكبرة" 
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button 
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
