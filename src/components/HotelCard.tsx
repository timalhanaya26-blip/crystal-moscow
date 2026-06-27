import Image from "next/image";
import Link from "next/link";
import StarRating from "./StarRating";
import type { HotelCardData } from "@/lib/hotels";
import { fmtRUB, fmtSAR, rubToSar } from "@/lib/currency";

const CATEGORY_LABELS: Record<string, string> = {
  vip: "VIP ★ فاخر",
  luxury: "فاخر",
  economy: "اقتصادي",
};

const CATEGORY_CLASSES: Record<string, string> = {
  vip: "bg-gold-500 text-white",
  luxury: "bg-brand-600 text-white",
  economy: "bg-slate-700 text-white",
};

export default function HotelCard({ hotel }: { hotel: HotelCardData }) {
  const label = CATEGORY_LABELS[hotel.category] ?? hotel.category;
  const chipClass = CATEGORY_CLASSES[hotel.category] ?? "bg-slate-600 text-white";

  return (
    <Link
      href={`/hotels/${hotel.slug}`}
      className="card group overflow-hidden transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={hotel.mainImage}
          alt={hotel.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold shadow ${chipClass}`}>
          {label}
        </span>
        {hotel.rating > 0 && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-brand-600 px-2.5 py-1 text-xs font-bold text-white shadow">
            ★ {hotel.rating.toFixed(1)}
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="mb-1 flex items-center justify-between gap-2">
          <StarRating value={hotel.stars} />
          <span className="text-xs text-slate-400">{hotel.reviews} تقييم</span>
        </div>
        <h3 className="line-clamp-1 text-base font-extrabold text-slate-900">
          {hotel.name}
        </h3>
        {hotel.nameRu && (
          <p className="line-clamp-1 text-xs text-slate-400 tracking-wide" dir="ltr">
            {hotel.nameRu}
          </p>
        )}
        <p className="mt-1 line-clamp-1 text-sm text-slate-500">
          <span className="text-brand-600">◆</span> {hotel.city} — {hotel.address}
        </p>

        <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-3">
          {hotel.minPrice != null ? (
            <div>
              <span className="text-xs text-slate-400">تبدأ من</span>
              <div className="text-lg font-black text-slate-800">
                {fmtRUB(hotel.minPrice)}
                <span className="text-xs font-normal text-slate-400"> / الليلة</span>
              </div>
              <div className="text-xs font-semibold text-brand-600">
                ≈ {fmtSAR(rubToSar(hotel.minPrice))}
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-400">—</div>
          )}
          <span className="btn-outline px-4 py-2 text-xs">عرض التفاصيل</span>
        </div>
      </div>
    </Link>
  );
}
