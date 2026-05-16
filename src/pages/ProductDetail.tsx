import { ArrowLeft, ShoppingCart, MessageCircle, Package, Layers, Minus, Plus, Check, ChevronLeft, ChevronRight, Droplets, Thermometer, Puzzle, ScanLine } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Product, SiteConfig } from '../types';
import { formatPrice } from '../lib/format';
import { getCategoryLabel } from '../lib/categories';
import { useCart } from '../context/CartContext';
import { useValidImages } from '../lib/useValidImages';

interface ProductDetailProps {
  product: Product;
  config: SiteConfig;
  onBack: () => void;
}

export default function ProductDetail({ product, config, onBack }: ProductDetailProps) {
  const { addItem } = useCart();
  const imageCandidates = product.image_urls?.length ? product.image_urls : [product.image_url];
  const images = useValidImages(imageCandidates);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setActiveImg(0);
  }, [product.id, images.length]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [quantity, setQuantity] = useState(product.min_order);
  const [customization, setCustomization] = useState('');
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor, customization);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsAppDirect = () => {
    const colorLine = selectedColor ? `Color: ${selectedColor}\n` : '';
    const customLine = customization ? `Personalización: "${customization}"\n` : '';
    const message = [
      `¡Hola! Me interesa este producto:`,
      ``,
      `*${product.name}*`,
      `Cantidad: ${quantity}`,
      colorLine.trim(),
      customLine.trim(),
      ``,
      `¿Pueden darme más información?`
    ].filter(l => l !== undefined).join('\n');

    window.open(
      `https://wa.me/${config.whatsapp_number}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#5c5c6e] hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Volver al catálogo</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image gallery */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#13131a] border border-[#1e1e2e] group">
              <img
                src={images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-[#0a0a0f]/90 backdrop-blur-sm border border-[#1e1e2e] flex items-center justify-center text-white hover:border-teal-500/50 transition-colors opacity-0 group-hover:opacity-100 shadow-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImg(i => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-[#0a0a0f]/90 backdrop-blur-sm border border-[#1e1e2e] flex items-center justify-center text-white hover:border-teal-500/50 transition-colors opacity-0 group-hover:opacity-100 shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      i === activeImg ? 'border-teal-500' : 'border-[#1e1e2e] hover:border-teal-500/40'
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {/* Category & name */}
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 w-fit mb-4">
              {getCategoryLabel(product.category)}
            </span>
            <h1 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl text-white mb-3">
              {product.name}
            </h1>
            <p className="text-[#5c5c6e] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Price */}
            <div className="mb-6">
              {product.price > 0 ? (
                <span className="font-['Space_Grotesk'] font-bold text-4xl text-white">
                  ${formatPrice(product.price)}
                </span>
              ) : (
                <span className="font-['Space_Grotesk'] font-semibold text-2xl text-teal-400">
                  Consultar precio por WhatsApp
                </span>
              )}
              {product.min_order > 1 && (
                <p className="text-[#5c5c6e] text-sm mt-1">
                  Pedido mínimo: {product.min_order} unidades
                </p>
              )}
            </div>

            {/* Details */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center gap-2 px-3 py-2 bg-[#13131a] border border-[#1e1e2e] rounded-xl">
                <Layers className="w-4 h-4 text-teal-400" />
                <div>
                  <p className="text-xs text-[#5c5c6e]">Material</p>
                  <p className="text-sm text-white font-medium">{product.material}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-[#13131a] border border-[#1e1e2e] rounded-xl">
                <Package className="w-4 h-4 text-teal-400" />
                <div>
                  <p className="text-xs text-[#5c5c6e]">Min. orden</p>
                  <p className="text-sm text-white font-medium">{product.min_order} unid.</p>
                </div>
              </div>
            </div>

            {/* Polymer specs for milkshake cups */}
            {product.category === 'vasos-milkshake' && (
              <div className="mb-6 p-4 bg-[#13131a] border border-[#1e1e2e] rounded-2xl">
                <p className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-3">Polimero incluido</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                      <Droplets className="w-4 h-4 text-teal-400" />
                    </div>
                    <p className="text-xs text-[#5c5c6e]">Capacidad</p>
                    <p className="text-sm text-white font-semibold">300 ml</p>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                      <Puzzle className="w-4 h-4 text-teal-400" />
                    </div>
                    <p className="text-xs text-[#5c5c6e]">Diseño</p>
                    <p className="text-sm text-white font-semibold">Desmontable</p>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                      <Thermometer className="w-4 h-4 text-teal-400" />
                    </div>
                    <p className="text-xs text-[#5c5c6e]">Uso</p>
                    <p className="text-sm text-white font-semibold">Apto microondas</p>
                  </div>
                </div>
              </div>
            )}

            {product.category === 'grabado-laser' && (
              <div className="mb-6 p-4 bg-[#13131a] border border-amber-500/20 rounded-2xl">
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ScanLine className="w-4 h-4" />
                  Grabado Laser
                </p>
                <p className="text-[#5c5c6e] text-sm leading-relaxed">
                  {product.material === 'Madera' && product.category === 'grabado-laser'
                    ? 'Tabla lista para picadas con Grabado Laser de alta precisión. ¿Querés otra temática? Escribinos por WhatsApp con tu idea y la hacemos a medida.'
                    : 'Alta precisión en el material elegido. Enviá tu logo, texto o diseño por WhatsApp y te confirmamos el valor final según tamaño y complejidad.'}
                </p>
              </div>
            )}

            {/* Color selector */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-white mb-3">
                  Color: <span className="text-teal-400">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                        selectedColor === color
                          ? 'border-teal-500 bg-teal-500/15 text-teal-400'
                          : 'border-[#1e1e2e] text-[#5c5c6e] hover:border-teal-500/40 hover:text-white bg-[#13131a]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Customization */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                Personalización <span className="text-[#5c5c6e] font-normal">(opcional)</span>
              </label>
              <textarea
                value={customization}
                onChange={e => setCustomization(e.target.value)}
                placeholder="Ej: Nombre, texto, logo o indicaciones especiales..."
                rows={3}
                className="w-full bg-[#13131a] border border-[#1e1e2e] text-white placeholder-[#8a8a9a] rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500/50 transition-colors text-sm resize-none"
              />
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <div>
                <p className="text-sm font-medium text-white mb-2">Cantidad</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(q => Math.max(product.min_order, q - 1))}
                    className="w-9 h-9 rounded-xl bg-[#13131a] border border-[#1e1e2e] flex items-center justify-center text-[#5c5c6e] hover:text-white hover:border-teal-500/40 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-white font-semibold text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-9 h-9 rounded-xl bg-[#13131a] border border-[#1e1e2e] flex items-center justify-center text-[#5c5c6e] hover:text-white hover:border-teal-500/40 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex-1" />
              {product.price > 0 && (
                <div className="text-right">
                  <p className="text-xs text-[#5c5c6e] mb-1">Subtotal</p>
                  <p className="font-['Space_Grotesk'] font-bold text-2xl text-white">
                    ${formatPrice(product.price * quantity)}
                  </p>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all duration-200 active:scale-95 ${
                  added
                    ? 'bg-teal-600 text-white'
                    : 'bg-teal-500 hover:bg-teal-400 text-black shadow-[0_4px_24px_rgba(0,201,167,0.3)]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Agregado al carrito
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Agregar al carrito
                  </>
                )}
              </button>
              <button
                onClick={handleWhatsAppDirect}
                className="flex-1 flex items-center justify-center gap-2 border border-green-500/40 hover:border-green-400 text-green-400 hover:text-green-300 py-4 rounded-xl font-medium transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5" />
                Consultar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
