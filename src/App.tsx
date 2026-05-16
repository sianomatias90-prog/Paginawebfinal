import { useState, useEffect } from 'react';
import { getProducts, getConfig } from './lib/data';
import { CartProvider } from './context/CartContext';
import { Product, SiteConfig, Page } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Admin from './pages/Admin';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [catalogCategory, setCatalogCategory] = useState<string | undefined>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [config, setConfig] = useState<SiteConfig>(getConfig());

  useEffect(() => {
    setProducts(getProducts().filter(p => p.active));
    setConfig(getConfig());
  }, []);

  const reloadData = () => {
    setProducts(getProducts().filter(p => p.active));
    setConfig(getConfig());
  };

  const handleNavigate = (p: Page, category?: string) => {
    if (p === 'home') reloadData();
    if (p === 'catalog') setCatalogCategory(category);
    else setCatalogCategory(undefined);
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromProduct = () => {
    setPage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminExit = () => {
    reloadData();
    setPage('home');
  };

  const showFooter = page !== 'admin';

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0a0a0f]">
        {page !== 'admin' && (
          <Header currentPage={page} onNavigate={handleNavigate} />
        )}

        <main>
          {page === 'home' && (
            <Home
              products={products}
              config={config}
              onNavigate={handleNavigate}
              onViewProduct={handleViewProduct}
            />
          )}
          {page === 'catalog' && (
            <Catalog
              products={products}
              onViewProduct={handleViewProduct}
              onNavigate={handleNavigate}
              initialCategory={catalogCategory}
            />
          )}
          {page === 'product' && selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              config={config}
              onBack={handleBackFromProduct}
            />
          )}
          {page === 'admin' && (
            <Admin onExit={handleAdminExit} onProductsChanged={reloadData} />
          )}
        </main>

        {showFooter && (
          <Footer config={config} onNavigate={handleNavigate} />
        )}

        {page !== 'admin' && (
          <CartSidebar config={config} />
        )}
      </div>
    </CartProvider>
  );
}
