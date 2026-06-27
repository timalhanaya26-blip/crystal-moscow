import { prisma } from "@/lib/db";
import type { Hotel, Room } from "@prisma/client";

// أنواع مساعدة بعد تحويل حقول JSON النصية إلى مصفوفات
export type RoomView = Omit<Room, "images"> & { images: string[] };
export type HotelView = Omit<Hotel, "images" | "amenities"> & {
  images: string[];
  amenities: string[];
};
export type HotelWithRooms = HotelView & { rooms: RoomView[] };

function toArray(json: string): string[] {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function viewHotel(h: Hotel): HotelView {
  return { ...h, images: toArray(h.images), amenities: toArray(h.amenities) };
}

export function viewRoom(r: Room): RoomView {
  return { ...r, images: toArray(r.images) };
}

export type HotelFilters = {
  city?: string;
  category?: string;
  stars?: number;
  minPrice?: number;
  maxPrice?: number;
  q?: string;
  sort?: "price_asc" | "price_desc" | "rating" | "stars";
  page?: number;
  perPage?: number;
};

// جلب قائمة الفنادق مع الفلاتر والترقيم
export async function getHotels(filters: HotelFilters = {}) {
  const {
    city,
    category,
    stars,
    q,
    sort = "rating",
    page = 1,
    perPage = 12,
  } = filters;

  const where: any = {};
  if (city) where.city = city;
  if (category) where.category = category;
  if (stars) where.stars = stars;
  if (q)
    where.OR = [
      { name: { contains: q } },
      { city: { contains: q } },
      { address: { contains: q } },
    ];

  const orderBy: any =
    sort === "rating"
      ? { rating: "desc" }
      : sort === "stars"
        ? { stars: "desc" }
        : { rating: "desc" };

  const [total, hotelsRaw] = await Promise.all([
    prisma.hotel.count({ where }),
    prisma.hotel.findMany({
      where,
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
      include: { rooms: { orderBy: { price: "asc" }, take: 1 } },
    }),
  ]);

  let hotels = hotelsRaw.map((h) => ({
    ...viewHotel(h),
    minPrice: h.rooms[0]?.price ?? null,
  }));

  // ترتيب بالسعر يتم بعد الجلب لأنه محسوب من أرخص غرفة
  if (sort === "price_asc")
    hotels = hotels.sort((a, b) => (a.minPrice ?? 1e9) - (b.minPrice ?? 1e9));
  if (sort === "price_desc")
    hotels = hotels.sort((a, b) => (b.minPrice ?? 0) - (a.minPrice ?? 0));

  return { hotels, total, page, perPage, pages: Math.ceil(total / perPage) };
}

// فندق واحد بكامل تفاصيله وغرفه
export async function getHotelBySlug(
  slug: string,
): Promise<HotelWithRooms | null> {
  const h = await prisma.hotel.findUnique({
    where: { slug },
    include: { rooms: { orderBy: { price: "asc" } } },
  });
  if (!h) return null;
  return { ...viewHotel(h), rooms: h.rooms.map(viewRoom) };
}

// فنادق مميزة للصفحة الرئيسية حسب التصنيف (مع تصفية اختيارية بالمدينة)
export async function getFeatured(category: string, take = 6, city?: string) {
  const where: any = { category, featured: true };
  if (city) where.city = city;
  const list = await prisma.hotel.findMany({
    where,
    orderBy: { rating: "desc" },
    take,
    include: { rooms: { orderBy: { price: "asc" }, take: 1 } },
  });
  return list.map((h) => ({
    ...viewHotel(h),
    minPrice: h.rooms[0]?.price ?? null,
  }));
}

// كل الفنادق المميزة في مدينة معينة (لأقسام الصفحة الرئيسية)
export async function getCityHotels(city: string, take = 8) {
  const list = await prisma.hotel.findMany({
    where: { city, featured: true },
    orderBy: { rating: "desc" },
    take,
    include: { rooms: { orderBy: { price: "asc" }, take: 1 } },
  });
  return list.map((h) => ({
    ...viewHotel(h),
    minPrice: h.rooms[0]?.price ?? null,
  }));
}

// قائمة المدن المتاحة (لقائمة الفلاتر)
export async function getCities(): Promise<string[]> {
  const rows = await prisma.hotel.findMany({
    distinct: ["city"],
    select: { city: true },
    orderBy: { city: "asc" },
  });
  return rows.map((r) => r.city);
}

export type HotelCardData = HotelView & { minPrice: number | null };
