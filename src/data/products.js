export const CATEGORIES = [
  { id: 'all', name: 'All Collections', count: 18 },
  { id: 'streetwear-sets', name: 'Streetwear Duo Sets', count: 4 },
  { id: 'drop-shoulder', name: 'Drop Shoulder Tees', count: 5 },
  { id: 'trousers', name: 'Baggy Trousers & Pants', count: 4 },
  { id: 'shirts', name: 'Premium Shirts', count: 3 },
  { id: 'coord-sets', name: 'Co-ord Sets', count: 4 },
  { id: 'jeans', name: 'Denim & Cargo', count: 2 },
];

export const PRODUCTS = [
  {
    id: 'cd-01',
    name: 'Classy Drip Signature Oversized Streetwear Duo Set (Green & Cream)',
    slug: 'signature-streetwear-duo-green-cream',
    category: 'streetwear-sets',
    gender: 'Unisex',
    price: 1690,
    originalPrice: 1990,
    discount: '15% OFF',
    rating: 4.9,
    reviewsCount: 38,
    isNew: true,
    isHot: true,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    fabric: '260 GSM Heavyweight Organic French Terry & Twill Cotton',
    fit: 'Signature Oversized Streetwear Fit',
    images: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Forest Green & Cream', code: '#2D4A3E', class: 'bg-[#2D4A3E]' },
      { name: 'Pitch Black & Ash', code: '#1a1a1a', class: 'bg-[#1a1a1a]' }
    ],
    description: 'Elevate your daily street rotation with the Classy Drip Signature Duo Set. Features an ultra-soft drop shoulder heavyweight tee paired with relaxed street-cut sweat-trousers. Embossed with our signature CD crown monogram.'
  },
  {
    id: 'cd-02',
    name: 'Monogram CD Heavyweight Drop Shoulder Tee (Vintage Ash)',
    slug: 'monogram-heavyweight-drop-shoulder-ash',
    category: 'drop-shoulder',
    gender: 'Men',
    price: 990,
    originalPrice: 1250,
    discount: '21% OFF',
    rating: 4.8,
    reviewsCount: 52,
    isNew: true,
    isHot: true,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    fabric: '240 GSM Combed Compact 100% Cotton, Bio-washed',
    fit: 'Drop Shoulder Boxy Fit',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Vintage Ash', code: '#7b7d7d', class: 'bg-[#7b7d7d]' },
      { name: 'Pure White', code: '#f5f5f5', class: 'bg-[#f5f5f5]' },
      { name: 'Obsidian Black', code: '#111111', class: 'bg-[#111111]' }
    ],
    description: 'A street staple engineered for ultimate structure and drape. Features Classy Drip front chest typography and high-density back print with "DEFINED BY CLASS. DRIVEN BY STYLE." tagline.'
  },
  {
    id: 'cd-03',
    name: 'Baggy Loose Street Trouser Pants (Charcoal Black)',
    slug: 'baggy-loose-street-trouser-black',
    category: 'trousers',
    gender: 'Unisex',
    price: 1190,
    originalPrice: 1450,
    discount: '18% OFF',
    rating: 4.9,
    reviewsCount: 44,
    isNew: false,
    isHot: true,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    fabric: 'Premium Stretch Twill Cotton, Pre-shrunk',
    fit: 'Wide-Leg Baggy Streetwear Silhouette',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Charcoal Black', code: '#1c1c1e', class: 'bg-[#1c1c1e]' },
      { name: 'Deep Navy', code: '#1e293b', class: 'bg-[#1e293b]' },
      { name: 'Beige Khaki', code: '#d7c4a3', class: 'bg-[#d7c4a3]' }
    ],
    description: 'Designed for effortless stacking over your favorite sneakers. High-grade twill fabric with elasticized waistband, deep tactical pockets, and custom Classy Drip metal drawcord aglets.'
  },
  {
    id: 'cd-04',
    name: 'Bella Charm Co-ord 3-Piece Set (Pastel Pink & Cream)',
    slug: 'bella-charm-coord-set-pastel-pink',
    category: 'coord-sets',
    gender: 'Women',
    price: 1950,
    originalPrice: 2250,
    discount: '13% OFF',
    rating: 5.0,
    reviewsCount: 29,
    isNew: true,
    isHot: true,
    isBestSeller: false,
    isFeatured: true,
    inStock: true,
    fabric: 'Ultra-soft Ribbed Cotton Blend + Inner Camisole',
    fit: 'Tailored Chic Relaxed Fit',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Free Size (Fits S to XL)'],
    colors: [
      { name: 'Pastel Pink & Cream', code: '#f4c2c2', class: 'bg-[#f4c2c2]' },
      { name: 'Sky Blue & White', code: '#b0c4de', class: 'bg-[#b0c4de]' }
    ],
    description: 'Complete 3-piece aesthetic set including stylish buttoned top, tailored wide flare pant, and matching inner camisole. Perfect for brunches, university wear, and evening strolls.'
  },
  {
    id: 'cd-05',
    name: 'Premium Oxford Textured Casual Shirt (Sky Blue Striped)',
    slug: 'premium-oxford-casual-shirt-sky-blue',
    category: 'shirts',
    gender: 'Men',
    price: 1150,
    originalPrice: 1550,
    discount: '26% OFF',
    rating: 4.7,
    reviewsCount: 31,
    isNew: false,
    isHot: false,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    fabric: '100% Breathable Egyptian Cotton Oxford Weave',
    fit: 'Modern Smart Casual Fit',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M (Chest 40)', 'L (Chest 42)', 'XL (Chest 44)'],
    colors: [
      { name: 'Sky Blue Striped', code: '#87ceeb', class: 'bg-[#87ceeb]' },
      { name: 'Crisp White', code: '#ffffff', class: 'bg-[#ffffff]' }
    ],
    description: 'A versatile luxury shirt crafted from high-thread-count cotton. Finished with mother-of-pearl buttons and subtle embroidered Classy Drip logo at the cuff.'
  },
  {
    id: 'cd-06',
    name: 'Mocha Cream Minimalist Co-ord Set (Top + Wide Pant + Inner)',
    slug: 'mocha-cream-minimalist-coord-set',
    category: 'coord-sets',
    gender: 'Women',
    price: 2250,
    originalPrice: 2450,
    discount: '8% OFF',
    rating: 4.9,
    reviewsCount: 22,
    isNew: true,
    isHot: true,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    fabric: 'Korean Linen Blend & Breathable Inner',
    fit: 'Flowy Aesthetic Silhouette',
    images: [
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Free Size (Chest 36-44)'],
    colors: [
      { name: 'Mocha Cream', code: '#c4a482', class: 'bg-[#c4a482]' },
      { name: 'Espresso Brown', code: '#4b3621', class: 'bg-[#4b3621]' }
    ],
    description: 'Elegance redefined. The Mocha Cream 3-piece combo is tailored for effortless comfort, featuring structured sleeves, comfortable elastic pants, and silky skin-friendly inner.'
  },
  {
    id: 'cd-07',
    name: 'Dropped Sleeves Black Rose Tracksuit Set (Oversized Duo)',
    slug: 'dropped-sleeves-black-rose-tracksuit',
    category: 'streetwear-sets',
    gender: 'Men',
    price: 1390,
    originalPrice: 1750,
    discount: '20% OFF',
    rating: 4.9,
    reviewsCount: 67,
    isNew: false,
    isHot: true,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    fabric: '280 GSM Poly-Cotton Interlock Fleece',
    fit: 'Oversized Street Drip',
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Midnight Black', code: '#0f0f10', class: 'bg-[#0f0f10]' },
      { name: 'Heather Grey', code: '#9e9e9e', class: 'bg-[#9e9e9e]' }
    ],
    description: 'Black Rose graphics printed with durable German plastisol inks that never fade or crack. Includes drop shoulder oversized tee and matching tapered baggy sweatpants.'
  },
  {
    id: 'cd-08',
    name: 'Baggy Loose Street Trousers (Olive Military Green)',
    slug: 'baggy-loose-street-trousers-olive',
    category: 'trousers',
    gender: 'Unisex',
    price: 1090,
    originalPrice: 1350,
    discount: '19% OFF',
    rating: 4.8,
    reviewsCount: 35,
    isNew: false,
    isHot: false,
    isBestSeller: true,
    isFeatured: false,
    inStock: true,
    fabric: 'Heavy Duty 100% Cotton Drill Twill',
    fit: 'Relaxed Wide Straight Leg',
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Olive Green', code: '#556b2f', class: 'bg-[#556b2f]' },
      { name: 'Beige Khaki', code: '#c3b091', class: 'bg-[#c3b091]' }
    ],
    description: 'Heavy duty tactical-inspired street trousers. Featuring 6 utility pockets, reinforced knee stitching, and an adjustable cuff cinch for customized sneaker stacking.'
  },
  {
    id: 'cd-09',
    name: 'Classy Drip "Defined By Class" Acid-Washed Tee',
    slug: 'defined-by-class-acid-washed-tee',
    category: 'drop-shoulder',
    gender: 'Men',
    price: 890,
    originalPrice: 1190,
    discount: '25% OFF',
    rating: 4.9,
    reviewsCount: 41,
    isNew: true,
    isHot: true,
    isBestSeller: false,
    isFeatured: true,
    inStock: true,
    fabric: '220 GSM Single Jersey Acid-Washed Vintage Cotton',
    fit: 'Relaxed Boxy Streetwear',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Washed Charcoal', code: '#36454f', class: 'bg-[#36454f]' },
      { name: 'Washed Brown', code: '#5c4033', class: 'bg-[#5c4033]' }
    ],
    description: 'Handcrafted acid wash finish giving every single piece an authentic, one-of-a-kind vintage texture. Features ribbed collar that retains its shape wash after wash.'
  },
  {
    id: 'cd-10',
    name: 'Smart Men Henley Collar Short Sleeve Shirt (Olive Moss)',
    slug: 'smart-men-henley-short-sleeve-olive',
    category: 'shirts',
    gender: 'Men',
    price: 990,
    originalPrice: 1250,
    discount: '21% OFF',
    rating: 4.6,
    reviewsCount: 19,
    isNew: false,
    isHot: false,
    isBestSeller: false,
    isFeatured: false,
    inStock: true,
    fabric: 'Breathable Slub Cotton Weave',
    fit: 'Tailored Henley Fit',
    images: [
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Olive Moss', code: '#4b5320', class: 'bg-[#4b5320]' },
      { name: 'Sandy Beige', code: '#e2d4b7', class: 'bg-[#e2d4b7]' },
      { name: 'Navy', code: '#000080', class: 'bg-[#000080]' }
    ],
    description: 'Clean Mandarin / Henley button collar that transitions seamlessly from casual hangout to semi-formal dinners. Light, airy, and moisture-wicking.'
  },
  {
    id: 'cd-11',
    name: 'Pink Marshmallow Two-Piece Co-ord (Top + Wide Pant)',
    slug: 'pink-marshmallow-two-piece-coord',
    category: 'coord-sets',
    gender: 'Women',
    price: 2150,
    originalPrice: 2350,
    discount: '9% OFF',
    rating: 4.9,
    reviewsCount: 26,
    isNew: true,
    isHot: false,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    fabric: 'Premium Georgette with Butter-soft Lining',
    fit: 'Comfortable Oversized Relaxed',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Free Size (34-42)'],
    colors: [
      { name: 'Marshmallow Pink', code: '#ffc0cb', class: 'bg-[#ffc0cb]' },
      { name: 'Baby Blue', code: '#89cff0', class: 'bg-[#89cff0]' }
    ],
    description: 'Soft pastel hues with premium draped fabric that does not crease. Perfect summer combo for trendy Bangladeshi fashion lovers.'
  },
  {
    id: 'cd-12',
    name: 'Classy Drip Heavyweight French Terry Hoodie (Deep Onyx)',
    slug: 'heavyweight-french-terry-hoodie-onyx',
    category: 'drop-shoulder',
    gender: 'Unisex',
    price: 1590,
    originalPrice: 1990,
    discount: '20% OFF',
    rating: 5.0,
    reviewsCount: 47,
    isNew: true,
    isHot: true,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    fabric: '360 GSM Double-Faced Cotton French Terry',
    fit: 'Boxy Drop Shoulder Streetwear Fit',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Deep Onyx', code: '#121214', class: 'bg-[#121214]' },
      { name: 'Oatmeal Melange', code: '#d9d2c9', class: 'bg-[#d9d2c9]' }
    ],
    description: 'Heavyweight thermal warmth without the bulk. Double-layered hood, seamless kangaroo pocket, and gold embroidered CD crest on the left wrist.'
  }
];
