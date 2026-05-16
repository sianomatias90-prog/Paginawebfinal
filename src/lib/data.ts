import { Product, SiteConfig } from '../types';

export const CHOP_PRICE = 19999;

const chopDescription = (team: string) =>
  `Chop cervecero personalizado con el escudo de ${team}. PLA resistente de alta calidad, ideal para regalo de hincha.`;

const futbolChopProducts: Product[] = [
  {
    id: '5',
    name: 'Chop Estudiantes de Caseros',
    description: chopDescription('Estudiantes de Caseros'),
    price: CHOP_PRICE,
    image_url: '/chops/estudiantes-caseros.jpeg',
    image_urls: ['/chops/estudiantes-caseros.jpeg'],
    category: 'chop-futbol',
    material: 'PLA',
    colors: ['Rojo y Negro', 'Blanco', 'Negro'],
    min_order: 1,
    active: true,
    featured: false,
    created_at: '2026-05-02T00:00:00Z',
  },
  {
    id: '16',
    name: 'Chop Racing Club',
    description: chopDescription('Racing Club'),
    price: CHOP_PRICE,
    image_url: '/chops/racing.jpeg',
    image_urls: ['/chops/racing.jpeg'],
    category: 'chop-futbol',
    material: 'PLA',
    colors: ['Celeste y Blanco', 'Blanco', 'Negro'],
    min_order: 1,
    active: true,
    featured: true,
    created_at: '2026-05-13T00:00:00Z',
  },
  {
    id: '17',
    name: 'Chop Independiente',
    description: chopDescription('Independiente'),
    price: CHOP_PRICE,
    image_url: '/chops/independiente.jpeg',
    image_urls: ['/chops/independiente.jpeg'],
    category: 'chop-futbol',
    material: 'PLA',
    colors: ['Rojo y Blanco', 'Blanco', 'Negro'],
    min_order: 1,
    active: true,
    featured: true,
    created_at: '2026-05-13T00:00:00Z',
  },
  {
    id: '18',
    name: 'Chop River Plate',
    description: chopDescription('River Plate'),
    price: CHOP_PRICE,
    image_url: '/chops/river.jpeg',
    image_urls: ['/chops/river.jpeg', '/chops/river-detalle.jpeg'],
    category: 'chop-futbol',
    material: 'PLA',
    colors: ['Rojo y Blanco', 'Blanco', 'Negro'],
    min_order: 1,
    active: true,
    featured: true,
    created_at: '2026-05-13T00:00:00Z',
  },
  {
    id: '19',
    name: 'Chop Selección Argentina',
    description: chopDescription('la Selección Argentina'),
    price: CHOP_PRICE,
    image_url: '/chops/seleccion-argentina.jpeg',
    image_urls: ['/chops/seleccion-argentina.jpeg', '/argentina.jpg'],
    category: 'chop-futbol',
    material: 'PLA',
    colors: ['Celeste y Blanco', 'Blanco', 'Negro'],
    min_order: 1,
    active: true,
    featured: true,
    created_at: '2026-05-13T00:00:00Z',
  },
  {
    id: '20',
    name: 'Chop San Lorenzo',
    description: chopDescription('San Lorenzo'),
    price: CHOP_PRICE,
    image_url: '/chops/san-lorenzo.jpeg',
    image_urls: ['/chops/san-lorenzo.jpeg'],
    category: 'chop-futbol',
    material: 'PLA',
    colors: ['Rojo y Azul', 'Blanco', 'Negro'],
    min_order: 1,
    active: true,
    featured: false,
    created_at: '2026-05-13T00:00:00Z',
  },
  {
    id: '21',
    name: 'Chop Chacarita Juniors',
    description: chopDescription('Chacarita Juniors'),
    price: CHOP_PRICE,
    image_url: '/chops/chacarita.jpeg',
    image_urls: ['/chops/chacarita.jpeg'],
    category: 'chop-futbol',
    material: 'PLA',
    colors: ['Rojo y Negro', 'Blanco', 'Negro'],
    min_order: 1,
    active: true,
    featured: false,
    created_at: '2026-05-13T00:00:00Z',
  },
  {
    id: '22',
    name: 'Chop Almagro',
    description: chopDescription('Almagro'),
    price: CHOP_PRICE,
    image_url: '/chops/almagro.jpeg',
    image_urls: ['/chops/almagro.jpeg'],
    category: 'chop-futbol',
    material: 'PLA',
    colors: ['Azul y Negro', 'Blanco', 'Negro'],
    min_order: 1,
    active: true,
    featured: false,
    created_at: '2026-05-13T00:00:00Z',
  },
];

