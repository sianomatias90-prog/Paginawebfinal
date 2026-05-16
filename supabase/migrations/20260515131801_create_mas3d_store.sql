/*
  # MÁS3D Online Store Schema

  ## Overview
  Complete schema for the MÁS3D 3D printing online store.

  ## New Tables

  ### products
  - `id` (uuid, PK) - Unique product identifier
  - `name` (text) - Product display name
  - `description` (text) - Full product description
  - `price` (decimal) - Price in ARS
  - `image_url` (text) - Main product image URL
  - `category` (text) - Product category (Figuras, Hogar, Accesorios, Industrial)
  - `material` (text) - Printing material (PLA, PETG, ABS, etc.)
  - `colors` (text[]) - Available colors array
  - `min_order` (integer) - Minimum order quantity
  - `active` (boolean) - Whether product is visible in catalog
  - `featured` (boolean) - Whether product appears on home page
  - `created_at` (timestamptz) - Creation timestamp

  ### site_config
  - `key` (text, PK) - Configuration key
  - `value` (text) - Configuration value
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - RLS enabled on all tables
  - Anonymous users can read active products and public config
  - Authenticated users (admins) have full CRUD access

  ## Seed Data
  - Default site configuration (WhatsApp, store name)
  - 6 sample 3D printed products across multiple categories
*/

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  price decimal(10,2) NOT NULL DEFAULT 0,
  image_url text DEFAULT '',
  category text DEFAULT 'General',
  material text DEFAULT 'PLA',
  colors text[] DEFAULT ARRAY[]::text[],
  min_order integer DEFAULT 1,
  active boolean DEFAULT true,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active products"
  ON products FOR SELECT
  TO anon
  USING (active = true);

CREATE POLICY "Authenticated can read all products"
  ON products FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Site configuration table
CREATE TABLE IF NOT EXISTS site_config (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site config"
  ON site_config FOR SELECT
  TO anon
  USING (key IS NOT NULL);

CREATE POLICY "Authenticated can read site config"
  ON site_config FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated can insert site config"
  ON site_config FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated can update site config"
  ON site_config FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Default site configuration
INSERT INTO site_config (key, value) VALUES
  ('whatsapp_number', '5491112345678'),
  ('store_name', 'MÁS3D'),
  ('store_tagline', 'Impresión 3D Personalizada de Alta Calidad'),
  ('store_email', 'contacto@mas3d.com'),
  ('store_instagram', '@mas3d')
ON CONFLICT (key) DO NOTHING;

-- Sample products
INSERT INTO products (name, description, price, image_url, category, material, colors, min_order, active, featured) VALUES
  (
    'Figura Personalizada',
    'Dale vida a tu personaje favorito con nuestra impresión 3D de alta resolución. Envianos tu diseño y lo hacemos realidad con acabado profesional y detalles precisos. Ideal para coleccionistas, regalos únicos y decoración.',
    2500,
    'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Figuras',
    'PLA',
    ARRAY['Blanco', 'Negro', 'Gris', 'Rojo', 'Azul'],
    1, true, true
  ),
  (
    'Joyero Geométrico',
    'Elegante joyero con diseño geométrico moderno, impreso en 3D con acabado liso. Perfecto para organizar anillos, aretes y collares. Disponible en varios colores para combinar con tu decoración.',
    1800,
    'https://images.pexels.com/photos/5825578/pexels-photo-5825578.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Hogar',
    'PLA',
    ARRAY['Blanco', 'Negro', 'Dorado', 'Rosa'],
    1, true, true
  ),
  (
    'Maceta Moderna',
    'Maceta de diseño exclusivo con patrón texturizado, ideal para suculentas y plantas pequeñas. Material PETG resistente a la humedad. Cada pieza es única y puede personalizarse con tu nombre.',
    1200,
    'https://images.pexels.com/photos/4505166/pexels-photo-4505166.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Hogar',
    'PETG',
    ARRAY['Blanco', 'Terracota', 'Verde Menta', 'Negro'],
    1, true, false
  ),
  (
    'Soporte para Celular',
    'Soporte ergonómico de escritorio para celular con ángulo ajustable. Diseño minimalista compatible con todos los modelos. Puede personalizarse con tu nombre, logo o mensaje grabado.',
    800,
    'https://images.pexels.com/photos/4526408/pexels-photo-4526408.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Accesorios',
    'PLA',
    ARRAY['Negro', 'Blanco', 'Azul', 'Gris'],
    2, true, false
  ),
  (
    'Llavero Personalizado',
    'Llavero con tu nombre, iniciales, logo o diseño favorito. Gran opción para regalos empresariales y personales. Alta durabilidad y acabado profesional. Mínimo 5 unidades para personalización de texto.',
    350,
    'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Accesorios',
    'PLA',
    ARRAY['Blanco', 'Negro', 'Rojo', 'Azul', 'Amarillo', 'Verde'],
    5, true, false
  ),
  (
    'Pieza Industrial a Medida',
    'Fabricación de piezas técnicas e industriales con tolerancias precisas. Envianos tus planos o archivos CAD y producimos tu pieza en el material que necesités. Ideal para prototipos y repuestos.',
    3500,
    'https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Industrial',
    'ABS',
    ARRAY['Negro', 'Gris', 'Natural'],
    1, true, true
  )
ON CONFLICT DO NOTHING;
