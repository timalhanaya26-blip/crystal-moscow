// ============================================================
//  بيانات الفنادق الحقيقية
//  موسكو (26) + سوتشي (3) + سانت بطرسبرغ (7) = 36 فندق
//  الأسعار بالروبل الروسي (₽) للليلة الواحدة
//  الصور: Unsplash CDN — مرخصة للاستخدام التجاري المجاني
// ============================================================

export type RoomSeed = {
  name: string;
  price: number;
  area: number;
  capacity: number;
  beds: string;
  images: string[];
};

export type HotelSeed = {
  slug: string;
  name: string;
  nameRu?: string;
  city: string;
  address: string;
  description: string;
  stars: number;
  category: "vip" | "luxury" | "economy";
  rating: number;
  reviews: number;
  mainImage: string;
  images: string[];
  amenities: string[];
  whatsapp?: string;
  featured?: boolean;
  rooms: RoomSeed[];
};

// ── Image pools ──────────────────────────────────────────────

const EXT = [
  "https://plus.unsplash.com/premium_photo-1674651240687-92b4ad15d0ea?w=1200&q=80",
  "https://images.unsplash.com/photo-1551016043-06ec2173531b?w=1200&q=80",
  "https://images.unsplash.com/photo-1652348716053-3447e551dd1f?w=1200&q=80",
  "https://images.unsplash.com/photo-1671683886944-6478e6c84cbc?w=1200&q=80",
  "https://plus.unsplash.com/premium_photo-1678240508014-d1ab7345bfe6?w=1200&q=80",
  "https://images.unsplash.com/photo-1668480441891-3744c25337a3?w=1200&q=80",
  "https://images.unsplash.com/photo-1723672833895-e82664c37af2?w=1200&q=80",
  "https://images.unsplash.com/photo-1693146842813-be42935ecdbd?w=1200&q=80",
  "https://plus.unsplash.com/premium_photo-1680281936362-aff258ecd143?w=1200&q=80",
  "https://images.unsplash.com/photo-1692153142886-9881d0457b82?w=1200&q=80",
  "https://images.unsplash.com/photo-1628560946700-dde575386781?w=1200&q=80",
  "https://images.unsplash.com/photo-1692153142713-690838f861e8?w=1200&q=80",
  "https://plus.unsplash.com/premium_photo-1723608003732-f6c9797972bc?w=1200&q=80",
  "https://images.unsplash.com/photo-1627678020092-b3a8ac3e490e?w=1200&q=80",
  "https://images.unsplash.com/photo-1506813257165-8c4bffd3a57f?w=1200&q=80",
];

const VIP_INT = [
  "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=1200&q=80",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80",
  "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?w=1200&q=80",
  "https://plus.unsplash.com/premium_photo-1678297269980-16f4be3a15a6?w=1200&q=80",
  "https://plus.unsplash.com/premium_photo-1678297270523-8775c817d0b3?w=1200&q=80",
  "https://images.unsplash.com/photo-1621293954908-907159247fc8?w=1200&q=80",
];

const LUX_INT = [
  "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1200&q=80",
  "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=1200&q=80",
  "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=1200&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
  "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=1200&q=80",
  "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=1200&q=80",
  "https://images.unsplash.com/photo-1631048730670-ff5cd0d08f15?w=1200&q=80",
  "https://images.unsplash.com/photo-1631049307485-2bfb23080676?w=1200&q=80",
  "https://images.unsplash.com/photo-1631049035115-f96132761a38?w=1200&q=80",
  "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=1200&q=80",
  "https://images.unsplash.com/photo-1576354302919-96748cb8299e?w=1200&q=80",
  "https://images.unsplash.com/photo-1590675560125-0d832b9d719e?w=1200&q=80",
  "https://images.unsplash.com/photo-1572177215152-32f247303126?w=1200&q=80",
  "https://images.unsplash.com/photo-1631048835184-3f0ceda91b75?w=1200&q=80",
  "https://images.unsplash.com/photo-1611971263023-105938ce12ed?w=1200&q=80",
  "https://images.unsplash.com/photo-1621891333819-00c206ec8994?w=1200&q=80",
];

const ECO_INT = [
  "https://plus.unsplash.com/premium_photo-1746471641309-eb67bd7533bf?w=1200&q=80",
  "https://images.unsplash.com/photo-1711059985570-4c32ed12a12c?w=1200&q=80",
  "https://plus.unsplash.com/premium_photo-1661879252375-7c1db1932572?w=1200&q=80",
  "https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?w=1200&q=80",
  "https://plus.unsplash.com/premium_photo-1676321688630-9558e7d2be10?w=1200&q=80",
];

const e = (i: number) => EXT[i % EXT.length];
const v = (i: number) => VIP_INT[i % VIP_INT.length];
const lx = (i: number) => LUX_INT[i % LUX_INT.length];
const ec = (i: number) => ECO_INT[i % ECO_INT.length];

// ── صور حقيقية من Wikimedia Commons (CC-licensed) ────────────
const WIKI = {
  // فندق ميتروبول موسكو
  metropolExt:      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Moscow_HotelMetropol_J11.jpg/1200px-Moscow_HotelMetropol_J11.jpg",
  metropolFacade:   "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Moscow_Metropol_Hotel_2011.JPG/1200px-Moscow_Metropol_Hotel_2011.JPG",
  metropolInt:      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Moscow_05-2017_img36_Hotel_Metropol.jpg/1200px-Moscow_05-2017_img36_Hotel_Metropol.jpg",
  // ريتز كارلتون موسكو
  ritzExt:          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/2014_Moskva_Ritz-Carlton_building.JPG/1200px-2014_Moskva_Ritz-Carlton_building.JPG",
  // فور سيزونز موسكو
  fourSeasonsExt:   "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Four_Seasons_hotel_Moscow.jpg/1200px-Four_Seasons_hotel_Moscow.jpg",
  // أرارات بارك هايات موسكو
  araratInt:        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Interior_of_Ararat_Park_Hyatt_Moscow_001.JPG/1200px-Interior_of_Ararat_Park_Hyatt_Moscow_001.JPG",
  // جراند هوتيل أوروبا سانت بطرسبرغ
  grandEuropeExt:   "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Hotel_europe.jpg/1200px-Hotel_europe.jpg",
  grandEuropeInt:   "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Evropeiskaya.jpeg/1200px-Evropeiskaya.jpeg",
};

// ── Amenity presets ──────────────────────────────────────────

const VIP_AMENITIES = [
  "واي فاي مجاني", "سبا وتدليك فاخر", "مسبح داخلي", "مطعم فاخر",
  "بار راقٍ", "نادٍ تنفيذي", "مركز لياقة بدنية", "خدمة الغرف 24 ساعة",
  "كونسيرج خاص", "خدمة نقل VIP من المطار", "موقف سيارات مع سائق", "إفطار فاخر مجاني",
];

