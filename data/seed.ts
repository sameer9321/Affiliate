export type Store = {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  website: string;
  logoText: string;
  rating: number;
  couponCount: number;
  featured: boolean;
};

export type Coupon = {
  id: number;
  title: string;
  store: string;
  category: string;
  code: string;
  type: "Code" | "Deal";
  discount: string;
  expiry: string;
  verified: boolean;
  featured: boolean;
  clicks: number;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  deals: number;
};

export type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
};

export const categories: Category[] = [
  { id: 1, name: "Fashion", slug: "fashion", icon: "👕", description: "Clothing, shoes, accessories, streetwear and seasonal fashion discounts.", deals: 126 },
  { id: 2, name: "Home & Garden", slug: "home-garden", icon: "🌲", description: "Garden tools, home improvement, outdoor living and decor savings.", deals: 84 },
  { id: 3, name: "Travel", slug: "travel", icon: "🧳", description: "Flights, hotels, luggage, tours, rentals and booking promo codes.", deals: 62 },
  { id: 4, name: "Health & Beauty", slug: "health-beauty", icon: "💆", description: "Skincare, makeup, wellness, supplements and personal care deals.", deals: 101 },
  { id: 5, name: "Bed & Mattresses", slug: "bed-mattresses", icon: "🛏️", description: "Mattresses, bedding, pillows, bedroom furniture and sleep essentials.", deals: 43 },
  { id: 6, name: "Food and Drinks", slug: "food-and-drinks", icon: "🍔", description: "Food delivery, restaurants, groceries, beverages and meal kit discounts.", deals: 88 },
  { id: 7, name: "Animals and Pets", slug: "animals-and-pets", icon: "🐶", description: "Pet food, toys, grooming, accessories and animal care offers.", deals: 38 },
  { id: 8, name: "Home & Furniture", slug: "home-furniture", icon: "🛋️", description: "Furniture, lighting, storage, home decor and room makeover deals.", deals: 57 },
  { id: 9, name: "Sports & Outdoor", slug: "sports-outdoor", icon: "🏏", description: "Fitness gear, sports equipment, camping, hiking and outdoor deals.", deals: 72 },
  { id: 10, name: "Music & Entertainment", slug: "music-entertainment", icon: "🎧", description: "Streaming, instruments, event tickets, games and entertainment savings.", deals: 45 },
  { id: 11, name: "Books & Crafts", slug: "books-crafts", icon: "📘", description: "Books, art supplies, stationery, DIY kits and creative hobby deals.", deals: 41 },
  { id: 12, name: "Office Supplies", slug: "office-supplies", icon: "📋", description: "Office essentials, printers, desk setup, paper and business supplies.", deals: 36 },
  { id: 13, name: "Tools & Hardware", slug: "tools-hardware", icon: "🛠️", description: "Power tools, hardware, workshop equipment and maintenance offers.", deals: 52 },
  { id: 14, name: "Binance", slug: "binance", icon: "📈", description: "Crypto learning, trading tools, web3 offers and finance-related promos.", deals: 24 },
];

export const stores: Store[] = [
  { id: 1, name: "Amazon", slug: "amazon", description: "Marketplace deals across fashion, electronics, home, books and everyday essentials.", category: "Home & Furniture", website: "https://amazon.com", logoText: "A", rating: 4.8, couponCount: 34, featured: true },
  { id: 2, name: "Nike", slug: "nike", description: "Sportswear, sneakers and outdoor performance gear offers for every season.", category: "Fashion", website: "https://nike.com", logoText: "N", rating: 4.7, couponCount: 19, featured: true },
  { id: 3, name: "Booking.com", slug: "booking", description: "Hotels, apartments, vacation homes and travel booking promotions worldwide.", category: "Travel", website: "https://booking.com", logoText: "B", rating: 4.8, couponCount: 16, featured: true },
  { id: 4, name: "Sephora", slug: "sephora", description: "Beauty, skincare, fragrance and personal care discounts from premium brands.", category: "Health & Beauty", website: "https://sephora.com", logoText: "S", rating: 4.7, couponCount: 14, featured: true },
  { id: 5, name: "IKEA", slug: "ikea", description: "Furniture, storage, decor and smart home solutions with seasonal savings.", category: "Home & Furniture", website: "https://ikea.com", logoText: "I", rating: 4.4, couponCount: 11, featured: false },
  { id: 6, name: "Chewy", slug: "chewy", description: "Pet food, toys, health products and accessories for dogs, cats and more.", category: "Animals and Pets", website: "https://chewy.com", logoText: "C", rating: 4.6, couponCount: 13, featured: false },
  { id: 7, name: "Home Depot", slug: "home-depot", description: "Tools, hardware, garden essentials and home improvement promotions.", category: "Tools & Hardware", website: "https://homedepot.com", logoText: "HD", rating: 4.5, couponCount: 21, featured: true },
  { id: 8, name: "Binance", slug: "binance", description: "Crypto education, trading promos and finance related online offers.", category: "Binance", website: "https://binance.com", logoText: "BN", rating: 4.3, couponCount: 9, featured: false },
  { id: 9, name: "Wayfair", slug: "wayfair", description: "Home furniture, mattresses, bedding, decor and room upgrade deals.", category: "Bed & Mattresses", website: "https://wayfair.com", logoText: "W", rating: 4.4, couponCount: 18, featured: false },
  { id: 10, name: "Uber Eats", slug: "uber-eats", description: "Food delivery discounts, restaurant promos and limited-time meal offers.", category: "Food and Drinks", website: "https://ubereats.com", logoText: "UE", rating: 4.5, couponCount: 22, featured: true },
  { id: 11, name: "Spotify", slug: "spotify", description: "Music streaming plans, entertainment bundles and student offers.", category: "Music & Entertainment", website: "https://spotify.com", logoText: "SP", rating: 4.8, couponCount: 8, featured: false },
  { id: 12, name: "Staples", slug: "staples", description: "Office supplies, tech accessories, printers, paper and business essentials.", category: "Office Supplies", website: "https://staples.com", logoText: "ST", rating: 4.4, couponCount: 12, featured: false },
];