const musicChopDescription = (artist: string) =>
  `Chop cervecero personalizado con diseño de ${artist}. PLA resistente de alta calidad, ideal para regalo.`;

const musicChopProducts: Product[] = [
  {
    id: '23',
    name: 'Chop Banda XXI',
    description: musicChopDescription('Banda XXI'),
    price: CHOP_PRICE,
    image_url: '/musica/banda-xxi.jpg',
    image_urls: ['/musica/banda-xxi.jpg'],
    category: 'chop-musica',
    material: 'PLA',
    colors: ['Negro y Rosa', 'Blanco', 'Negro'],
    min_order: 1,
    active: true,
    featured: true,
    created_at: '2026-05-13T00:00:00Z',
  },
  {
    id: '24',
    name: 'Chop Huguito Flores',
    description: musicChopDescription('Huguito Flores'),
    price: CHOP_PRICE,
    image_url: '/musica/huguito-flores.jpg',
    image_urls: ['/musica/huguito-flores.jpg'],
    category: 'chop-musica',
    material: 'PLA',
    colors: ['Rosa', 'Blanco', 'Negro'],
    min_order: 1,
    active: true,
    featured: true,
    created_at: '2026-05-13T00:00:00Z',
  },
  {
    id: '25',
    name: 'Chop Un Poco de Ruido',
    description: musicChopDescription('Un Poco de Ruido'),
    price: CHOP_PRICE,
    image_url: '/musica/un-poco-de-ruido.jpeg',
    image_urls: ['/musica/un-poco-de-ruido.jpeg'],
    category: 'chop-musica',
    material: 'PLA',
    colors: ['Amarillo y Azul', 'Blanco', 'Negro'],
    min_order: 1,
    active: true,
    featured: false,
    created_at: '2026-05-13T00:00:00Z',
  },
];

export const PICADA_PRICE = 18000;

const laserDescription = (material: string, detail: string) =>
  `Grabado Laser en ${material}. ${detail} Ideal para regalos, eventos y merchandising personalizado.`;

const picadaBoardProducts: Product[] = [
  {
    id: '26',
    name: 'Tabla Picada Pink Panther',
    description:
      'Tabla de madera con grabado láser de la Pantera Rosa y toda la banda: Inspector, el enano, la hormiga y el oso hormiguero. Línea fina, estilo cartoon, perfecta para picadas con onda retro. Regalo ideal para fans del clásico.',
    price: PICADA_PRICE,
    image_url: '/grabado-laser/picadas/pink-panther.jpg',
    image_urls: ['/grabado-laser/picadas/pink-panther.jpg'],
    category: 'grabado-laser',
    material: 'Madera',
    colors: ['Natural'],
    min_order: 1,
    active: true,
    featured: true,
    created_at: '2026-05-16T00:00:00Z',
  },
  {
    id: '30',
    name: 'Tabla Picada Breaking Bad',
    description:
      'La RV, el logo con Br y Ba, y los personajes estilo caricatura en una sola tabla. Para el fanático de Walter y Jesse que quiere sumar estilo a sus picadas. Grabado nítido, terminación prolija.',
    price: PICADA_PRICE,
    image_url: '/grabado-laser/picadas/breaking-bad.jpg',
    image_urls: ['/grabado-laser/picadas/breaking-bad.jpg'],
    category: 'grabado-laser',
    material: 'Madera',
    colors: ['Natural'],
    min_order: 1,
    active: true,
    featured: false,
    created_at: '2026-05-16T00:00:00Z',
  },
  {
    id: '31',
    name: 'Tabla Picada Selección Argentina',
    description:
      'Escudo de la AFA con las 3 estrellas de campeón del mundo. La picada del hincha argentino: asado, quesos, fiambres y bandera en la madera. Regalo que no falla para cumpleaños, papá o amigo futbolero.',
    price: PICADA_PRICE,
    image_url: '/grabado-laser/picadas/seleccion-argentina.jpg',
    image_urls: ['/grabado-laser/picadas/seleccion-argentina.jpg'],
    category: 'grabado-laser',
    material: 'Madera',
    colors: ['Natural'],
    min_order: 1,
    active: true,
    featured: true,
    created_at: '2026-05-16T00:00:00Z',
  },
  {
    id: '32',
    name: 'Tabla Picada Argentina — Copa del Mundo',
    description:
      'Diseño doble: escudo AFA con estrellas y Copa del Mundo FIFA. Para quien quiere la picada más campeona del living. Madera con ranura perimetral, lista para usar o colgar.',
    price: PICADA_PRICE,
    image_url: '/grabado-laser/picadas/seleccion-copa-mundo.jpg',
    image_urls: ['/grabado-laser/picadas/seleccion-copa-mundo.jpg'],
    category: 'grabado-laser',
    material: 'Madera',
    colors: ['Natural'],
    min_order: 1,
    active: true,
    featured: true,
    created_at: '2026-05-16T00:00:00Z',
  },
  {
    id: '33',
    name: 'Tabla Picada Harry Potter',
    description:
      'Harry, Hermione, Ron y Dumbledore en estilo chibi con el logo clásico. Magia en la mesa: ideal para cumpleaños, regalo de Potterhead o noches de maratón. Grabado láser de alto detalle.',
    price: PICADA_PRICE,
    image_url: '/grabado-laser/picadas/harry-potter.jpg',
    image_urls: ['/grabado-laser/picadas/harry-potter.jpg'],
    category: 'grabado-laser',
    material: 'Madera',
    colors: ['Natural'],
    min_order: 1,
    active: true,
    featured: false,
    created_at: '2026-05-16T00:00:00Z',
  },
  {
    id: '34',
    name: 'Tabla Picada Ramones',
    description:
      'Logo RAMONES y los cuatro integrantes en dibujo lineal. Punk, actitud y picada en la misma tabla. Para fans de la banda o de la música que marca generaciones.',
    price: PICADA_PRICE,
    image_url: '/grabado-laser/picadas/ramones.jpg',
    image_urls: ['/grabado-laser/picadas/ramones.jpg'],
    category: 'grabado-laser',
    material: 'Madera',
    colors: ['Natural'],
    min_order: 1,
    active: true,
    featured: false,
    created_at: '2026-05-16T00:00:00Z',
  },
];

