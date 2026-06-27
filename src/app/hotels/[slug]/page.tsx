import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import BookingForm from "@/components/BookingForm";
import StarRating from "@/components/StarRating";
import { getHotelBySlug } from "@/lib/hotels";
import { fmtRUB, fmtSAR, rubToSar } from "@/lib/currency";

const CATEGORY_LABELS: Record<string, string> = {
  vip: "VIP فاخر ★★★★★",
  luxury: "فاخر ★★★★★",
  economy: "اقتصادي ★★★★",
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const hotel = await getHotelBySlug(params.slug);
  if (!hotel) return { title: "فندق غير موجود" };
  return {
    title: hotel.name,
    description: `${hotel.name} في ${hotel.city} — ${hotel.description.slice(0, 140)}`,
  };
}

export default async function HotelPage({ params }: { params: { slug: string } }) {
  const hotel = await getHotelBySlug(params.slug);
  if (!hotel) notFound();

  const rooms = hotel.rooms.map((r) => ({ id: r.id, name: r.name, price: r.price }));
  const catLabel = CATEGORY_LABELS[hotel.category] ?? hotel.category;

  return (
    <div className="container-app py-8">
      {/* مسار التنقل */}
      <nav className="mb-5 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand-700">الرئيسية</Link>{" "}
        <span className="text-slate-300">/</span>{" "}
        <Link href="/hotels" className="hover:text-brand-700">الفنادق</Link>{" "}
        <span className="text-slate-300">/</span>{" "}
        <span className="text-slate-700">{hotel.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* العمود الأيمن: المحتوى */}
        <div className="lg:col-span-2">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className={`chip ${hotel.category === "vip" ? "bg-gold-100 text-gold-600" : ""}`}>
              {catLabel}
            </span>
            <StarRating value={hotel.stars} />
            {hotel.rating > 0 && (
              <span className="flex items-center gap-1 text-sm font-bold text-brand-700">
                ★ {hotel.rating.toFixed(1)}{" "}
                <span className="font-normal text-slate-400">({hotel.reviews} تقييم)</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl font-black text-slate-900">{hotel.name}</h1>
          {hotel.nameRu && (
            <p className="mt-0.5 text-base font-medium text-slate-400 tracking-wide" dir="ltr">
              {hotel.nameRu}
            </p>
          )}
          <p className="mt-1 text-slate-500">
            <span className="text-brand-600">◆</span> {hotel.city} — {hotel.address}
          </p>

          <div className="mt-6">
            <Gallery images={hotel.images} alt={hotel.name} />
          </div>

          {/* الوصف */}
          <section className="mt-8">
            <h2 className="mb-3 text-xl font-extrabold text-slate-900">نبذة عن الفندق</h2>
            <p className="leading-8 text-slate-600">{hotel.description}</p>
          </section>

          {/* المرافق */}
          {hotel.amenities.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-3 text-xl font-extrabold text-slate-900">المرافق والخدمات</h2>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map((a) => (
                  <span
                    key={a}
                    className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200"
                  >
                    ✓ {a}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* الغرف */}
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-extrabold text-slate-900">الغرف المتاحة</h2>
            <div className="space-y-4">
              {hotel.rooms.map((room) => (
                <div key={room.id} className="card flex flex-col gap-4 p-4 sm:flex-row">
                  <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl sm:w-56">
                    <Image
                      src={room.images[0] ?? hotel.mainImage ?? "https://picsum.photos/seed/room/600/400"}
                      alt={room.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 224px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3 className="text-lg font-extrabold text-slate-900">{room.name}</h3>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600">
                      <span>📐 {room.area} م²</span>
                      <span>👥 حتى {room.capacity} أشخاص</span>
                      {room.beds && <span>🛏️ {room.beds}</span>}
                    </div>
                    <div className="mt-auto flex items-end justify-between pt-3">
                      <div>
                        <div className="text-xl font-black text-slate-800">
                          {fmtRUB(room.price)}
                          <span className="text-xs font-normal text-slate-400"> / الليلة</span>
                        </div>
                        <div className="text-sm font-semibold text-brand-600">
                          ≈ {fmtSAR(rubToSar(room.price))} / الليلة
                        </div>
                      </div>
                      <a href="#booking" className="btn-primary px-5 py-2 text-sm">
                        احجز هذه الغرفة
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* العمود الأيسر: نموذج الحجز الثابت */}
        <div id="booking" className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <BookingForm hotelId={hotel.id} hotelName={hotel.name} rooms={rooms} />
          </div>
        </div>
      </div>
    </div>
  );
}
