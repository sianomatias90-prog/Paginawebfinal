import { Layers, Instagram, Mail, MessageCircle } from 'lucide-react';
import { Page, SiteConfig } from '../types';

interface FooterProps {
  config: SiteConfig;
  onNavigate: (page: Page, category?: string) => void;
}

export default function Footer({ config, onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#0a0a0f] border-t border-[#1e1e2e] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center">
                <Layers className="w-4 h-4 text-teal-400" />
              </div>
              <span className="font-['Space_Grotesk'] font-bold text-xl text-white">
                MÁS<span className="text-teal-400">3D</span>
              </span>
            </div>
            <p className="text-[#5c5c6e] text-sm leading-relaxed">
              {config.store_tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-[#5c5c6e] hover:text-teal-400 text-sm transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="text-[#5c5c6e] hover:text-teal-400 text-sm transition-colors"
                >
                  Catálogo de Productos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', 'Grabado Laser')}
                  className="text-[#5c5c6e] hover:text-amber-400 text-sm transition-colors"
                >
                  Grabado Laser
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${config.whatsapp_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#5c5c6e] hover:text-teal-400 text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                WhatsApp
              </a>
              <a
                href={`mailto:${config.store_email}`}
                className="flex items-center gap-3 text-[#5c5c6e] hover:text-teal-400 text-sm transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                {config.store_email}
              </a>
              <a
                href={`https://instagram.com/${config.store_instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#5c5c6e] hover:text-teal-400 text-sm transition-colors"
              >
                <Instagram className="w-4 h-4 flex-shrink-0" />
                {config.store_instagram}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#1e1e2e] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#5c5c6e] text-xs">
            © {new Date().getFullYear()} MÁS3D. Todos los derechos reservados.
          </p>
          <button
            onClick={() => onNavigate('admin')}
            className="text-[#3a3a50] hover:text-[#5c5c6e] text-xs transition-colors"
          >
            Panel Admin
          </button>
        </div>
      </div>
    </footer>
  );
}
