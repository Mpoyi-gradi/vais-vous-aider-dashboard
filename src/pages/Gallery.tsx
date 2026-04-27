import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const images = [
    { url: "https://storage.googleapis.com/dala-prod-public-storage/attachments/6ec5bb32-5627-418a-9a23-5a6ad8c273fc/1777323225404_IMG-20250608-WA0076.jpg", title: "Plat Signature" },
    { url: "https://storage.googleapis.com/dala-prod-public-storage/attachments/6ec5bb32-5627-418a-9a23-5a6ad8c273fc/1777323214376_IMG-20250608-WA0088.jpg", title: "Détails Culinaire" },
    { url: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/8dd3d646-97f4-4958-85f7-7dcbf598d408/gourmet-congolese-dish-96ff8152-1777324408699.webp", title: "Cuisine Gastronomique" },
    { url: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/8dd3d646-97f4-4958-85f7-7dcbf598d408/wedding-catering-service-f9e31689-1777324409380.webp", title: "Service Mariage" },
    { url: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/8dd3d646-97f4-4958-85f7-7dcbf598d408/culinary-training-center-8f489462-1777324410017.webp", title: "Nos Apprenants" },
    { url: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop", title: "Buffet Traiteur" }
  ];

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Notre Galerie</h1>
          <p className="text-slate-600">Un aperçu de notre savoir-faire en images</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md h-80"
              onClick={() => setSelectedImg(img.url)}
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white font-bold text-lg">{img.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImg && (
          <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImg(null)}>
            <button className="absolute top-8 right-8 text-white hover:text-amber-500">
              <X className="h-10 w-10" />
            </button>
            <img src={selectedImg} className="max-w-full max-h-[90vh] object-contain rounded-lg" alt="Zoom" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;