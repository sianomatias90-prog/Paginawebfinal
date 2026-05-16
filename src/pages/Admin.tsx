import {
  LogOut, Plus, Pencil, Trash2, Save, X, Eye, EyeOff,
  Package, Settings, Layers, ToggleLeft, ToggleRight, Star, StarOff
} from 'lucide-react';
import { useState } from 'react';
import {
  getProducts, saveConfig, getConfig,
  addProduct, updateProduct, deleteProduct,
} from '../lib/data';
import { Product, SiteConfig } from '../types';
import { formatPrice } from '../lib/format';
import ProductImageGallery from '../components/ProductImageGallery';
import ResolvedImage from '../components/ResolvedImage';
import { cleanupProductImages } from '../lib/productImages';

const ADMIN_PASSWORD = 'mas3d2024';

type AdminTab = 'products' | 'config';

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  image_url: string;
  image_urls: string;
  category: string;
  material: string;
  colors: string;
  min_order: string;
  active: boolean;
  featured: boolean;
}

const emptyForm: ProductFormData = {
  name: '', description: '', price: '', image_url: '', image_urls: '',
  category: '', material: 'PLA', colors: '', min_order: '1',
  active: true, featured: false,
};

interface AdminProps {
  onExit: () => void;
  onProductsChanged?: () => void;
}

