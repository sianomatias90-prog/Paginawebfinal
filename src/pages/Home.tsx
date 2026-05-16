import { ArrowRight, Zap, Star, Package, Palette, Settings, MessageCircle, ScanLine } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Product, SiteConfig, Page } from '../types';
import ProductCard from '../components/ProductCard';

interface HomeProps {
  products: Product[];
  config: SiteConfig;
  onNavigate: (page: Page, category?: string) => void;
  onViewProduct: (product: Product) => void;
}

const serviceLines = [
  { label: 'Vasos', category: 'Vasos Milkshake' },
  { label: 'Chop Futbol', category: 'Chop Futbol' },
  { label: 'Chop Musica', category: 'Chop Musica' },
  { label: 'Grabado Laser', category: 'Grabado Laser', accent: 'amber' as const },
];

const features = [
  {
    icon: Zap,
    title: 'Entrega Rápida',
    desc: 'Producimos y enviamos en 3 a 7 días hábiles según el producto.',
  },
  {
    icon: Palette,
    title: 'Colores a Elección',
    desc: 'Amplia paleta de colores para que quede justo como lo imaginás.',
  },
  {
    icon: Settings,
    title: '100% Personalizable',
    desc: 'Nombre, escudo, fecha o lo que quieras. Lo hacemos a medida.',
  },
  {
    icon: Star,
    title: 'Calidad Premium',
    desc: 'Filamentos PETG y PLA de primera calidad con acabado prolijo.',
  },
];

