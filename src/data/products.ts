import type { Product, CategoryOption } from '../types';

export const categories: CategoryOption[] = [
  { id: 'all', label: 'Tous les Produits', labelAr: 'جميع المنتجات', icon: '✨' },
  { id: 'women', label: 'Femmes', labelAr: 'نساء', icon: '👗' },
  { id: 'men', label: 'Hommes', labelAr: 'رجال', icon: '👔' },
  { id: 'beauty', label: 'Beauté', labelAr: 'جمال', icon: '💄' },
  { id: 'baby', label: 'Bébé', labelAr: 'أطفال', icon: '🍼' },
  { id: 'accessories', label: 'Accessoires', labelAr: 'إكسسوارات', icon: '💎' },
  { id: 'offers', label: 'Offres', labelAr: 'عروض', icon: '🔥' },
];

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Palette de Maquillage Premium',
    nameAr: 'باليت مكياج فاخرة',
    category: 'beauty',
    price: 249,
    image: '/Produit 1.png',
    description: 'Palette de fards à paupières avec 18 teintes nude et rosées.',
    descriptionAr: 'باليت ظلال عيون مع 18 لون وردي وطبيعي.',
    availability: true,
    volume: 2,
  },
  {
    id: 'prod-002',
    name: 'Montre Élégante Dorée',
    nameAr: 'ساعة أنيقة ذهبية',
    category: 'women',
    price: 450,
    image: '/Produit 3.png',
    description: 'Montre femme dorée avec bracelet en acier inoxydable.',
    descriptionAr: 'ساعة نسائية ذهبية مع سوار من الفولاذ المقاوم للصدأ.',
    availability: true,
    volume: 2,
  },
  {
    id: 'prod-003',
    name: 'Parfum Floral Luxe',
    nameAr: 'عطر زهور فاخر',
    category: 'beauty',
    price: 389,
    image: '/Produit 4.png',
    description: 'Eau de parfum 100ml aux notes de rose et jasmin.',
    descriptionAr: 'ماء عطر 100 مل بنوتات الورد والياسمين.',
    availability: true,
    volume: 3,
  },
  {
    id: 'prod-004',
    name: 'Sac à Main Chic',
    nameAr: 'حقيبة يد أنيقة',
    category: 'women',
    price: 599,
    image: '/Produit 5.png',
    description: 'Sac à main en cuir synthétique premium, couleur nude.',
    descriptionAr: 'حقيبة يد من الجلد الاصطناعي الفاخر، لون بيج.',
    availability: true,
    volume: 4,
  },
  {
    id: 'prod-005',
    name: 'Portefeuille Homme Cuir',
    nameAr: 'محفظة رجالية جلدية',
    category: 'men',
    price: 199,
    image: '/Produit 6.png',
    description: 'Portefeuille slim en cuir véritable avec RFID protection.',
    descriptionAr: 'محفظة رفيعة من الجلد الطبيعي مع حماية RFID.',
    availability: true,
    volume: 1,
  },
  {
    id: 'prod-006',
    name: 'Set de Soins Visage',
    nameAr: 'مجموعة عناية بالوجه',
    category: 'beauty',
    price: 349,
    image: '/Produit 7.png',
    description: 'Kit complet: nettoyant, sérum, crème hydratante.',
    descriptionAr: 'مجموعة كاملة: منظف، سيروم، كريم مرطب.',
    availability: true,
    volume: 3,
  },
  {
    id: 'prod-007',
    name: 'Pyjama Bébé Coton Bio',
    nameAr: 'بيجاما طفل قطن عضوي',
    category: 'baby',
    price: 149,
    image: '/Produit 8.png',
    description: 'Pyjama doux en coton bio pour bébé 0-12 mois.',
    descriptionAr: 'بيجاما ناعمة من القطن العضوي للأطفال 0-12 شهر.',
    availability: true,
    volume: 2,
  },
  {
    id: 'prod-008',
    name: 'Lunettes de Soleil Aviator',
    nameAr: 'نظارات شمسية أفياتور',
    category: 'men',
    price: 279,
    image: '/Produit 9.png',
    description: 'Lunettes aviator avec verres polarisés et monture dorée.',
    descriptionAr: 'نظارات أفياتور مع عدسات مستقطبة وإطار ذهبي.',
    availability: true,
    volume: 1,
  },
  {
    id: 'prod-009',
    name: 'Bracelet Perles Naturelles',
    nameAr: 'سوار لؤلؤ طبيعي',
    category: 'accessories',
    price: 189,
    image: '/Produit 10.png',
    description: 'Bracelet artisanal avec perles d\'eau douce.',
    descriptionAr: 'سوار يدوي مع لؤلؤ المياه العذبة.',
    availability: true,
    volume: 1,
  },
  {
    id: 'prod-010',
    name: 'Coffret Bain Relaxant',
    nameAr: 'مجموعة حمام استرخاء',
    category: 'beauty',
    price: 299,
    image: '/Produit 11.png',
    description: 'Bombes de bain, huile essentielle et bougie parfumée.',
    descriptionAr: 'كرات حمام، زيت عطري وشمعة معطرة.',
    availability: true,
    volume: 3,
  },
  {
    id: 'prod-011',
    name: 'Ensemble Cadeau Naissance',
    nameAr: 'مجموعة هدية مولود',
    category: 'baby',
    price: 329,
    image: '/Produit 12.png',
    description: 'Body, bavoir, chaussons et doudou en coffret.',
    descriptionAr: 'بودي، مريلة، حذاء وبطانية في علبة.',
    availability: true,
    volume: 4,
  },
  {
    id: 'prod-012',
    name: 'Ceinture Cuir Premium',
    nameAr: 'حزام جلد فاخر',
    category: 'men',
    price: 169,
    image: '/Produit 13.png',
    description: 'Ceinture en cuir italien avec boucle argentée.',
    descriptionAr: 'حزام من الجلد الإيطالي مع إبزيم فضي.',
    availability: true,
    volume: 1,
  },
  {
    id: 'prod-013',
    name: 'Rouge à Lèvres Set',
    nameAr: 'مجموعة أحمر شفاه',
    category: 'beauty',
    price: 219,
    image: '/Produit 14.png',
    description: '4 rouges à lèvres longue tenue en teintes rosées.',
    descriptionAr: '4 أحمر شفاه طويل الأمد بدرجات وردية.',
    availability: true,
    volume: 2,
  },
  {
    id: 'prod-014',
    name: 'Écharpe Soie Imprimée',
    nameAr: 'وشاح حرير مطبوع',
    category: 'accessories',
    price: 259,
    image: '/Produit 15.png',
    description: 'Écharpe en soie pure avec motifs floraux exclusifs.',
    descriptionAr: 'وشاح من الحرير الخالص مع نقوش زهرية حصرية.',
    availability: true,
    volume: 1,
  },
  {
    id: 'prod-015',
    name: 'Pack Offre Spéciale Beauté',
    nameAr: 'عرض خاص للجمال',
    category: 'offers',
    price: 399,
    image: '/Produit 1.png',
    description: 'Palette + rouge à lèvres + parfum mini à prix exclusif.',
    descriptionAr: 'باليت + أحمر شفاه + عطر صغير بسعر حصري.',
    availability: true,
    volume: 3,
  },
  {
    id: 'prod-016',
    name: 'Coffret Découverte Homme',
    nameAr: 'صندوق اكتشاف رجالي',
    category: 'offers',
    price: 459,
    image: '/Produit 6.png',
    description: 'Portefeuille + ceinture + lunettes à prix réduit.',
    descriptionAr: 'محفظة + حزام + نظارات بسعر مخفض.',
    availability: true,
    volume: 4,
  },
];

export const BOX_MAX_CAPACITY = 20;

// Frais de livraison : Casablanca 20 DH, Hors Casablanca 35 DH
export const DELIVERY_CASA = 20;
export const DELIVERY_HORS_CASA = 35;
export const DELIVERY_FEE = DELIVERY_CASA;

export function isCasablanca(city?: string): boolean {
  if (!city) return false;
  const clean = city.trim().toLowerCase();
  return (
    clean === 'casablanca' ||
    clean === 'casa' ||
    clean === 'dar beida' ||
    clean === 'dar bayda' ||
    clean === 'dar baida' ||
    clean.includes('casablanca') ||
    clean.includes('بيضاء')
  );
}

export function getDeliveryFee(city?: string): number {
  if (!city || !city.trim()) {
    return DELIVERY_CASA; // Valeur par défaut
  }
  return isCasablanca(city) ? DELIVERY_CASA : DELIVERY_HORS_CASA;
}
