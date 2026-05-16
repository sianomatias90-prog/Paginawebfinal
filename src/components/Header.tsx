import { ShoppingCart, Menu, X, Layers } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page, category?: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const { count, setIsOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Inicio', page: 'home' as Page },
    { label: 'Catálogo', page: 'catalog' as Page },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-[#1e1e2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center group-hover:bg-teal-500/30 transition-colors">
              <Layers className="w-4 h-4 text-teal-400" />
            </div>
            <span className="font-['Space_Grotesk'] font-bold text-xl text-white tracking-tight">
              MÁS<span className="text-teal-400">3D</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === link.page
                    ? 'text-teal-400 bg-teal-500/10'
                    : 'text-[#5c5c6e] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1a1a24] border border-[#1e1e2e] hover:border-teal-500/40 transition-all duration-200 group"
            >
              <ShoppingCart className="w-4 h-4 text-[#5c5c6e] group-hover:text-teal-400 transition-colors" />
              <span className="text-sm text-[#5c5c6e] group-hover:text-white transition-colors hidden sm:block">
                Carrito
              </span>
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-teal-500 text-black text-xs font-bold rounded-full flex items-center justify-center animate-fade-in">
                  {count}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-[#5c5c6e] hover:text-white hover:bg-white/5 transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#1e1e2e] bg-[#0a0a0f] animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => { onNavigate(link.page); setMenuOpen(false); }}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  currentPage === link.page
                    ? 'text-teal-400 bg-teal-500/10'
                    : 'text-[#5c5c6e] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