const laserEngravingProducts: Product[] = [
  ...picadaBoardProducts,
  {
    id: '27',
    name: 'Grabado Laser en Acrílico',
    description: laserDescription(
      'acrílico',
      'Letras corpóreas, placas, trofeos y piezas decorativas con alto detalle y colores vibrantes.',
    ),
    price: 12000,
    image_url: '/grabado-laser/acrilico.svg',
    image_urls: ['/grabado-laser/acrilico.svg'],
    category: 'grabado-laser',
    material: 'Acrílico',
    colors: ['Transparente', 'Blanco', 'Negro', 'Colores'],
    min_order: 1,
    active: true,
    featured: false,
    created_at: '2026-05-16T00:00:00Z',
  },
  {
    id: '28',
    name: 'Grabado Laser en Cuero y Mate',
    description: laserDescription(
      'cuero, simil cuero o mate',
      'Personalizá mates, billeteras, llaveros y accesorios con iniciales, escudos o diseños únicos.',
    ),
    price: 10500,
    image_url: '/grabado-laser/cuero-mate.svg',
    image_urls: ['/grabado-laser/cuero-mate.svg'],
    category: 'grabado-laser',
    material: 'Cuero / Mate',
    colors: ['Marrón', 'Negro', 'Natural'],
    min_order: 1,
    active: true,
    featured: false,
    created_at: '2026-05-16T00:00:00Z',
  },
  {
    id: '29',
    name: 'Grabado Laser a Medida',
    description:
      '¿Querés otra temática o material? Contanos tu idea — cuadros, cajas, placas, souvenirs o lo que necesites — y te cotizamos el grabado según tamaño, diseño y cantidad.',
    price: 0,
    image_url: '/grabado-laser/personalizado.svg',
    image_urls: ['/grabado-laser/personalizado.svg'],
    category: 'grabado-laser',
    material: 'Consultar',
    colors: ['A elección'],
    min_order: 1,
    active: true,
    featured: false,
    created_at: '2026-05-16T00:00:00Z',
  },
];

