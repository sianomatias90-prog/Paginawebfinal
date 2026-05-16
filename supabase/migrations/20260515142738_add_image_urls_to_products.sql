/*
  # Add image_urls array column to products

  1. Changes
    - Add `image_urls` column (text[]) to products, defaulting to empty array
    - Backfill existing rows so image_urls contains their current image_url
  2. Notes
    - Keeps image_url column intact for backwards compatibility
    - Multiple product images will be stored in image_urls
*/

ALTER TABLE products ADD COLUMN IF NOT EXISTS image_urls text[] DEFAULT '{}';

-- Backfill: copy existing image_url into image_urls array for all rows
UPDATE products SET image_urls = ARRAY[image_url] WHERE image_url IS NOT NULL AND (image_urls IS NULL OR image_urls = '{}');