export default function Home({ products, config, onNavigate, onViewProduct }: HomeProps) {
  const featured = products.filter(p => p.featured);
  const picadaOrder = ['26', '31', '32', '30', '33', '34'];
  const laserProducts = products
    .filter(p => p.category === 'grabado-laser' && p.material === 'Madera')
    .sort((a, b) => picadaOrder.indexOf(a.id) - picadaOrder.indexOf(b.id));
  const parallaxImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxImgRef.current) return;
      parallaxImgRef.current.style.transform = `translateY(${window.scrollY * 0.45}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-32 px-4 sm:px-6 lg:px-8" style={{ minHeight: '100vh' }}>

        {/* Parallax background */}
        <div
          ref={parallaxImgRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{ top: '-15%', height: '130%' }}
        >
          <img
            src="/argentina.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.58, filter: 'saturate(0.5) brightness(0.55)' }}
          />
          {/* gradient fade into page background at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/40 via-[#0a0a0f]/20 to-[#0a0a0f]" />
        </div>

        {/* Teal glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-teal-500/5 blur-3xl" />
          <div className="absolute top-40 right-0 w-80 h-80 rounded-full bg-teal-500/5 blur-3xl" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(#00c9a7 1px, transparent 1px), linear-gradient(to right, #00c9a7 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-400 text-xs font-medium mb-6 animate-fade-up">
            <Package className="w-3.5 h-3.5" />
            Impresión 3D · Grabado Laser
          </div>

          <h1 className="font-['Space_Grotesk'] font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.1] mb-4 animate-fade-up-delay-1">
            Vasos, Chops y{' '}
            <span className="text-gradient">Regalos Únicos</span>
          </h1>

          <div className="max-w-2xl mx-auto mb-8 animate-fade-up-delay-2">
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 px-6 py-5 backdrop-blur-sm">
              <p className="text-amber-400 text-sm font-medium mb-1 flex items-center justify-center gap-2">
                <ScanLine className="w-4 h-4" />
                Otra especialidad
              </p>
              <p className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl text-white">
                <span className="text-gradient-amber">Grabado Laser</span>
              </p>
              <p className="text-white/80 text-sm sm:text-base mt-2">
                Tablas de madera con la temática que quieras
              </p>
            </div>
          </div>

          <p className="text-white/85 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-up-delay-2">
            Personalizados con tu nombre, escudo o diseño. Elegí tu sección:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 animate-fade-up-delay-2">
            {serviceLines.map(line => (
              <button
                key={line.label}
                type="button"
                onClick={() => onNavigate('catalog', line.category)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 active:scale-95 ${
                  line.accent === 'amber'
                    ? 'bg-amber-500/10 border-amber-500/35 text-amber-400 hover:bg-amber-500/20 hover:border-amber-400/50'
                    : 'bg-teal-500/10 border-teal-500/25 text-teal-400 hover:bg-teal-500/20 hover:border-teal-400/40'
                }`}
              >
                {line.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 animate-fade-up-delay-3">
            <button
              onClick={() => onNavigate('catalog')}
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-black font-semibold px-8 py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_4px_24px_rgba(0,201,167,0.3)] w-full sm:w-auto justify-center"
            >
              Ver Catálogo
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('catalog', 'Grabado Laser')}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold px-8 py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_4px_24px_rgba(245,158,11,0.25)] w-full sm:w-auto justify-center"
            >
              <ScanLine className="w-4 h-4" />
              Ver Grabado Laser
            </button>
            <a
              href={`https://wa.me/${config.whatsapp_number}?text=${encodeURIComponent('¡Hola! Quiero hacer una consulta sobre sus productos de impresión 3D.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-[#1e1e2e] hover:border-teal-500/40 text-white hover:text-teal-400 font-medium px-8 py-4 rounded-xl transition-all duration-200 w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-4 h-4" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#5c5c6e]">scroll</span>
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
            <rect x="1" y="1" width="12" height="20" rx="6" stroke="#8888a0" strokeWidth="1.2"/>
            <rect x="5.5" y="4.5" width="3" height="5" rx="1.5" fill="#00c9a7">
              <animate attributeName="y" values="4.5;10;4.5" dur="1.8s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0;1" dur="1.8s" repeatCount="indefinite"/>
            </rect>
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="p-5 bg-[#13131a] border border-[#1e1e2e] rounded-2xl shadow-card hover:border-teal-500/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4 group-hover:bg-teal-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-teal-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-1.5">{f.title}</h3>
                  <p className="text-[#5c5c6e] text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Laser engraving */}
      {laserProducts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-amber-400 text-sm font-medium mb-2 flex items-center gap-2">
                  <ScanLine className="w-4 h-4" />
                  Nuevo servicio
                </p>
                <h2 className="font-['Space_Grotesk'] font-bold text-3xl text-white">
                  <span className="text-gradient-amber">Grabado Laser</span> en picadas
                </h2>
                <p className="text-[#5c5c6e] mt-2 max-w-xl">
                  Grabamos maderas para picadas con la temática que quieras: fútbol, nombres, logos o tu diseño.
                </p>
              </div>
              <button
                onClick={() => onNavigate('catalog', 'Grabado Laser')}
                className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium text-sm transition-colors shrink-0"
              >
                Ver sección completa
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {laserProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetail={onViewProduct}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-teal-400 text-sm font-medium mb-2">Productos Destacados</p>
                <h2 className="font-['Space_Grotesk'] font-bold text-3xl text-white">
                  Los más pedidos
                </h2>
              </div>
              <button
                onClick={() => onNavigate('catalog')}
                className="hidden sm:flex items-center gap-1.5 text-teal-400 hover:text-teal-300 font-medium text-sm transition-colors"
              >
                Ver todos
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.slice(0, 6).map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetail={onViewProduct}
                />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <button
                onClick={() => onNavigate('catalog')}
                className="flex items-center gap-2 text-teal-400 hover:text-teal-300 font-medium mx-auto transition-colors"
              >
                Ver catálogo completo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Revendedor + a medida */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="relative flex flex-col h-full bg-[#13131a] border border-[#1e1e2e] rounded-3xl p-8 sm:p-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

            <div className="relative flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                <Package className="w-7 h-7 text-amber-400" />
              </div>
              <p className="text-amber-400 text-sm font-medium mb-2 tracking-wide uppercase">Para negocios y emprendedores</p>
              <h2 className="font-['Space_Grotesk'] font-bold text-2xl sm:text-3xl text-white mb-3">
                ¿Querés ser revendedor de MÁS3D?
              </h2>
              <p className="text-[#5c5c6e] text-base leading-relaxed flex-1 mb-8">
                Sumate a nuestra red de revendedores y accedé a precios mayoristas, stock exclusivo y soporte dedicado. Mandanos un mensaje y te contamos todo.
              </p>
              <a
                href={`https://wa.me/${config.whatsapp_number}?text=${encodeURIComponent('¡Hola! Me interesa ser revendedor de MAS3D. ¿Me pueden dar más información?')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_4px_20px_rgba(245,158,11,0.2)] w-full sm:w-auto mt-auto"
              >
                <MessageCircle className="w-5 h-5" />
                Escribinos por WhatsApp
              </a>
            </div>
          </div>

          <div className="relative flex flex-col h-full bg-[#13131a] border border-teal-500/20 rounded-3xl p-8 sm:p-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />

            <div className="relative flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-6">
                <Palette className="w-7 h-7 text-teal-400" />
              </div>
              <p className="text-teal-400 text-sm font-medium mb-2 tracking-wide uppercase">Personalizado</p>
              <h2 className="font-['Space_Grotesk'] font-bold text-2xl sm:text-3xl text-white mb-3">
                ¿Querés algo a medida?
              </h2>
              <p className="text-[#5c5c6e] text-base leading-relaxed flex-1 mb-8">
                Contanos tu idea y la hacemos realidad. Escudos de equipos, nombres,
                logos de negocio — todo se puede imprimir en 3D.
              </p>
              <a
                href={`https://wa.me/${config.whatsapp_number}?text=${encodeURIComponent('¡Hola! Quiero consultar sobre un producto personalizado de MÁS3D.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_4px_20px_rgba(34,197,94,0.2)] w-full sm:w-auto mt-auto"
              >
                <MessageCircle className="w-5 h-5" />
                Escribinos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