export default function Admin({ onExit, onProductsChanged }: AdminProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  const [tab, setTab] = useState<AdminTab>('products');
  const [products, setProducts] = useState<Product[]>(() => getProducts());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>(emptyForm);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [config, setConfig] = useState<SiteConfig>(() => getConfig());
  const [savingConfig, setSavingConfig] = useState(false);
  const [configSaved, setConfigSaved] = useState(false);

  const reload = () => setProducts(getProducts());

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setAuthError('');
    } else {
      setAuthError('Contraseña incorrecta');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setPassword('');
    onExit();
  };

  const openNewProduct = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setGalleryImages([]);
    setShowForm(true);
  };

  const openEditProduct = (product: Product) => {
    setEditingProduct(product);
    const imgs =
      product.image_urls?.length > 0
        ? product.image_urls
        : product.image_url
          ? [product.image_url]
          : [];
    setGalleryImages(imgs);
    setFormData({
      name: product.name,
      description: product.description,
      price: String(product.price),
      image_url: product.image_url,
      image_urls: imgs.join(', '),
      category: product.category,
      material: product.material,
      colors: product.colors.join(', '),
      min_order: String(product.min_order),
      active: product.active,
      featured: product.featured,
    });
    setShowForm(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const gallery = galleryImages.filter(Boolean);
    const payload = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      image_url: gallery[0] || '',
      image_urls: gallery,
      category: formData.category,
      material: formData.material,
      colors: formData.colors.split(',').map(c => c.trim()).filter(Boolean),
      min_order: parseInt(formData.min_order) || 1,
      active: formData.active,
      featured: formData.featured,
    };
    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }
    reload();
    onProductsChanged?.();
    setShowForm(false);
    setSaving(false);
  };

  const handleDeleteProduct = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      void cleanupProductImages(
        product.image_urls?.length ? product.image_urls : product.image_url ? [product.image_url] : [],
      );
    }
    deleteProduct(id);
    reload();
    setDeleteConfirm(null);
  };

  const handleToggleActive = (product: Product) => {
    updateProduct(product.id, { active: !product.active });
    reload();
    onProductsChanged?.();
  };

  const handleToggleFeatured = (product: Product) => {
    updateProduct(product.id, { featured: !product.featured });
    reload();
    onProductsChanged?.();
  };

  const handleSaveConfig = () => {
    setSavingConfig(true);
    saveConfig(config);
    setSavingConfig(false);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 2500);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mx-auto mb-4">
              <Layers className="w-6 h-6 text-teal-400" />
            </div>
            <h1 className="font-['Space_Grotesk'] font-bold text-2xl text-white mb-1">
              Panel Admin
            </h1>
            <p className="text-[#5c5c6e] text-sm">MÁS3D — Gestión de tienda</p>
          </div>

          <div className="bg-[#13131a] border border-[#1e1e2e] rounded-2xl p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-[#5c5c6e] mb-1.5">Contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#1a1a24] border border-[#1e1e2e] text-white placeholder-[#8a8a9a] rounded-xl px-4 py-3 pr-10 focus:outline-none focus:border-teal-500/50 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5c5c6e] hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authError && (
                <p className="text-sm rounded-lg px-3 py-2 bg-red-500/10 text-red-400">
                  {authError}
                </p>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-black font-semibold py-3 rounded-xl transition-all duration-200 active:scale-95"
              >
                <Layers className="w-4 h-4" />
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-['Space_Grotesk'] font-bold text-2xl text-white">Panel Admin</h1>
            <p className="text-[#5c5c6e] text-sm mt-0.5">MÁS3D</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[#5c5c6e] hover:text-white border border-[#1e1e2e] hover:border-[#2a2a38] px-4 py-2 rounded-xl text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Salir
          </button>
        </div>

        <div className="flex gap-1 mb-8 bg-[#13131a] border border-[#1e1e2e] rounded-xl p-1 w-fit">
          {([['products', Package, 'Productos'], ['config', Settings, 'Configuración']] as const).map(([t, Icon, label]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                tab === t
                  ? 'bg-teal-500/15 text-teal-400'
                  : 'text-[#5c5c6e] hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {tab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-[#5c5c6e] text-sm">{products.length} productos</p>
              <button
                onClick={openNewProduct}
                className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-black font-semibold px-4 py-2.5 rounded-xl text-sm transition-all duration-200 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                Nuevo producto
              </button>
            </div>

            <div className="space-y-3">
              {products.map(product => (
                <div
                  key={product.id}
                  className={`flex items-center gap-4 p-4 bg-[#13131a] border rounded-xl transition-colors ${
                    product.active ? 'border-[#1e1e2e]' : 'border-[#1e1e2e] opacity-60'
                  }`}
                >
                  <ResolvedImage
                    src={product.image_url}
                    alt={product.name}
                    className="w-14 h-14 rounded-lg object-cover bg-[#1a1a24] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium text-white text-sm">{product.name}</h3>
                      <span className="text-xs text-[#5c5c6e] bg-[#1a1a24] px-2 py-0.5 rounded-md">
                        {product.category}
                      </span>
                      {product.featured && (
                        <span className="text-xs text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-md">
                          Destacado
                        </span>
                      )}
                    </div>
                    <p className="text-teal-400 text-sm font-semibold mt-0.5">
                      {product.price > 0 ? `$${formatPrice(product.price)}` : 'Consultar precio'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleFeatured(product)}
                      title={product.featured ? 'Quitar destacado' : 'Destacar'}
                      className="p-2 rounded-lg text-[#5c5c6e] hover:text-yellow-400 hover:bg-yellow-500/10 transition-colors"
                    >
                      {product.featured ? <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> : <StarOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleToggleActive(product)}
                      title={product.active ? 'Desactivar' : 'Activar'}
                      className="p-2 rounded-lg text-[#5c5c6e] hover:text-teal-400 transition-colors"
                    >
                      {product.active
                        ? <ToggleRight className="w-5 h-5 text-teal-400" />
                        : <ToggleLeft className="w-5 h-5" />
                      }
                    </button>
                    <button
                      onClick={() => openEditProduct(product)}
                      className="p-2 rounded-lg text-[#5c5c6e] hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    {deleteConfirm === product.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="px-3 py-1.5 bg-red-500/15 text-red-400 hover:bg-red-500/25 rounded-lg text-xs font-medium transition-colors"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="p-1.5 text-[#5c5c6e] hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(product.id)}
                        className="p-2 rounded-lg text-[#5c5c6e] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'config' && (
          <div className="max-w-xl">
            <div className="bg-[#13131a] border border-[#1e1e2e] rounded-2xl p-6 space-y-5">
              {[
                { key: 'whatsapp_number' as keyof SiteConfig, label: 'Número de WhatsApp', placeholder: '5491112345678', hint: 'Solo números, código de país sin +' },
                { key: 'store_name' as keyof SiteConfig, label: 'Nombre de la tienda', placeholder: 'MÁS3D' },
                { key: 'store_tagline' as keyof SiteConfig, label: 'Eslogan', placeholder: 'Impresión 3D Personalizada' },
                { key: 'store_email' as keyof SiteConfig, label: 'Email de contacto', placeholder: 'contacto@mas3d.com' },
                { key: 'store_instagram' as keyof SiteConfig, label: 'Instagram', placeholder: '@mas3d' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-white mb-1.5">{field.label}</label>
                  <input
                    type="text"
                    value={config[field.key] || ''}
                    onChange={e => setConfig(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full bg-[#1a1a24] border border-[#1e1e2e] text-white placeholder-[#8a8a9a] rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500/50 text-sm transition-colors"
                  />
                  {field.hint && <p className="text-xs text-[#5c5c6e] mt-1">{field.hint}</p>}
                </div>
              ))}

              <button
                onClick={handleSaveConfig}
                disabled={savingConfig}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 ${
                  configSaved
                    ? 'bg-teal-600 text-white'
                    : 'bg-teal-500 hover:bg-teal-400 text-black'
                } disabled:opacity-60`}
              >
                <Save className="w-4 h-4" />
                {configSaved ? 'Guardado' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="w-full max-w-2xl my-8 bg-[#13131a] border border-[#1e1e2e] rounded-2xl animate-fade-up">
            <div className="flex items-center justify-between p-6 border-b border-[#1e1e2e]">
              <h2 className="font-['Space_Grotesk'] font-bold text-lg text-white">
                {editingProduct ? 'Editar producto' : 'Nuevo producto'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg text-[#5c5c6e] hover:text-white hover:bg-white/5 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm text-[#5c5c6e] mb-1.5">Nombre *</label>
                  <input required type="text" value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-[#1a1a24] border border-[#1e1e2e] text-white placeholder-[#8a8a9a] rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500/50 text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-[#5c5c6e] mb-1.5">Descripción *</label>
                  <textarea required rows={3} value={formData.description}
                    onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                    className="w-full bg-[#1a1a24] border border-[#1e1e2e] text-white placeholder-[#8a8a9a] rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500/50 text-sm resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#5c5c6e] mb-1.5">Precio (ARS) — 0 para consultar</label>
                  <input type="number" min="0" step="0.01" value={formData.price}
                    onChange={e => setFormData(p => ({ ...p, price: e.target.value }))}
                    className="w-full bg-[#1a1a24] border border-[#1e1e2e] text-white placeholder-[#8a8a9a] rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500/50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#5c5c6e] mb-1.5">Categoría *</label>
                  <input required type="text" placeholder="chop-futbol, chop-musica, vasos-milkshake, grabado-laser..." value={formData.category}
                    onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                    className="w-full bg-[#1a1a24] border border-[#1e1e2e] text-white placeholder-[#8a8a9a] rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500/50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#5c5c6e] mb-1.5">Material</label>
                  <input type="text" placeholder="PLA, PETG, ABS..." value={formData.material}
                    onChange={e => setFormData(p => ({ ...p, material: e.target.value }))}
                    className="w-full bg-[#1a1a24] border border-[#1e1e2e] text-white placeholder-[#8a8a9a] rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500/50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#5c5c6e] mb-1.5">Cantidad mínima</label>
                  <input type="number" min="1" value={formData.min_order}
                    onChange={e => setFormData(p => ({ ...p, min_order: e.target.value }))}
                    className="w-full bg-[#1a1a24] border border-[#1e1e2e] text-white placeholder-[#8a8a9a] rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500/50 text-sm"
                  />
                </div>
                <ProductImageGallery images={galleryImages} onChange={setGalleryImages} />
                <div className="sm:col-span-2">
                  <label className="block text-sm text-[#5c5c6e] mb-1.5">
                    Colores disponibles <span className="text-[#8a8a9a]">(separados por coma)</span>
                  </label>
                  <input type="text" placeholder="Blanco, Negro, Rojo..." value={formData.colors}
                    onChange={e => setFormData(p => ({ ...p, colors: e.target.value }))}
                    className="w-full bg-[#1a1a24] border border-[#1e1e2e] text-white placeholder-[#8a8a9a] rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500/50 text-sm"
                  />
                </div>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.active}
                      onChange={e => setFormData(p => ({ ...p, active: e.target.checked }))}
                      className="w-4 h-4 rounded accent-teal-500"
                    />
                    <span className="text-sm text-white">Activo</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.featured}
                      onChange={e => setFormData(p => ({ ...p, featured: e.target.checked }))}
                      className="w-4 h-4 rounded accent-teal-500"
                    />
                    <span className="text-sm text-white">Destacado</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving}
                  className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-60 text-black font-semibold px-6 py-3 rounded-xl text-sm transition-all active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  {editingProduct ? 'Guardar cambios' : 'Crear producto'}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-[#1e1e2e] text-[#5c5c6e] hover:text-white hover:border-[#2a2a38] rounded-xl text-sm transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