export const defaultConfig: SiteConfig = {
  whatsapp_number: '5491112345678',
  store_name: 'MÁS3D',
  store_tagline: 'Impresión 3D Personalizada de Alta Calidad',
  store_email: 'contacto@mas3d.com',
  store_instagram: '@mas3d',
};

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Vaso Milkshake Boca Juniors',
    description: 'Vaso milkshake personalizado con el escudo de Boca Juniors. Material PETG de alta calidad, apto para bebidas frías. Incluye polímero interior de 300ml desmontable.',
    price: 8500,
    image_url: '/boca.jpg',
    image_urls: ['/boca.jpg', '/polimero.jpg'],
    category: 'vasos-milkshake',
    material: 'PETG',
    colors: ['Azul y Amarillo', 'Blanco', 'Negro'],
    min_order: 1,
    active: true,
    featured: true,
    created_at: '2026-05-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Vaso Milkshake River Plate',
    description: 'Vaso milkshake personalizado con el escudo de River Plate. Material PETG, polímero interior 300ml desmontable y apto microondas.',
    price: 8500,
    image_url: '/vaso_river.jpeg',
    image_urls: ['/vaso_river.jpeg', '/polimero.jpg'],
    category: 'vasos-milkshake',
    material: 'PETG',
    colors: ['Rojo y Blanco', 'Blanco', 'Negro'],
    min_order: 1,
    active: true,
    featured: true,
    created_at: '2026-05-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Vaso Milkshake Estudiantes de La Plata',
    description: 'Vaso milkshake con el escudo de Estudiantes de La Plata. PETG premium, polímero 300ml desmontable.',
    price: 8500,
    image_url: '/Vaso_estudiantes.jpeg',
    image_urls: ['/Vaso_estudiantes.jpeg', '/Estudiantes_de_la_plata.jpg', '/polimero.jpg'],
    category: 'vasos-milkshake',
    material: 'PETG',
    colors: ['Rojo y Blanco', 'Blanco', 'Negro'],
    min_order: 1,
    active: true,
    featured: false,
    created_at: '2026-05-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Vaso Milkshake Messi',
    description: 'Vaso milkshake con diseño de Messi. Perfecto para el hincha de Argentina. PETG, polímero 300ml.',
    price: 8500,
    image_url: '/vaso_mesii.jpeg',
    image_urls: ['/vaso_mesii.jpeg', '/messi.jpg', '/polimero.jpg'],
    category: 'vasos-milkshake',
    material: 'PETG',
    colors: ['Celeste y Blanco', 'Blanco', 'Negro'],
    min_order: 1,
    active: true,
    featured: true,
    created_at: '2026-05-01T00:00:00Z',
  },
  ...futbolChopProducts,
  {
    id: '6',
    name: 'All Boys — Figura y Vaso',
    description: 'Combo All Boys: figura del equipo y vaso personalizado con escudo. PLA y PETG de calidad premium.',
    price: 15000,
    image_url: '/allboys.jpg',
    image_urls: ['/allboys.jpg', '/allboys_copy.jpg'],
    category: 'chop-futbol',
    material: 'PLA',
    colors: ['Blanco y Negro', 'Blanco', 'Negro'],
    min_order: 1,
    active: true,
    featured: false,
    created_at: '2026-05-02T00:00:00Z',
  },
  {
    id: '8',
    name: 'Vaso La Konga',
    description: 'Vaso milkshake con diseño de La Konga, la banda de cumbia. Polímero 300ml incluido, desmontable.',
    price: 8500,
    image_url: '/musica/la_konga.jpg',
    image_urls: ['/musica/la_konga.jpg', '/polimero.jpg'],
    category: 'chop-musica',
    material: 'PETG',
    colors: ['Verde', 'Blanco', 'Negro'],
    min_order: 1,
    active: true,
    featured: false,
    created_at: '2026-05-03T00:00:00Z',
  },
  {
    id: '9',
    name: 'Vaso Viejas Locas',
    description: 'Vaso milkshake con diseño de Viejas Locas. Para los fanáticos del rock nacional argentino. Polímero 300ml incluido.',
    price: 8500,
    image_url: '/musica/viejas_locas.jpg',
    image_urls: ['/musica/viejas_locas.jpg', '/musica/viejas_locas_copy.jpg', '/polimero.jpg'],
    category: 'vasos-milkshake',
    material: 'PETG',
    colors: ['Rojo', 'Blanco', 'Negro'],
    min_order: 1,
    active: true,
    featured: false,
    created_at: '2026-05-03T00:00:00Z',
  },
  {
    id: '10',
    name: 'Vaso Ulises Bueno',
    description: 'Vaso milkshake con diseño de Ulises Bueno. Para los fans de la cumbia. Polímero 300ml desmontable.',
    price: 8500,
    image_url: '/musica/ulises.jpg',
    image_urls: ['/musica/ulises.jpg', '/polimero.jpg'],
    category: 'vasos-milkshake',
    material: 'PETG',
    colors: ['Azul', 'Blanco', 'Negro'],
    min_order: 1,
    active: true,
    featured: false,
    created_at: '2026-05-04T00:00:00Z',
  },
  ...musicChopProducts,
  ...laserEngravingProducts,
  {
    id: '11',
    name: 'Figura Stich Personalizada',
    description: 'Figura de Stich impresa en 3D con alta calidad de detalle. Perfecta para regalo o decoración. Personalizá el color a gusto.',
    price: 5000,
    image_url: '/stich.jpeg',
    image_urls: ['/stich.jpeg', '/personalizado/stich.jpg'],
    category: 'varios-personalizados',
    material: 'PLA',
    colors: ['Azul', 'Celeste', 'Blanco', 'Negro'],
    min_order: 1,
    active: false,
    featured: false,
    created_at: '2026-05-04T00:00:00Z',
  },
  {
    id: '12',
    name: 'Figura Chimuelo',
    description: 'Figura de Chimuelo (Cómo entrenar a tu dragón) impresa en 3D con gran nivel de detalle. Ideal como regalo o adorno.',
    price: 5000,
    image_url: '/chimuelo.jpeg',
    image_urls: ['/chimuelo.jpeg'],
    category: 'varios-personalizados',
    material: 'PLA',
    colors: ['Negro', 'Gris', 'Blanco'],
    min_order: 1,
    active: false,
    featured: false,
    created_at: '2026-05-04T00:00:00Z',
  },
  {
    id: '13',
    name: 'Figura Olaf',
    description: 'Figura de Olaf de Frozen en PLA. Detalle prolijo y acabado liso. Perfecta para regalo de cumpleaños.',
    price: 5000,
    image_url: '/olaf.jpeg',
    image_urls: ['/olaf.jpeg'],
    category: 'varios-personalizados',
    material: 'PLA',
    colors: ['Blanco', 'Amarillo', 'Naranja'],
    min_order: 1,
    active: false,
    featured: false,
    created_at: '2026-05-05T00:00:00Z',
  },
  {
    id: '14',
    name: 'Figura Gama Toy Story',
    description: 'Figura de Gama inspirada en Toy Story, impresa en PLA de alta calidad. Ideal para coleccionistas y regalos.',
    price: 5500,
    image_url: '/Gama_toy_story.jpeg',
    image_urls: ['/Gama_toy_story.jpeg'],
    category: 'varios-personalizados',
    material: 'PLA',
    colors: ['Verde', 'Amarillo', 'Blanco'],
    min_order: 1,
    active: false,
    featured: false,
    created_at: '2026-05-05T00:00:00Z',
  },
  {
    id: '15',
    name: 'Figura Capibara',
    description: 'Figura de capibara impresa en 3D, el animal del momento. Adorable y detallada, perfecta para decoración o regalo.',
    price: 4500,
    image_url: '/capibara.jpeg',
    image_urls: ['/capibara.jpeg'],
    category: 'varios-personalizados',
    material: 'PLA',
    colors: ['Marrón', 'Beige', 'Blanco'],
    min_order: 1,
    active: false,
    featured: false,
    created_at: '2026-05-05T00:00:00Z',
  },
];

