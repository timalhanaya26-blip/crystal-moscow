import { PrismaClient } from "@prisma/client";
import { HOTELS, type HotelSeed } from "./seed-data";

const prisma = new PrismaClient();

// عدد الفنادق الإجمالي المطلوب لأغراض العرض التجريبي.
// اضبطه على HOTELS.length (أي عطّل التوليد) عندما تضيف بياناتك الحقيقية كاملة.
// اضبطه على رقم أكبر إذا أردت إضافة فنادق تجريبية إضافية للعرض
const TARGET_TOTAL = HOTELS.length; // 26 فندق حقيقي

// عناصر تُستخدم لتوليد فنادق تجريبية إضافية
const CITIES = [
  "موسكو",
  "سان بطرسبرغ",
  "سوتشي",
  "كازان",
  "يكاترينبورغ",
  "نوفوسيبيرسك",
  "فلاديفوستوك",
  "كالينينغراد",
  "نيجني نوفغورود",
  "سمارة",
];
const LUX_NAMES = ["بالاس", "غراند", "رويال", "بلازا", "لوكشري", "ريجنسي", "ماجستيك"];
const ECO_NAMES = ["كومفورت", "سيتي", "سمارت", "بَدجِت", "إكسبريس", "سنترال", "صن"];
const AMENITIES_LUX = [
  "واي فاي مجاني",
  "سبا",
  "مسبح",
  "مطعم",
  "صالة رياضية",
  "خدمة الغرف 24 ساعة",
  "موقف سيارات",
  "خدمة نقل المطار",
];
const AMENITIES_ECO = [
  "واي فاي مجاني",
  "إفطار مجاني",
  "تكييف",
  "مكتب استقبال 24 ساعة",
  "موقف سيارات",
];

const pick = <T>(arr: T[], i: number) => arr[i % arr.length];
const img = (seed: string, n: number) =>
  `https://picsum.photos/seed/${seed}-${n}/1200/800`;

function makeDemoHotel(i: number): HotelSeed {
  const luxury = i % 2 === 0;
  const city = pick(CITIES, i);
  const brand = luxury ? pick(LUX_NAMES, i) : pick(ECO_NAMES, i);
  const slug = `demo-${luxury ? "lux" : "eco"}-${i}`;
  const stars = luxury ? (i % 2 === 0 ? 5 : 4) : (i % 2 === 0 ? 3 : 2);
  const base = luxury ? 600 + (i % 6) * 90 : 130 + (i % 6) * 35;

  return {
    slug,
    name: `${brand} ${city}`,
    city,
    address: `${city}، الحي ${1 + (i % 9)}`,
    description: luxury
      ? `فندق ${stars} نجوم بخدمات راقية وموقع مميز في ${city}، يوفّر تجربة إقامة فاخرة بإطلالات جميلة ومرافق متكاملة.`
      : `فندق اقتصادي مريح في ${city}، نظيف وعملي وبأسعار في المتناول، مثالي للمسافرين والرحلات القصيرة.`,
    stars,
    category: luxury ? "luxury" : "economy",
    rating: Number((luxury ? 4.4 + (i % 6) * 0.08 : 3.8 + (i % 5) * 0.08).toFixed(1)),
    reviews: 120 + ((i * 37) % 1800),
    mainImage: img(slug, 0),
    images: Array.from({ length: 5 }, (_, n) => img(slug, n + 1)),
    amenities: luxury ? AMENITIES_LUX : AMENITIES_ECO,
    featured: false,
    rooms: [
      {
        name: luxury ? "غرفة ديلوكس" : "غرفة قياسية",
        price: base,
        area: luxury ? 34 : 18,
        capacity: 2,
        beds: "سرير مزدوج",
        images: Array.from({ length: 2 }, (_, n) => img(`${slug}-r1`, n + 1)),
      },
      {
        name: luxury ? "جناح تنفيذي" : "غرفة عائلية",
        price: Math.round(base * (luxury ? 1.9 : 1.5)),
        area: luxury ? 65 : 28,
        capacity: luxury ? 3 : 4,
        beds: luxury ? "سرير كينج + أريكة" : "سريران مزدوجان",
        images: Array.from({ length: 2 }, (_, n) => img(`${slug}-r2`, n + 1)),
      },
    ],
  };
}

async function main() {
  console.log("🗑️  حذف البيانات القديمة...");
  await prisma.booking.deleteMany();
  await prisma.room.deleteMany();
  await prisma.hotel.deleteMany();

  // دمج الفنادق الحقيقية مع التجريبية حتى الوصول للعدد المطلوب
  const all: HotelSeed[] = [...HOTELS];
  let i = 0;
  while (all.length < TARGET_TOTAL) {
    all.push(makeDemoHotel(i++));
  }

  console.log(`🏨 إضافة ${all.length} فندق...`);
  for (const h of all) {
    await prisma.hotel.create({
      data: {
        slug: h.slug,
        name: h.name,
        nameRu: h.nameRu ?? "",
        city: h.city,
        address: h.address,
        description: h.description,
        stars: h.stars,
        category: h.category,
        rating: h.rating,
        reviews: h.reviews,
        mainImage: h.mainImage,
        images: JSON.stringify(h.images),
        amenities: JSON.stringify(h.amenities),
        whatsapp: h.whatsapp ?? null,
        featured: h.featured ?? false,
        rooms: {
          create: h.rooms.map((r) => ({
            name: r.name,
            price: r.price,
            area: r.area,
            capacity: r.capacity,
            beds: r.beds,
            images: JSON.stringify(r.images),
          })),
        },
      },
    });
  }

  const total = await prisma.hotel.count();
  console.log(`✅ تم! إجمالي الفنادق: ${total}`);
}

main()
  .catch((e) => {
    console.error("❌ خطأ في التهيئة:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