export const coupons: Coupon[] = [
  { id: 1, title: "Up to 40% Off Selected Fashion Picks", store: "Nike", category: "Fashion", code: "TRENDZ40", type: "Code", discount: "40% OFF", expiry: "31 Dec 2026", verified: true, featured: true, clicks: 421 },
  { id: 2, title: "Free Shipping on Home Essentials", store: "Amazon", category: "Home & Furniture", code: "FREESHIP", type: "Code", discount: "Free Shipping", expiry: "20 Dec 2026", verified: true, featured: true, clicks: 582 },
  { id: 3, title: "Save on Hotel Stays Worldwide", store: "Booking.com", category: "Travel", code: "STAY25", type: "Code", discount: "25% OFF", expiry: "30 Sep 2026", verified: true, featured: true, clicks: 498 },
  { id: 4, title: "Beauty Bundle Sale", store: "Sephora", category: "Health & Beauty", code: "GLOW20", type: "Code", discount: "20% OFF", expiry: "22 Aug 2026", verified: true, featured: false, clicks: 192 },
  { id: 5, title: "Home Decor Seasonal Sale", store: "IKEA", category: "Home & Furniture", code: "No Code Needed", type: "Deal", discount: "35% OFF", expiry: "05 Nov 2026", verified: false, featured: false, clicks: 155 },
  { id: 6, title: "Pet Food Auto-Ship Discount", store: "Chewy", category: "Animals and Pets", code: "PET15", type: "Code", discount: "15% OFF", expiry: "12 Oct 2026", verified: true, featured: false, clicks: 208 },
  { id: 7, title: "Power Tools Weekend Deal", store: "Home Depot", category: "Tools & Hardware", code: "TOOLS30", type: "Code", discount: "30% OFF", expiry: "31 Dec 2026", verified: true, featured: true, clicks: 715 },
  { id: 8, title: "Food Delivery Limited Offer", store: "Uber Eats", category: "Food and Drinks", code: "EATS10", type: "Code", discount: "10% OFF", expiry: "05 Nov 2026", verified: true, featured: true, clicks: 355 },
  { id: 9, title: "Mattress and Bedding Sale", store: "Wayfair", category: "Bed & Mattresses", code: "SLEEP20", type: "Code", discount: "20% OFF", expiry: "28 Dec 2026", verified: true, featured: false, clicks: 244 },
  { id: 10, title: "Music Premium Trial Offer", store: "Spotify", category: "Music & Entertainment", code: "No Code Needed", type: "Deal", discount: "Trial Offer", expiry: "15 Dec 2026", verified: true, featured: false, clicks: 188 },
  { id: 11, title: "Office Essentials Bulk Savings", store: "Staples", category: "Office Supplies", code: "OFFICE12", type: "Code", discount: "12% OFF", expiry: "10 Dec 2026", verified: true, featured: false, clicks: 173 },
  { id: 12, title: "Crypto Trading Fee Promotion", store: "Binance", category: "Binance", code: "TRENDZBN", type: "Code", discount: "Special Offer", expiry: "31 Dec 2026", verified: true, featured: false, clicks: 310 },
];

export const blogs: Blog[] = [
  { id: 1, title: "How Saving Trendz Helps You Find Working Coupons", slug: "how-saving-trendz-works", excerpt: "Learn how we organize categories, compare stores and highlight reliable discount codes for smarter shopping.", date: "15 May 2026", category: "Saving Tips", readTime: "5 min read" },
  { id: 2, title: "Best Ways to Use Affiliate Deal Websites Safely", slug: "affiliate-deal-safety", excerpt: "A practical guide to using coupon websites, checking expiry dates and avoiding fake discount promises.", date: "10 May 2026", category: "Shopping Guide", readTime: "4 min read" },
  { id: 3, title: "Coupon Codes vs Direct Deals: Which Saves More?", slug: "coupon-codes-vs-direct-deals", excerpt: "Understand when a visible promo code is better and when a direct affiliate deal gives more value.", date: "05 May 2026", category: "Coupon Basics", readTime: "6 min read" },
];