const LUX_AMENITIES = [
  "واي فاي مجاني", "سبا", "مسبح", "مطعم فاخر", "بار",
  "صالة رياضية", "خدمة الغرف", "كونسيرج", "موقف سيارات", "إفطار مجاني",
];

const ECO_AMENITIES = [
  "واي فاي مجاني", "مكتب استقبال 24 ساعة", "تكييف", "مطعم", "موقف سيارات", "إفطار مجاني",
];

const APT_AMENITIES = [
  "واي فاي مجاني", "مطبخ مجهز بالكامل", "غسالة ومجفف",
  "تكييف", "مكتب استقبال 24 ساعة", "صالة رياضية", "موقف سيارات",
];

// ════════════════════════════════════════════════════════════
//  موسكو — VIP ★★★★★ (8 فنادق)
// ════════════════════════════════════════════════════════════

export const HOTELS: HotelSeed[] = [
  {
    slug: "bulgari-moscow",
    name: "فندق بولجيري موسكو",
    nameRu: "Отель Bvlgari Москва",
    city: "موسكو",
    address: "كيتاي-غورود، بالقرب من الكرملين والساحة الحمراء",
    description:
      "فندق بوتيك حصري بالغ الفخامة في قلب موسكو التاريخية، يضم 65 غرفة فقط تنبض بالتصميم الإيطالي الراقي. يقع في مبنى أصيل من القرن التاسع عشر على بُعد 300 متر من الكرملين، ويوفّر جناح بولجيري البالغة مساحته 300 متر مربع، ومطعماً عالمياً، وبار على السطح، وسبا فريداً مع مسبح بطول 25 متراً.",
    stars: 5, category: "vip", rating: 4.9, reviews: 524,
    mainImage: e(0),
    images: [e(0), e(1), v(0), v(1), v(2), v(3)],
    amenities: VIP_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة ديلوكس بولجيري", price: 55000, area: 52, capacity: 2, beds: "سرير كينج", images: [v(0), v(1), v(2)] },
      { name: "جناح بولجيري VIP", price: 130000, area: 120, capacity: 3, beds: "سرير كينج + صالون", images: [v(3), v(4), v(5)] },
    ],
  },

  {
    slug: "carlton-moscow",
    name: "فندق ريتز كارلتون موسكو",
    nameRu: "Ритц-Карлтон, Москва",
    city: "موسكو",
    address: "شارع تفيرسكايا 3، قرب الساحة الحمراء",
    description:
      "أحد أفخم فنادق موسكو وأكثرها شهرةً على شارع تفيرسكايا الرئيسي، يضم 266 غرفة و66 جناحاً فاخراً بإطلالات على المدينة. يقع خطوات من الكرملين والساحة الحمراء، ويوفّر خدمة استثنائية على مدار الساعة، ومطاعم عالمية، وسبا من الدرجة الأولى.",
    stars: 5, category: "vip", rating: 4.8, reviews: 1842,
    mainImage: WIKI.ritzExt,
    images: [WIKI.ritzExt, e(2), v(2), v(5), v(6), v(7)],
    amenities: VIP_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة ديلوكس", price: 32000, area: 45, capacity: 2, beds: "سرير كينج", images: [v(2), v(5), v(6)] },
      { name: "جناح تنفيذي", price: 85000, area: 95, capacity: 3, beds: "سرير كينج + أريكة", images: [v(7), v(0), v(3)] },
    ],
  },

  {
    slug: "cosmos-italian-moscow",
    name: "فندق كوسموس إيطاليان موسكو",
    nameRu: "Космос Итальян Москва",
    city: "موسكو",
    address: "شارع نوفي أربات، المنطقة التاريخية",
    description:
      "فندق كوسموس إيطاليان تحفة معمارية تجمع بين الفخامة الروسية والأناقة الإيطالية في موقع مميز بشارع نوفي أربات الحيوي. يتميز بتصميم داخلي فريد على أيدي مصممين إيطاليين، ومطعم إيطالي أصيل، وسبا متكامل.",
    stars: 5, category: "vip", rating: 4.7, reviews: 683,
    mainImage: e(2),
    images: [e(2), e(3), v(1), v(3), v(6), v(7)],
    amenities: VIP_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة إيطاليان ديلوكس", price: 22000, area: 42, capacity: 2, beds: "سرير كينج", images: [v(1), v(3), v(6)] },
      { name: "جناح إيطاليان الفاخر", price: 58000, area: 88, capacity: 4, beds: "غرفتا نوم", images: [v(4), v(5), v(7)] },
    ],
  },

  {
    slug: "four-seasons-moscow",
    name: "فندق فور سيزونز موسكو",
    nameRu: "Фор Сизонс Отель Москва",
    city: "موسكو",
    address: "شارع أوخوتني رياد 2، مقابل حديقة ألكسندروفسكي",
    description:
      "أيقونة الفخامة في موسكو، يواجه ميدان مانيجنايا ويطل على حديقة ألكسندروفسكي مع الكرملين والمسرح البولشوي على بُعد خطوات. يضم مسبحاً داخلياً بانورامياً وسبا فاخراً ومطعم ستيك هاوس عالمي الشهرة، ونادياً تنفيذياً كاملاً.",
    stars: 5, category: "vip", rating: 4.9, reviews: 2150,
    mainImage: WIKI.fourSeasonsExt,
    images: [WIKI.fourSeasonsExt, e(4), v(4), v(0), v(2), v(6)],
    amenities: VIP_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة ديلوكس بإطلالة الحديقة", price: 40000, area: 50, capacity: 2, beds: "سرير كينج", images: [v(4), v(0), v(2)] },
      { name: "جناح الأميرة", price: 110000, area: 130, capacity: 4, beds: "غرفتا نوم + صالون", images: [v(3), v(5), v(7)] },
    ],
  },

  {
    slug: "intercontinental-moscow",
    name: "فندق إنتركونتيننتال موسكو",
    nameRu: "ИнтерКонтиненталь Москва Тверская",
    city: "موسكو",
    address: "شارع تفيرسكايا، المركز التجاري والثقافي",
    description:
      "فندق إنتركونتيننتال موسكو يقع في قلب المدينة على شارع تفيرسكايا الأنيق، ويوفّر تجربة إقامة VIP متكاملة تجمع بين خدمة الضيافة العالمية والأجواء الروسية الأصيلة. يضم نادياً تنفيذياً مخصصاً وخدمات أعمال متطورة وطيفاً واسعاً من المطاعم والترفيه.",
    stars: 5, category: "vip", rating: 4.7, reviews: 1320,
    mainImage: e(4),
    images: [e(4), e(5), v(3), v(1), v(5), v(7)],
    amenities: VIP_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة ديلوكس VIP", price: 26000, area: 42, capacity: 2, beds: "سرير كينج", images: [v(3), v(1), v(5)] },
      { name: "جناح تنفيذي بانورامي", price: 68000, area: 90, capacity: 3, beds: "سرير كينج + غرفة جلوس", images: [v(0), v(6), v(2)] },
    ],
  },

  {
    slug: "metropol-moscow",
    name: "فندق ميتروبول موسكو",
    nameRu: "Отель Метрополь",
    city: "موسكو",
    address: "تياترالني بروزيد 2، أمام المسرح البولشوي",
    description:
      "إرث تاريخي أصيل يعود إلى عام 1905 وأحد أكثر الفنادق روعةً في موسكو. يقع مباشرةً أمام المسرح البولشوي الشهير وعلى مقربة من الساحة الحمراء. تزدان قاعاته بالفسيفساء الفريدة ولوحات الفن التاريخي، ويضم مطعماً أسطورياً تحت سقف زجاجي، وسبا فاخراً ومسبحاً داخلياً.",
    stars: 5, category: "vip", rating: 4.9, reviews: 3100,
    mainImage: WIKI.metropolExt,
    images: [WIKI.metropolExt, WIKI.metropolFacade, WIKI.metropolInt, v(5), v(2), v(4)],
    amenities: VIP_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة ديلوكس تاريخية", price: 30000, area: 45, capacity: 2, beds: "سرير كينج", images: [v(5), v(2), v(4)] },
      { name: "جناح رويال بانورامي", price: 90000, area: 110, capacity: 3, beds: "سرير كينج + غرفة جلوس", images: [v(6), v(7), v(1)] },
    ],
  },

  {
    slug: "st-regis-moscow",
    name: "فندق سانت ريجيس موسكو نيكولسكايا",
    nameRu: "Сент-Реджис Москва Никольская",
    city: "موسكو",
    address: "شارع نيكولسكايا، 100 متر من الساحة الحمراء",
    description:
      "تجربة إقامة فريدة من نوعها في قلب موسكو التاريخية على شارع نيكولسكايا الذهبي، على خطوات من الساحة الحمراء. يجمع سانت ريجيس بين الموروث الأرستقراطي الروسي والفخامة المعاصرة. تمتاز غرفه وأجنحته بتشطيبات استثنائية وخدمة الخادم الشخصي وسبا سانت ريجيس الشهير.",
    stars: 5, category: "vip", rating: 4.9, reviews: 1680,
    mainImage: e(6),
    images: [e(6), e(7), v(7), v(3), v(1), v(5)],
    amenities: VIP_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة ديلوكس سانت ريجيس", price: 38000, area: 48, capacity: 2, beds: "سرير كينج", images: [v(7), v(3), v(1)] },
      { name: "الجناح الإمبراطوري", price: 105000, area: 125, capacity: 4, beds: "غرفتا نوم + صالون", images: [v(2), v(6), v(5)] },
    ],
  },

  {
    slug: "ararat-park-hyatt-moscow",
    name: "فندق أرارات بارك هايات موسكو",
    nameRu: "Арарат Парк Хаятт Москва",
    city: "موسكو",
    address: "شارع نيغليننايا 4، 300 متر من المسرح البولشوي",
    description:
      "مزيج استثنائي من الفخامة الحديثة والإلهام الأرميني في موسكو التاريخية. يقع على بُعد 300 متر من المسرح البولشوي، ويتميز بمطعم بانوراما الشهير على السطح بإطلالة ساحرة على أبراج الكرملين، وسبا أرارات المتكامل، ونادٍ تنفيذي من الدرجة الأولى.",
    stars: 5, category: "vip", rating: 4.9, reviews: 2870,
    mainImage: WIKI.araratInt,
    images: [WIKI.araratInt, e(0), v(5), v(4), v(7), v(3)],
    amenities: VIP_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة بارك كينج", price: 19145, area: 40, capacity: 2, beds: "سرير كينج", images: [v(5), v(4), v(7)] },
      { name: "جناح أرارات VIP", price: 52000, area: 88, capacity: 3, beds: "سرير كينج + غرفة جلوس", images: [v(0), v(3), v(2)] },
    ],
  },

  // ════════════════════════════════════════════════════════════
  //  موسكو — فاخرة ★★★★★ (12 فندق)
  // ════════════════════════════════════════════════════════════

  {
    slug: "corinthia-moscow",
    name: "فندق كورنثيا موسكو",
    nameRu: "Коринтия Москва",
    city: "موسكو",
    address: "شارع تفيرسكايا 10، قرب الساحة الحمراء",
    description:
      "فندق بوتيك فاخر في موقع تاريخي على شارع تفيرسكايا بالقرب من الساحة الحمراء والكرملين. يضم واجهة تاريخية محمية تعود إلى القرن التاسع عشر تجمع بين العمارة الكلاسيكية وأرقى معايير الضيافة العصرية. يتميز بعدد محدود من الأجنحة الحصرية وخدمة شخصية متميزة.",
    stars: 5, category: "luxury", rating: 4.7, reviews: 890,
    mainImage: e(8),
    images: [e(8), e(9), lx(0), lx(1), lx(2), lx(3)],
    amenities: LUX_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة سوبيريور كلاسيك", price: 20000, area: 38, capacity: 2, beds: "سرير كينج", images: [lx(0), lx(1), lx(2)] },
      { name: "جناح كورنثيا", price: 52000, area: 85, capacity: 3, beds: "سرير كينج + أريكة", images: [lx(3), lx(4), lx(5)] },
    ],
  },

  {
    slug: "cosmos-arbat-moscow",
    name: "فندق كوسموس أربات موسكو",
    nameRu: "Космос Арбат Москва",
    city: "موسكو",
    address: "شارع نوفي أربات 2، الحي التاريخي والمالي",
    description:
      "فندق كوسموس أربات الراقي يتربع في قلب الحي التاريخي والمالي في موسكو، مقابل مطعم براها الأسطوري وأقدم سينما في العالم. يضم 242 غرفة فسيحة ومطعماً بانورامياً على الطابق الثاني عشر يوفّر إطلالات خلابة على موسكو، وصالة أعمال متكاملة وبار في الردهة يعمل على مدار الساعة.",
    stars: 5, category: "luxury", rating: 4.5, reviews: 1240,
    mainImage: e(9),
    images: [e(9), e(10), lx(2), lx(3), lx(4), lx(5)],
    amenities: LUX_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة سوبيريور", price: 9500, area: 30, capacity: 2, beds: "سرير كينج", images: [lx(2), lx(3), lx(4)] },
      { name: "جناح بانوراما الطابق 12", price: 21000, area: 60, capacity: 3, beds: "سرير كينج + أريكة", images: [lx(5), lx(6), lx(7)] },
    ],
  },

  {
    slug: "cosmos-royal-moscow",
    name: "فندق كوسموس رويال موسكو",
    nameRu: "Гостиница Космос",
    city: "موسكو",
    address: "بروسبيكت ميرا 150، قرب معرض VDNKh",
    description:
      "أكبر فندق في روسيا بـ 1,777 غرفة وأجنحة رائعة على الطراز السوفيتي الكلاسيكي المتجدد. يقع في المنطقة الخضراء شمال شرق موسكو قرب معرض VDNKh الشهير وحديقة ألوشا، وعلى بُعد 20 دقيقة بالسيارة من المركز. تجربة إقامة لا تُنسى بأسعار منافسة.",
    stars: 5, category: "luxury", rating: 4.4, reviews: 4200,
    mainImage: e(10),
    images: [e(10), e(11), lx(4), lx(5), lx(6), lx(7)],
    amenities: LUX_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة قياسية كوسموس", price: 7500, area: 26, capacity: 2, beds: "سرير مزدوج", images: [lx(4), lx(5), lx(6)] },
      { name: "جناح ديلوكس رويال", price: 18000, area: 55, capacity: 4, beds: "غرفتا نوم", images: [lx(7), lx(8), lx(9)] },
    ],
  },

  {
    slug: "mandarin-moscow",
    name: "فندق ماينديس موسكو",
    nameRu: "Отель Менде Москва",
    city: "موسكو",
    address: "شارع أولخوفسكايا 23، قرب ميدان المحطات الثلاث",
    description:
      "فندق ماينديس الراقي في قصر نيوكلاسيكي تاريخي بالقرب من ميدان كومسومولسكايا (محطات القطارات الثلاث). تجمع رحلتك اليومية بين أجواء القرن التاسع عشر الأرستقراطية والخدمات المعاصرة المتكاملة، مع سهولة الوصول لمختلف أرجاء موسكو عبر شبكة المترو.",
    stars: 5, category: "luxury", rating: 4.5, reviews: 760,
    mainImage: e(11),
    images: [e(11), e(12), lx(6), lx(7), lx(8), lx(9)],
    amenities: LUX_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة ديلوكس كلاسيك", price: 10000, area: 32, capacity: 2, beds: "سرير مزدوج", images: [lx(6), lx(7), lx(8)] },
      { name: "جناح فاخر", price: 24000, area: 65, capacity: 4, beds: "غرفتا نوم", images: [lx(9), lx(10), lx(11)] },
    ],
  },

  {
    slug: "marriott-grand-moscow",
    name: "فندق ماريوت جراند موسكو",
    nameRu: "Марриотт Гранд Хотел Москва",
    city: "موسكو",
    address: "شارع تفيرسكايا، المركز التاريخي",
    description:
      "فندق ماريوت الكبير يقف شامخاً في قلب موسكو على الشارع الرئيسي الأنيق، ويوفّر معايير الضيافة العالمية التي يشتهر بها البراند. يضم مطعم ذا لوبي إيزباي بار، ومسبحاً وسبا متكاملاً، وصالات مؤتمرات حديثة ومرافق أعمال من الطراز الأول.",
    stars: 5, category: "luxury", rating: 4.7, reviews: 2840,
    mainImage: e(12),
    images: [e(12), e(13), lx(8), lx(9), lx(10), lx(11)],
    amenities: LUX_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة ديلوكس ماريوت", price: 16000, area: 35, capacity: 2, beds: "سرير كينج", images: [lx(8), lx(9), lx(10)] },
      { name: "جناح تنفيذي ماريوت", price: 42000, area: 78, capacity: 3, beds: "سرير كينج + أريكة", images: [lx(11), lx(12), lx(13)] },
    ],
  },

  {
    slug: "movenpick-moscow",
    name: "فندق موفنبيك موسكو تاغانسكايا",
    nameRu: "Мовенпик Хотел Москва Таганская",
    city: "موسكو",
    address: "شارع تاغانسكايا، موسكو",
    description:
      "فندق موفنبيك الراقي ذو الطراز السويسري الأنيق في منطقة تاغانسكايا الحيوية بموسكو. يتميز بتصميم عصري ودافئ وإطلالات جميلة على المدينة، ومطبخ موفنبيك الشهير بجودته العالية، وسبا متكامل ومركز لياقة بدنية.",
    stars: 5, category: "luxury", rating: 4.6, reviews: 1580,
    mainImage: e(13),
    images: [e(13), e(14), lx(10), lx(11), lx(12), lx(13)],
    amenities: LUX_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة موفنبيك سوبيريور", price: 15000, area: 34, capacity: 2, beds: "سرير كينج", images: [lx(10), lx(11), lx(12)] },
      { name: "جناح موفنبيك الفاخر", price: 38000, area: 70, capacity: 3, beds: "سرير كينج + غرفة جلوس", images: [lx(13), lx(14), lx(15)] },
    ],
  },

  {
    slug: "renatus-moscow",
    name: "فندق ريناتيس موسكو",
    nameRu: "Ренатус Москва",
    city: "موسكو",
    address: "وسط موسكو، الحي التاريخي",
    description:
      "فندق ريناتيس الراقي وجهة متميزة للباحثين عن الهدوء والخصوصية في قلب موسكو. يتميز بتصميم داخلي أنيق جمع بين الكلاسيكية والحداثة، مع خدمة شخصية رفيعة المستوى وغرف فسيحة بلمسات فنية مميزة.",
    stars: 5, category: "luxury", rating: 4.5, reviews: 420,
    mainImage: e(14),
    images: [e(14), e(8), lx(12), lx(13), lx(14), lx(15)],
    amenities: LUX_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة سوبيريور ريناتيس", price: 11000, area: 30, capacity: 2, beds: "سرير مزدوج", images: [lx(12), lx(13), lx(14)] },
      { name: "جناح ريناتيس الفاخر", price: 27000, area: 65, capacity: 3, beds: "سرير كينج + أريكة", images: [lx(15), lx(16), lx(0)] },
    ],
  },

  {
    slug: "standard-moscow",
    name: "فندق ستاندارت موسكو",
    nameRu: "Стандарт Москва",
    city: "موسكو",
    address: "وسط موسكو",
    description:
      "فندق ستاندارت الأنيق يقدم تجربة إقامة عصرية مريحة في موسكو بمعايير 5 نجوم واضحة وخدمات متكاملة. يتميز بتصميم بسيط وعصري يعكس مفهوم الفندق القائم على الجودة الصادقة والأسعار المنطقية لمستوى الخدمة.",
    stars: 5, category: "luxury", rating: 4.6, reviews: 630,
    mainImage: e(9),
    images: [e(9), e(10), lx(14), lx(15), lx(16), lx(1)],
    amenities: LUX_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة ديلوكس", price: 12500, area: 32, capacity: 2, beds: "سرير كينج", images: [lx(14), lx(15), lx(16)] },
      { name: "جناح فاخر", price: 30000, area: 68, capacity: 3, beds: "سرير كينج + غرفة جلوس", images: [lx(0), lx(1), lx(2)] },
    ],
  },

  {
    slug: "arbat-stars-moscow",
    name: "فندق نجوم أربات موسكو",
    nameRu: "Арбат Старс",
    city: "موسكو",
    address: "شارع نوفي أربات، على ضفاف نهر موسكفا",
    description:
      "نجوم أربات (المعروف سابقاً بماريوت نوفي أربات) فندق فاخر بموقع متميز في منطقة الأربات التاريخية قرب نهر موسكفا والمباني الحكومية والسفارات. يوفّر غرفاً أنيقة بإطلالة على شارع نوفي أربات، وشققاً مصممة بغرفة نوم وغرفتين مع مطابخ كاملة، وسبا مع حمام بخاري وحمام تركي.",
    stars: 5, category: "luxury", rating: 4.6, reviews: 1950,
    mainImage: e(10),
    images: [e(10), e(11), lx(16), lx(15), lx(7), lx(3)],
    amenities: LUX_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة بإطلالة نوفي أربات", price: 13000, area: 34, capacity: 2, beds: "سرير كينج", images: [lx(16), lx(15), lx(7)] },
      { name: "شقة غرفتا نوم", price: 32000, area: 85, capacity: 4, beds: "غرفتا نوم + مطبخ", images: [lx(3), lx(4), lx(5)] },
    ],
  },

  {
    slug: "swissotel-krasnye-holmy",
    name: "فندق سويس كراسني موسكو",
    nameRu: "Свиссотель Красные Холмы Москва",
    city: "موسكو",
    address: "كوسموداميانسكايا ناب 52، زاموسكفوريتشي",
    description:
      "فندق سويسوتيل كراسني خولمي يرتفع بأناقة سويسرية في منطقة زاموسكفوريتشي جنوب الكرملين. يتميز بإطلالات بانورامية رائعة على نهر موسكفا ومعالم المدينة التاريخية من أدواره العليا، ومطعمهم المشهور شيبور وسبا متكامل.",
    stars: 5, category: "luxury", rating: 4.7, reviews: 2100,
    mainImage: e(11),
    images: [e(11), e(12), lx(0), lx(16), lx(8), lx(9)],
    amenities: LUX_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة سوبيريور بإطلالة النهر", price: 18500, area: 36, capacity: 2, beds: "سرير كينج", images: [lx(0), lx(16), lx(8)] },
      { name: "جناح سويس بانوراما", price: 47000, area: 80, capacity: 3, beds: "سرير كينج + غرفة جلوس", images: [lx(6), lx(7), lx(9)] },
    ],
  },

  {
    slug: "radisson-collection-moscow",
    name: "فندق راديسون كولكشن موسكو",
    nameRu: "Рэдиссон Коллекшн Отель Москва",
    city: "موسكو",
    address: "كوتوزوفسكي بروسبيكت 2/1، موسكو",
    description:
      "راديسون كولكشن فندق راقٍ يجمع بين الفخامة المعاصرة وتاريخ موسكو الثري على الشارع الملكي الشهير كوتوزوفسكي بروسبيكت. يضم مطعم الشيف الشهير على الطابق العلوي بإطلالة بانورامية فريدة، وسبا وصالة رياضية ونادٍ تنفيذي متكامل.",
    stars: 5, category: "luxury", rating: 4.8, reviews: 1730,
    mainImage: e(12),
    images: [e(12), e(13), lx(1), lx(2), lx(9), lx(10)],
    amenities: LUX_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة ديلوكس راديسون", price: 17000, area: 36, capacity: 2, beds: "سرير كينج", images: [lx(1), lx(2), lx(9)] },
      { name: "جناح راديسون الفاخر", price: 44000, area: 82, capacity: 3, beds: "سرير كينج + غرفة جلوس", images: [lx(10), lx(11), lx(12)] },
    ],
  },

  // ════════════════════════════════════════════════════════════
  //  موسكو — اقتصادية ★★★★ (6 فنادق)
  // ════════════════════════════════════════════════════════════

  {
    slug: "art-court-moscow",
    name: "فندق آرت كورت موسكو",
    nameRu: "Арт Корт Москва",
    city: "موسكو",
    address: "وسط موسكو، قرب المتاحف والمعارض الفنية",
    description:
      "فندق آرت كورت الأنيق مساحة تجمع بين الفن والضيافة في قلب موسكو. يتميز بتصميم داخلي استوحى ملامحه من تراث موسكو الفني، وغرف مريحة بلمسات إبداعية، وموقع مثالي قريب من أبرز المتاحف والمعارض الفنية في المدينة.",
    stars: 4, category: "economy", rating: 4.3, reviews: 870,
    mainImage: e(3),
    images: [e(3), e(5), ec(0), ec(1), ec(2)],
    amenities: ECO_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة قياسية", price: 7000, area: 22, capacity: 2, beds: "سرير مزدوج", images: [ec(0), ec(1)] },
      { name: "غرفة ديلوكس", price: 14500, area: 32, capacity: 3, beds: "سرير كينج + أريكة", images: [ec(2), ec(3)] },
    ],
  },

  {
    slug: "intermark-moscow",
    name: "فندق إنترمارك موسكو (شقق فندقية)",
    nameRu: "Интермарк Резиденс Москва",
    city: "موسكو",
    address: "منطقة أربات / الشارع الثاني لزفينيغورودسكايا",
    description:
      "إنترمارك ريزيدنس وجهة مثالية للإقامات الطويلة والعائلات، بـ133 شقة فاخرة مجهزة بالكامل في الحي الثقافي والتاريخي الراقي بأربات. توفّر كل شقة مطبخاً كاملاً ومناطق معيشة فسيحة بمعايير فندقية راقية، مما يجعلها أوفر بنسبة تصل إلى 50٪ مقارنة بالفنادق التقليدية.",
    stars: 4, category: "economy", rating: 4.3, reviews: 1120,
    mainImage: e(6),
    images: [e(6), e(7), ec(1), ec(2), ec(3)],
    amenities: APT_AMENITIES,
    featured: true,
    rooms: [
      { name: "شقة ستوديو فاخرة", price: 7200, area: 35, capacity: 2, beds: "سرير مزدوج", images: [ec(1), ec(2)] },
      { name: "شقة غرفة نوم واحدة", price: 13500, area: 55, capacity: 3, beds: "سرير كينج + أريكة", images: [ec(3), ec(4)] },
    ],
  },

  {
    slug: "novotel-moscow",
    name: "فندق نوفا أوتيل موسكو",
    nameRu: "Новотель Москва Центр",
    city: "موسكو",
    address: "وسط موسكو",
    description:
      "فندق نوفوتيل موسكو من سلسلة أكور العالمية، يوفّر إقامة مريحة ومنظمة بمعايير دولية موحدة في قلب موسكو. يناسب المسافرين لأغراض العمل والسياحة على حدٍّ سواء، مع غرف عملية أنيقة وخدمات الأعمال المتكاملة والمطعم الفرنسي المميز.",
    stars: 4, category: "economy", rating: 4.3, reviews: 2650,
    mainImage: e(8),
    images: [e(8), e(9), ec(2), ec(3), ec(4)],
    amenities: ECO_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة سوبيريور", price: 7800, area: 20, capacity: 2, beds: "سرير مزدوج", images: [ec(2), ec(3)] },
      { name: "غرفة عائلية", price: 16000, area: 32, capacity: 4, beds: "سريران مفردان + سرير طابقين", images: [ec(4), ec(0)] },
    ],
  },

  {
    slug: "adagio-moscow",
    name: "فندق أداجيو موسكو (شقق فندقية)",
    nameRu: "Апартотель Адажио Москва",
    city: "موسكو",
    address: "وسط موسكو",
    description:
      "أداجيو موسكو من سلسلة أكور للشقق الفندقية، حل مثالي بين المرونة والراحة للمسافرين الذين يرغبون في استقلالية المنزل بجودة الفندق. تضم كل شقة مطبخاً مجهزاً بالكامل وصالة واسعة، وهي خيار اقتصادي مميز للعائلات والإقامات المطولة.",
    stars: 4, category: "economy", rating: 4.2, reviews: 1340,
    mainImage: e(13),
    images: [e(13), e(14), ec(3), ec(4), ec(0)],
    amenities: APT_AMENITIES,
    featured: true,
    rooms: [
      { name: "ستوديو أداجيو", price: 6800, area: 28, capacity: 2, beds: "سرير مزدوج", images: [ec(3), ec(4)] },
      { name: "شقة من غرفة نوم", price: 12500, area: 48, capacity: 3, beds: "سرير كينج + أريكة", images: [ec(0), ec(1)] },
    ],
  },

  {
    slug: "ibis-moscow",
    name: "فندق إيبيس موسكو",
    nameRu: "Ибис Москва Центр",
    city: "موسكو",
    address: "وسط موسكو",
    description:
      "فندق إيبيس موسكو الخيار الأمثل للمسافر العملي الباحث عن نظافة مضمونة وراحة موثوقة بأسعار في المتناول. من سلسلة أكور العالمية، يقدم إيبيس معايير جودة صارمة وسرير نوم مريح في الأولوية، مع خدمة مطعم وبار طوال اليوم.",
    stars: 4, category: "economy", rating: 4.1, reviews: 3800,
    mainImage: e(14),
    images: [e(14), e(3), ec(4), ec(0), ec(1)],
    amenities: ["واي فاي مجاني", "مكتب استقبال 24 ساعة", "تكييف", "مطعم", "بار"],
    featured: true,
    rooms: [
      { name: "غرفة مفردة إيبيس", price: 4800, area: 16, capacity: 1, beds: "سرير مفرد", images: [ec(4), ec(0)] },
      { name: "غرفة مزدوجة", price: 7200, area: 22, capacity: 2, beds: "سريران مفردان", images: [ec(1), ec(2)] },
    ],
  },

  {
    slug: "pentahotel-moscow-arbat",
    name: "فندق بينتا هوتيل موسكو أربات",
    nameRu: "Пентахотел Москва Арбат",
    city: "موسكو",
    address: "شارع نوفي أربات 15، قرب متحف بوشكين",
    description:
      "بينتا هوتيل تصميم فندقي مختلف يقدم مفهوم البنتالاونج الفريد الذي يدمج الاستقبال والبار والمطعم في فضاء اجتماعي واحد نابض بالحياة. يقع في شارع نوفي أربات الشهير بجانب متحف بوشكين وعلى مقربة من الساحة الحمراء، مع 228 غرفة بتصميم المفهوم المميز.",
    stars: 4, category: "economy", rating: 4.4, reviews: 1890,
    mainImage: e(5),
    images: [e(5), e(6), ec(0), ec(2), ec(4)],
    amenities: ["واي فاي مجاني", "بنتالاونج (بار + مطعم + استقبال)", "صالة رياضية", "تكييف", "مكتب استقبال 24 ساعة"],
    featured: true,
    rooms: [
      { name: "غرفة بينتا قياسية", price: 7020, area: 20, capacity: 2, beds: "سرير مزدوج", images: [ec(0), ec(2)] },
      { name: "غرفة بينتا سوبيريور", price: 14800, area: 30, capacity: 3, beds: "سرير كينج + أريكة", images: [ec(3), ec(1)] },
    ],
  },

  // ════════════════════════════════════════════════════════════
  //  سوتشي (3 فنادق)
  // ════════════════════════════════════════════════════════════

  {
    slug: "grand-karat-sochi",
    name: "فندق جراند كارت سوتشي",
    nameRu: "Гранд Карат Сочи",
    city: "سوتشي",
    address: "شارع أورجونيكيدزي 17، وسط سوتشي",
    description:
      "تحفة معمارية شاهقة بواجهة موجية فريدة، يتربع في قلب سوتشي على الساحل الدافئ للبحر الأسود. يضم 199 غرفة و29 جناحاً فاخراً، ومطعمين راقيين، ومسابح مدفأة على مدار العام، وسبا لا سلطانة الذي يضم 5 قاعات للعلاجات وجاكوزي وسونا وحمام تركي وبركة خاصة بإطلالة بحرية.",
    stars: 5, category: "luxury", rating: 4.6, reviews: 2380,
    mainImage: e(13),
    images: [e(13), e(14), lx(3), lx(4), lx(10), lx(11)],
    amenities: ["واي فاي مجاني", "شاطئ البحر الأسود", "مسبح مدفأ على مدار العام", "سبا لا سلطانة", "مطعمان فاخران", "صالة رياضية", "خدمة الغرف", "نادٍ للأطفال", "موقف سيارات"],
    featured: true,
    rooms: [
      { name: "غرفة بإطلالة البحر", price: 17959, area: 38, capacity: 2, beds: "سرير كينج", images: [lx(3), lx(4), lx(10)] },
      { name: "جناح فاخر بتراس بحرية", price: 42000, area: 80, capacity: 4, beds: "غرفتا نوم + تراس", images: [lx(12), lx(13), lx(14)] },
    ],
  },

  {
    slug: "marriott-krasnaya-polyana-sochi",
    name: "فندق ماريوت كراسنايا بوليانا سوتشي",
    nameRu: "Марриотт Сочи Красная Поляна",
    city: "سوتشي",
    address: "كراسنايا بوليانا، منتجع روزا خوتور، سوتشي",
    description:
      "فندق ماريوت في كراسنايا بوليانا يقع في قلب منتجع روزا خوتور الجبلي الشهير، مكان تنظيم الألعاب الأولمبية الشتوية سوتشي 2014. يضم 201 غرفة وجناحاً بإطلالات خلابة على قمم جبال القوقاز المكسوة بالثلج صيفاً وشتاءً، مع سبا راقٍ ومسبح مدفأ وإمكانية التزلج على المنحدرات.",
    stars: 5, category: "vip", rating: 4.8, reviews: 1650,
    mainImage: e(4),
    images: [e(4), e(5), v(2), v(3), v(6), v(7)],
    amenities: [...VIP_AMENITIES, "تزلج على الجليد", "شاطئ جبلي في الصيف"],
    featured: true,
    rooms: [
      { name: "غرفة ديلوكس بإطلالة الجبال", price: 22000, area: 40, capacity: 2, beds: "سرير كينج", images: [v(2), v(3), v(6)] },
      { name: "جناح منتجع كراسنايا", price: 58000, area: 90, capacity: 4, beds: "غرفتا نوم + صالون", images: [v(4), v(5), v(7)] },
    ],
  },

  {
    slug: "radisson-blu-sochi",
    name: "فندق راديسون بلو ريزورت سوتشي",
    nameRu: "Рэдиссон Блу Резорт Сочи",
    city: "سوتشي",
    address: "شارع تشيخوفا 1، على شاطئ البحر الأسود",
    description:
      "منتجع راديسون بلو المميز يتربع على شاطئ البحر الأسود مباشرةً في وسط سوتشي. يضم 196 غرفة وجناحاً بإطلالات ساحرة على البحر وجبال القوقاز، وأربعة مسابح مدفأة مطلة على البحر، وسبا من الدرجة الأولى، ومطعم أسماك شهير يتيح الجمع بين الشمس والبحر والخدمة الفاخرة.",
    stars: 5, category: "luxury", rating: 4.6, reviews: 2100,
    mainImage: e(6),
    images: [e(6), e(7), lx(5), lx(6), lx(9), lx(10)],
    amenities: ["واي فاي مجاني", "شاطئ خاص على البحر الأسود", "4 مسابح مدفأة", "سبا", "مطعم أسماك فاخر", "بار شاطئي", "رياضات مائية", "صالة رياضية", "موقف سيارات"],
    featured: true,
    rooms: [
      { name: "غرفة بإطلالة البحر الأسود", price: 14500, area: 36, capacity: 2, beds: "سرير كينج", images: [lx(5), lx(6), lx(9)] },
      { name: "جناح فاخر مع تراس بحري", price: 38000, area: 75, capacity: 3, beds: "سرير كينج + غرفة جلوس", images: [lx(10), lx(11), lx(12)] },
    ],
  },

  // ════════════════════════════════════════════════════════════
  //  سانت بطرسبرغ (7 فنادق)
  // ════════════════════════════════════════════════════════════

  {
    slug: "belmond-grand-hotel-europe-spb",
    name: "فندق بيلموند جراند هوتيل أوروبا",
    nameRu: "Гранд Отель Европа",
    city: "سانت بطرسبرغ",
    address: "ميخائيلوفسكايا 1-7، بالقرب من ميدان الفنون والمسرح الميخائيلوفسكي",
    description:
      "أيقونة الفخامة في سانت بطرسبرغ منذ عام 1875، يقع الفندق الأسطوري في القلب الثقافي للمدينة بجوار المسرح الميخائيلوفسكي وعلى خطوات من متحف الإرميتاج. يضم مطعم إيروبا الفاخر والبار الروسي الأصيل، وصالة الشاي الكلاسيكية ذات السقف الزجاجي. أجنحته تنبض بروح روسيا الإمبراطورية بلوحات وتحف فنية أصيلة.",
    stars: 5, category: "vip", rating: 4.9, reviews: 3200,
    mainImage: WIKI.grandEuropeExt,
    images: [WIKI.grandEuropeExt, WIKI.grandEuropeInt, v(0), v(1), v(3), v(5)],
    amenities: VIP_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة ديلوكس كلاسيك", price: 42000, area: 40, capacity: 2, beds: "سرير كينج", images: [v(0), v(1), v(3)] },
      { name: "جناح الفنون الجميلة", price: 115000, area: 110, capacity: 3, beds: "سرير كينج + صالون", images: [v(5), v(6), v(7)] },
    ],
  },

  {
    slug: "four-seasons-lion-palace-spb",
    name: "فندق فور سيزونز ليون بالاس سانت بطرسبرغ",
    nameRu: "Фор Сизонс Отель Лайон Пэлас",
    city: "سانت بطرسبرغ",
    address: "ميدان القديس إسحاق 1، مقابل كاتدرائية القديس إسحاق",
    description:
      "قصر الأسد التاريخي من القرن التاسع عشر أُعيد تأهيله ليصبح أحد أرقى فنادق روسيا. يواجه كاتدرائية القديس إسحاق الذهبية الشاهقة وعلى بُعد خطوات من نهر النيفا وقصر الشتاء ومتحف الإرميتاج. يضم 175 غرفة وجناحاً استثنائياً، ومسبحاً داخلياً بانورامياً، وسبا فور سيزونز المتكامل.",
    stars: 5, category: "vip", rating: 4.9, reviews: 2100,
    mainImage: e(3),
    images: [e(3), e(1), v(4), v(2), v(6), v(0)],
    amenities: VIP_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة ديلوكس", price: 38000, area: 45, capacity: 2, beds: "سرير كينج", images: [v(4), v(2), v(6)] },
      { name: "جناح قصر الأسد", price: 110000, area: 120, capacity: 3, beds: "سرير كينج + صالون", images: [v(0), v(1), v(7)] },
    ],
  },

  {
    slug: "kempinski-moika-spb",
    name: "فندق كيمبينسكي مويكا 22",
    nameRu: "Кемпински Мойка 22",
    city: "سانت بطرسبرغ",
    address: "ضفة نهر مويكا 22، قرب ميدان القديس إسحاق",
    description:
      "فندق كيمبينسكي يرتفع بأناقة أوروبية راقية على ضفاف نهر مويكا الساحر، على مقربة من بيت بوشكين الشاعر وكاتدرائية القديس إسحاق ومتحف الإرميتاج. يضم 195 غرفة وجناحاً بتصميم معاصر فاخر، ومطعم بيلاروسيان الشهير ذي الطابع الروسي الأصيل، وسبا كيمبينسكي المتكامل مع مسبح داخلي.",
    stars: 5, category: "vip", rating: 4.8, reviews: 1850,
    mainImage: e(7),
    images: [e(7), e(4), v(3), v(5), v(1), v(7)],
    amenities: VIP_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة ديلوكس بإطلالة نهر مويكا", price: 32000, area: 42, capacity: 2, beds: "سرير كينج", images: [v(3), v(5), v(1)] },
      { name: "جناح VIP مويكا", price: 85000, area: 95, capacity: 3, beds: "سرير كينج + غرفة جلوس", images: [v(7), v(2), v(4)] },
    ],
  },

  {
    slug: "corinthia-spb",
    name: "فندق كورنثيا سانت بطرسبرغ",
    nameRu: "Коринтия Санкт-Петербург",
    city: "سانت بطرسبرغ",
    address: "نيفسكي بروسبيكت 57، وسط المدينة",
    description:
      "فندق كورنثيا الفاخر يمتد على شارع نيفسكي الشهير، ويضم 388 غرفة وجناحاً تجمع بين الطراز الكلاسيكي وأرقى الخدمات العصرية. موقعه المميز يتيح التنقل بسهولة لزيارة متحف الإرميتاج وكاتدرائية القديس إسحاق والكنيسة الملونة ذات القباب.",
    stars: 5, category: "luxury", rating: 4.7, reviews: 2900,
    mainImage: e(9),
    images: [e(9), e(8), lx(1), lx(3), lx(5), lx(8)],
    amenities: LUX_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة ديلوكس", price: 18000, area: 36, capacity: 2, beds: "سرير كينج", images: [lx(1), lx(3), lx(5)] },
      { name: "جناح كورنثيا", price: 46000, area: 82, capacity: 3, beds: "سرير كينج + غرفة جلوس", images: [lx(8), lx(9), lx(10)] },
    ],
  },

  {
    slug: "w-st-petersburg",
    name: "فندق W سانت بطرسبرغ",
    nameRu: "W Санкт-Петербург",
    city: "سانت بطرسبرغ",
    address: "شارع فوزنيسنسكي 6، على بُعد دقيقتين من ميدان القديس إسحاق",
    description:
      "أول فندق W في روسيا يجمع بين الجرأة المعاصرة وسحر سانت بطرسبرغ الكلاسيكية. يضم مطعم WAVE الإبداعي، وبار WET المذهل الذي يطل على المسبح الداخلي، وغرف وأجنحة بتصاميم مستوحاة من الفن الروسي وحركة الباوهاوس. الأقرب إلى ميدان القديس إسحاق وعلى مسافة قصيرة من متحف الإرميتاج.",
    stars: 5, category: "luxury", rating: 4.6, reviews: 1680,
    mainImage: e(12),
    images: [e(12), e(11), lx(6), lx(7), lx(11), lx(13)],
    amenities: LUX_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة وارم", price: 22000, area: 38, capacity: 2, beds: "سرير كينج", images: [lx(6), lx(7), lx(11)] },
      { name: "جناح وندرفول", price: 55000, area: 78, capacity: 3, beds: "سرير كينج + غرفة جلوس", images: [lx(13), lx(14), lx(16)] },
    ],
  },

  {
    slug: "ibis-spb-centre",
    name: "فندق إيبيس سانت بطرسبرغ",
    nameRu: "Ибис Санкт-Петербург Центр",
    city: "سانت بطرسبرغ",
    address: "شارع ليرمونتوفسكي 43/1، على بُعد 15 دقيقة مشياً من ميدان القديس إسحاق",
    description:
      "فندق إيبيس الخيار الأمثل للمسافر العملي في مدينة الفنون الروسية. يقع في منطقة سيمينوفسكايا الهادئة بالقرب من وسط المدينة، وعلى بُعد 15 دقيقة مشياً من أهم المعالم السياحية كمتحف الإرميتاج وكاتدرائية القديس إسحاق. نظافة مضمونة وراحة موثوقة بسعر منافس.",
    stars: 3, category: "economy", rating: 4.2, reviews: 5100,
    mainImage: e(14),
    images: [e(14), e(5), ec(0), ec(2), ec(4)],
    amenities: ["واي فاي مجاني", "مكتب استقبال 24 ساعة", "تكييف", "مطعم", "بار"],
    featured: true,
    rooms: [
      { name: "غرفة مفردة إيبيس", price: 4200, area: 16, capacity: 1, beds: "سرير مفرد", images: [ec(0), ec(2)] },
      { name: "غرفة مزدوجة", price: 6800, area: 22, capacity: 2, beds: "سريران مفردان", images: [ec(4), ec(1)] },
    ],
  },

  {
    slug: "park-inn-pribaltiyskaya-spb",
    name: "فندق بارك إن بريبالتيسكايا",
    nameRu: "Парк Инн Прибалтийская",
    city: "سانت بطرسبرغ",
    address: "شارع كورابليستروتيلي 14، جزيرة فاسيليفسكي",
    description:
      "فندق بارك إن بريبالتيسكايا الضخم على جزيرة فاسيليفسكي مع إطلالات رائعة على خليج فنلندا وأفق سانت بطرسبرغ خلال الليالي البيضاء الأسطورية في الصيف. أحد أكبر الفنادق في المدينة بأكثر من 1200 غرفة، وإمكانية الوصول للمركز عبر شبكة المترو بـ 15 دقيقة.",
    stars: 4, category: "economy", rating: 4.1, reviews: 3800,
    mainImage: e(2),
    images: [e(2), e(10), ec(1), ec(3), ec(4)],
    amenities: ECO_AMENITIES,
    featured: true,
    rooms: [
      { name: "غرفة قياسية", price: 5800, area: 22, capacity: 2, beds: "سرير مزدوج", images: [ec(1), ec(3)] },
      { name: "غرفة بإطلالة خليج فنلندا", price: 9500, area: 28, capacity: 2, beds: "سرير كينج", images: [ec(4), ec(0)] },
    ],
  },
];
