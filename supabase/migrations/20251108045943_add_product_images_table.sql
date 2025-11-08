/*
  # Add Product Images Table

  ## New Tables
    - `product_images`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key to products)
      - `image_url` (text, image URL)
      - `alt_text` (text, alt text for accessibility)
      - `display_order` (integer, order of images in slideshow)
      - `created_at` (timestamp)
  
  ## Security
    - Enable RLS on product_images table
    - Add policy for public read access to product images
  
  ## Purpose
    - Stores multiple images per product for slideshow display
    - Allows products to have galleries instead of single images
    - Maintains order for proper slideshow presentation
*/

CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  image_url text NOT NULL,
  alt_text text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Product images are viewable by everyone"
  ON product_images FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO product_images (product_id, image_url, alt_text, display_order) VALUES
  ((SELECT id FROM products WHERE name = 'Apple AirPods 3rd generation'), 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=400', 'AirPods White', 0),
  ((SELECT id FROM products WHERE name = 'Apple AirPods 3rd generation'), 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=400', 'AirPods Close Up', 1),
  ((SELECT id FROM products WHERE name = 'Canon EOS 250D 24.1MP Full HD'), 'https://images.pexels.com/photos/606935/pexels-photo-606935.jpeg?auto=compress&cs=tinysrgb&w=400', 'Canon Camera', 0),
  ((SELECT id FROM products WHERE name = 'Canon EOS 250D 24.1MP Full HD'), 'https://images.pexels.com/photos/612198/pexels-photo-612198.jpeg?auto=compress&cs=tinysrgb&w=400', 'Camera Detail', 1),
  ((SELECT id FROM products WHERE name = 'HP Laptop AMD Rypen 9 5500U'), 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400', 'HP Laptop', 0),
  ((SELECT id FROM products WHERE name = 'HP Laptop AMD Rypen 9 5500U'), 'https://images.pexels.com/photos/7014436/pexels-photo-7014436.jpeg?auto=compress&cs=tinysrgb&w=400', 'Laptop Keyboard', 1),
  ((SELECT id FROM products WHERE name = 'Mpow - CH6S On-Ear Headphones'), 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400', 'Headphones', 0),
  ((SELECT id FROM products WHERE name = 'Mpow - CH6S On-Ear Headphones'), 'https://images.pexels.com/photos/3466782/pexels-photo-3466782.jpeg?auto=compress&cs=tinysrgb&w=400', 'Headphones Side', 1),
  ((SELECT id FROM products WHERE name = 'Redmi Note 50A (4/64GB)'), 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400', 'Smartphone', 0),
  ((SELECT id FROM products WHERE name = 'Redmi Note 50A (4/64GB)'), 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400', 'Smartphone Back', 1),
  ((SELECT id FROM products WHERE name = 'Samsung Galaxy S25 Ultra 5G'), 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400', 'Samsung Phone', 0),
  ((SELECT id FROM products WHERE name = 'Samsung Galaxy S25 Ultra 5G'), 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400', 'Samsung Phone Front', 1),
  ((SELECT id FROM products WHERE name = 'Sony WH-CH520 Wireless Headphones'), 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400', 'Sony Headphones', 0),
  ((SELECT id FROM products WHERE name = 'Sony WH-CH520 Wireless Headphones'), 'https://images.pexels.com/photos/3394649/pexels-photo-3394649.jpeg?auto=compress&cs=tinysrgb&w=400', 'Sony Headphones Detail', 1),
  ((SELECT id FROM products WHERE name = 'Speak 710 Portable Speaker'), 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=400', 'Portable Speaker', 0),
  ((SELECT id FROM products WHERE name = 'Wireless Bluetooth Speaker'), 'https://images.pexels.com/photos/3394645/pexels-photo-3394645.jpeg?auto=compress&cs=tinysrgb&w=400', 'Bluetooth Speaker', 0),
  ((SELECT id FROM products WHERE name = 'iPhone 11 Pro Max 128GB'), 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400', 'iPhone Pro Max', 0),
  ((SELECT id FROM products WHERE name = 'iPhone 11 Pro Max 128GB'), 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400', 'iPhone Pro Max Side', 1),
  ((SELECT id FROM products WHERE name = 'Apple Mac Mini M4 Chip'), 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400', 'Mac Mini', 0),
  ((SELECT id FROM products WHERE name = 'Bottom Freezer Refrigerator'), 'https://images.pexels.com/photos/2224577/pexels-photo-2224577.jpeg?auto=compress&cs=tinysrgb&w=400', 'Refrigerator', 0),
  ((SELECT id FROM products WHERE name = 'Bottom Freezer Refrigerator'), 'https://images.pexels.com/photos/2224581/pexels-photo-2224581.jpeg?auto=compress&cs=tinysrgb&w=400', 'Refrigerator Interior', 1),
  ((SELECT id FROM products WHERE name = 'Canon EOS 250D 24.1MP'), 'https://images.pexels.com/photos/606935/pexels-photo-606935.jpeg?auto=compress&cs=tinysrgb&w=400', 'Canon Bundle', 0),
  ((SELECT id FROM products WHERE name = 'Canon EOS 250D 24.1MP'), 'https://images.pexels.com/photos/612198/pexels-photo-612198.jpeg?auto=compress&cs=tinysrgb&w=400', 'Canon Bundle Lens', 1);
