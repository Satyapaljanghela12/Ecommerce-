/*
  # E-commerce Database Schema

  ## New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, category name)
      - `slug` (text, URL-friendly name)
      - `items_available` (integer, count of items)
      - `created_at` (timestamp)
    
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, product name)
      - `description` (text, product description)
      - `price` (numeric, current price)
      - `original_price` (numeric, original price for discount display)
      - `category_id` (uuid, foreign key to categories)
      - `stock` (integer, available quantity)
      - `image_url` (text, product image)
      - `rating` (numeric, average rating)
      - `review_count` (integer, number of reviews)
      - `is_featured` (boolean, featured product flag)
      - `badge` (text, optional badge like "Sale", "Hot Deal")
      - `created_at` (timestamp)
    
    - `cart_items`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `product_id` (uuid, foreign key to products)
      - `quantity` (integer, item quantity)
      - `created_at` (timestamp)
    
    - `wishlist_items`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `product_id` (uuid, foreign key to products)
      - `created_at` (timestamp)

  ## Security
    - Enable RLS on all tables
    - Add policies for public read access to products and categories
    - Add policies for authenticated users to manage their cart and wishlist
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  items_available integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  price numeric(10,2) NOT NULL,
  original_price numeric(10,2),
  category_id uuid REFERENCES categories(id),
  stock integer DEFAULT 0,
  image_url text DEFAULT '',
  rating numeric(2,1) DEFAULT 0,
  review_count integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  badge text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

CREATE TABLE IF NOT EXISTS wishlist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can view their own cart"
  ON cart_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cart items"
  ON cart_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart items"
  ON cart_items FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart items"
  ON cart_items FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own wishlist"
  ON wishlist_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own wishlist items"
  ON wishlist_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own wishlist items"
  ON wishlist_items FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

INSERT INTO categories (name, slug, items_available) VALUES
  ('Gadget Accessories', 'gadget-accessories', 5),
  ('Kitchen Appliances', 'kitchen-appliances', 0),
  ('Refrigerators', 'refrigerators', 1),
  ('Television', 'television', 2),
  ('Tablets', 'tablets', 0),
  ('Washing Machine', 'washing-machine', 2),
  ('Appliances', 'appliances', 8),
  ('Others', 'others', 3);

INSERT INTO products (name, description, price, original_price, category_id, stock, image_url, rating, review_count, is_featured, badge) VALUES
  ('Apple AirPods 3rd generation', 'Wireless earbuds with spatial audio', 1700.00, 1870.00, (SELECT id FROM categories WHERE slug = 'gadget-accessories'), 9, '', 4.5, 5, true, 'Sale'),
  ('Canon EOS 250D 24.1MP Full HD', 'DSLR Camera with 18-55mm lens', 750.00, 820.00, (SELECT id FROM categories WHERE slug = 'gadget-accessories'), 7, '', 4.0, 5, true, null),
  ('HP Laptop AMD Rypen 9 5500U', 'Powerful laptop for work and gaming', 1050.00, 1289.00, (SELECT id FROM categories WHERE slug = 'gadget-accessories'), 12, '', 4.5, 5, true, null),
  ('Mpow - CH6S On-Ear Headphones', 'Comfortable over-ear headphones', 950.00, 1055.00, (SELECT id FROM categories WHERE slug = 'gadget-accessories'), 5, '', 4.0, 5, false, 'Sale'),
  ('Redmi Note 50A (4/64GB)', 'Affordable smartphone with great features', 699.00, 799.00, (SELECT id FROM categories WHERE slug = 'gadget-accessories'), 3, '', 4.5, 5, false, 'Sale'),
  ('Samsung Galaxy S25 Ultra 5G', 'Premium flagship smartphone', 1699.00, 1899.00, (SELECT id FROM categories WHERE slug = 'gadget-accessories'), 8, '', 5.0, 5, false, null),
  ('Sony WH-CH520 Wireless Headphones', 'Wireless on-ear headphones', 649.00, 749.00, (SELECT id FROM categories WHERE slug = 'gadget-accessories'), 7, '', 4.0, 5, false, null),
  ('Speak 710 Portable Speaker', 'Portable Bluetooth speaker', 95.00, 110.00, (SELECT id FROM categories WHERE slug = 'gadget-accessories'), 15, '', 4.0, 5, false, null),
  ('Wireless Bluetooth Speaker', 'Compact wireless speaker', 220.00, 245.00, (SELECT id FROM categories WHERE slug = 'gadget-accessories'), 10, '', 4.5, 5, false, null),
  ('iPhone 11 Pro Max 128GB', 'Previous generation iPhone', 1299.00, 1499.00, (SELECT id FROM categories WHERE slug = 'gadget-accessories'), 3, '', 4.5, 5, false, null),
  ('Apple Mac Mini M4 Chip', 'Compact desktop computer', 600.00, 660.00, (SELECT id FROM categories WHERE slug = 'gadget-accessories'), 5, '', 5.0, 5, true, 'Sale'),
  ('Bottom Freezer Refrigerator', 'Energy efficient refrigerator', 799.00, null, (SELECT id FROM categories WHERE slug = 'refrigerators'), 4, '', 4.0, 5, true, null),
  ('Canon EOS 250D 24.1MP', 'DSLR Camera bundle', 1299.00, null, (SELECT id FROM categories WHERE slug = 'gadget-accessories'), 6, '', 5.0, 5, true, null);
