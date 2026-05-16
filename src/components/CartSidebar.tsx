import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/format';
import ResolvedImage from './ResolvedImage';
import { SiteConfig } from '../types';

interface CartSidebarProps {
  config: SiteConfig;
}

export default function CartSidebar({ config }: CartSidebarProps) {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, clearCart, total } = useCart();

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    const lines = items.map(item => {
      const colorLine = item.selectedColor ? ` | Color: ${item.selectedColor}` : '';
      const customLine = item.customization ? ` | Personalización: "${item.customization}"` : '';
      return `• ${item.product.name} x${item.quantity}${colorLine}${customLine} — $${formatPrice(item.product.price * item.quantity)}`;
    });

    const message = [
      '¡Hola! Quiero hacer un pedido en MÁS3D:',
      '',
      ...lines,
      '',
      `*Total: $${formatPrice(total)}*`,
      '',
      '¿Podrían confirmar disponibilidad y coordinar el pago? ¡Gracias!'
    ].join('\n');

    const url = `https://wa.me/${config.whatsapp_number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[420px] bg-[#13131a] border-l border-[#1e1e2e] z-50 flex flex-col transition-transform duration-350 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1e1e2e]">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-teal-400" />
            <h2 className="font-['Space_Grotesk'] font-bold text-lg text-white">
              Tu Carrito
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-[#5c5c6e] hover:text-white hover:bg-[#1a1a24] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#1a1a24] border border-[#1e1e2e] flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-[#3a3a50]" />
              </div>
              <div>
                <p className="text-white font-medium mb-1">Tu carrito está vacío</p>
                <p className="text-[#5c5c6e] text-sm">Explorá el catálogo y agregá productos</p>
              </div>
            </div>
          ) : (
            items.map(item => (
              <div
                key={`${item.product.id}-${item.selectedColor}`}
                className="flex gap-3 p-3 bg-[#13131a] border border-[#1e1e2e] rounded-xl"
              >
                <ResolvedImage
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0 bg-[#1a1a24]"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-white text-sm line-clamp-1 mb-0.5">
                    {item.product.name}
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {item.selectedColor && (
                      <span className="text-xs text-[#5c5c6e]">{item.selectedColor}</span>
                    )}
                    {item.customization && (
                      <span className="text-xs text-teal-400/80 truncate max-w-[120px]">
                        "{item.customization}"
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-md bg-[#1a1a24] border border-[#1e1e2e] flex items-center justify-center text-[#5c5c6e] hover:text-white hover:border-teal-500/40 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-sm text-white font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-md bg-[#1a1a24] border border-[#1e1e2e] flex items-center justify-center text-[#5c5c6e] hover:text-white hover:border-teal-500/40 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">
                        ${formatPrice(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1 text-[#5c5c6e] hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#1e1e2e] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#5c5c6e]">Total</span>
              <span className="font-['Space_Grotesk'] font-bold text-2xl text-white">
                ${formatPrice(total)}
              </span>
            </div>

            <button
              onClick={handleWhatsAppCheckout}
              className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_4px_20px_rgba(34,197,94,0.25)]"
            >
              <MessageCircle className="w-5 h-5" />
              Finalizar pedido por WhatsApp
            </button>

            <button
              onClick={clearCart}
              className="w-full text-[#5c5c6e] hover:text-white text-sm text-center py-1 transition-colors"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}
