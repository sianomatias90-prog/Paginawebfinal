import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Product } from '../types';
import { formatPrice } from '../lib/format';
import { getCategoryLabel } from '../lib/categories';
import { useCart } from '../context/CartContext';
import { useValidImages } from '../lib/useValidImages';

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetail }: ProductCardProps) {
  const { addItem } = useCart();
  const imageCandidates = product.image_urls?.length ? product.image_urls : [product.image_url];
  const images = useValidImages(imageCandidates);
  const [imgIndex, setImgIndex] = useState(0);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const color = product.colors[0] || '';
    addItem(product, product.min_order, color, '');
  };

  return (
    <div
      onClick={() => onViewDetail(product)}
      className="group bg-[#13131a] border border-[#1e1e2e] rounded-2xl overflow-hidden cursor-pointer shadow-card hover:border-teal-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,201,167,0.15)]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1a24]">
        <img
          src={images[imgIndex]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category tag */}
        <div className="absolute top-3 left-3">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#0a0a0f]/80 backdrop-blur-sm text-[#5c5c6e] border border-[#1e1e2e]">
            {getCategoryLabel(product.category)}
          </span>
        </div>

        {/* Multi-image dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setImgIndex(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  i === imgIndex ? 'bg-teal-400 w-4' : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}

        {/* Quick add overlay */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleQuickAdd}
            className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-400 text-black text-xs font-semibold px-3 py-2 rounded-lg transition-colors active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Agregar
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-['Space_Grotesk'] font-semibold text-white text-base mb-1 group-hover:text-teal-400 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[#5c5c6e] text-sm line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Material & colors */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-[#5c5c6e] bg-[#1a1a24] px-2 py-0.5 rounded-md border border-[#1e1e2e]">
            {product.material}
          </span>
          {product.colors.slice(0, 3).map(c => (
            <span key={c} className="text-xs text-[#5c5c6e]">{c}</span>
          ))}
          {product.colors.length > 3 && (
            <span className="text-xs text-[#5c5c6e]">+{product.colors.length - 3}</span>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            {product.price > 0 ? (
              <span className="font-['Space_Grotesk'] font-bold text-xl text-white">
                ${formatPrice(product.price)}
              </span>
            ) : (
              <span className="font-['Space_Grotesk'] font-semibold text-base text-teal-400">
                Consultar precio
              </span>
            )}
            {product.min_order > 1 && (
              <p className="text-xs text-[#5c5c6e] mt-0.5">
                Mín. {product.min_order} unid.
              </p>
            )}
            <p className="text-xs text-teal-500/80 mt-0.5 font-medium">
              Consultar por venta mayorista
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onViewDetail(product); }}
            className="flex items-center gap-1 text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors"
          >
            Ver más
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