const PRODUCTS_KEY = 'mas3d_products';
const CONFIG_KEY = 'mas3d_config';
const DELETED_PRODUCTS_KEY = 'mas3d_deleted_products';
const OVERRIDES_KEY = 'mas3d_product_overrides';

const isChop = (p: Product) => /\bchop\b/i.test(p.name);

const LEGACY_REMOVED_IDS = new Set(['7']);

function getDeletedIds(): Set<string> {
  try {
    const raw = localStorage.getItem(DELETED_PRODUCTS_KEY);
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch { /* ignore */ }
  return new Set();
}

function markProductDeleted(id: string): void {
  const deleted = getDeletedIds();
  if (deleted.has(id)) return;
  deleted.add(id);
  localStorage.setItem(DELETED_PRODUCTS_KEY, JSON.stringify([...deleted]));
}

function getOverrides(): Record<string, Partial<Product>> {
  try {
    const raw = localStorage.getItem(OVERRIDES_KEY);
    if (raw) return JSON.parse(raw) as Record<string, Partial<Product>>;
  } catch { /* ignore */ }
  return {};
}

function saveProductOverride(id: string, data: Partial<Product>): void {
  const overrides = getOverrides();
  overrides[id] = { ...overrides[id], ...data };
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
}

function applyChopPricing(products: Product[]): Product[] {
  const overrides = getOverrides();
  return products.map(p => {
    if (!isChop(p)) return p;
    const customPrice = overrides[p.id]?.price;
    if (customPrice != null && customPrice > 0) return { ...p, price: customPrice };
    return { ...p, price: CHOP_PRICE };
  });
}

const seededCatalogIds = new Set(
  [...futbolChopProducts, ...musicChopProducts, ...laserEngravingProducts].map(p => p.id),
);

const MUSIC_CHOP_IDS = new Set(musicChopProducts.map(p => p.id));
const FUTBOL_CHOP_IDS = new Set(futbolChopProducts.map(p => p.id));

const LA_KONGA_ID = '8';

function normalizeCatalogProduct(product: Product): Product {
  if (MUSIC_CHOP_IDS.has(product.id) || product.id === LA_KONGA_ID) {
    return { ...product, category: 'chop-musica' };
  }
  if (FUTBOL_CHOP_IDS.has(product.id)) {
    return { ...product, category: 'chop-futbol' };
  }
  if (product.category === 'varios-personalizados') {
    return { ...product, active: false };
  }
  if (product.category === 'musica') {
    return { ...product, category: 'vasos-milkshake' };
  }
  return product;
}

/** Conserva cambios del Admin al sincronizar productos del catálogo base (chops, picadas, etc.). */
function mergeSeededProduct(seed: Product, stored?: Product): Product {
  const override = getOverrides()[seed.id];
  let merged: Product;

  if (!stored) {
    merged = { ...seed };
  } else {
    merged = {
      ...seed,
      name: stored.name,
      description: stored.description,
      price: stored.price,
      featured: stored.featured,
      active: stored.active,
      category: stored.category,
      colors: stored.colors.length > 0 ? stored.colors : seed.colors,
      image_url: stored.image_url || seed.image_url,
      image_urls: stored.image_urls.length > 0 ? stored.image_urls : seed.image_urls,
      min_order: stored.min_order,
      material: stored.material || seed.material,
    };
  }

  if (!override) return merged;

  return {
    ...merged,
    ...override,
    colors: override.colors?.length ? override.colors : merged.colors,
    image_urls: override.image_urls?.length ? override.image_urls : merged.image_urls,
    image_url: override.image_url || override.image_urls?.[0] || merged.image_url,
  };
}

function mergeWithChopCatalog(products: Product[]): Product[] {
  const deletedIds = getDeletedIds();
  const storedById = new Map(products.map(p => [p.id, p]));
  const rest = products.filter(
    p =>
      !deletedIds.has(p.id) &&
      !seededCatalogIds.has(p.id) &&
      !LEGACY_REMOVED_IDS.has(p.id) &&
      p.category !== 'Chops' &&
      p.category !== 'seleccion',
  );
  const mergeSeed = (seed: Product) =>
    deletedIds.has(seed.id) ? null : mergeSeededProduct(seed, storedById.get(seed.id));

  const mergedSeeds = [
    ...futbolChopProducts.map(mergeSeed),
    ...musicChopProducts.map(mergeSeed),
    ...laserEngravingProducts.map(mergeSeed),
  ].filter((p): p is Product => p !== null);

  return applyChopPricing([...rest, ...mergedSeeds].map(normalizeCatalogProduct));
}

export function getProducts(): Product[] {
  try {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (stored) return mergeWithChopCatalog(JSON.parse(stored) as Product[]);
  } catch { /* ignore */ }
  return mergeWithChopCatalog(initialProducts);
}

export function saveProducts(products: Product[]): void {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function getConfig(): SiteConfig {
  try {
    const stored = localStorage.getItem(CONFIG_KEY);
    if (stored) return { ...defaultConfig, ...(JSON.parse(stored) as Partial<SiteConfig>) };
  } catch { /* ignore */ }
  return defaultConfig;
}

export function saveConfig(config: SiteConfig): void {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

export function addProduct(product: Omit<Product, 'id' | 'created_at'>): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: String(Date.now()),
    created_at: new Date().toISOString(),
  };
  saveProducts([newProduct, ...products]);
  return newProduct;
}

export function updateProduct(id: string, data: Partial<Product>): void {
  if (seededCatalogIds.has(id)) {
    saveProductOverride(id, data);
  }
  const next = getProducts().map(p => (p.id === id ? { ...p, ...data } : p));
  saveProducts(next);
}

export function deleteProduct(id: string): void {
  markProductDeleted(id);
  const overrides = getOverrides();
  if (overrides[id]) {
    delete overrides[id];
    localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
  }
  saveProducts(getProducts().filter(p => p.id !== id));
}
