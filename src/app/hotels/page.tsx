import Link from "next/link";
import HotelCard from "@/components/HotelCard";
import SearchFilters from "@/components/SearchFilters";
import { getHotels, getCities } from "@/lib/hotels";

export const metadata = {
  title: "كل الفنادق",
  description: "تصفّح جميع الفنادق في موسكو وسوتشي مع الفلاتر والأسعار بالروبل والريال.",
};

const HEADING: Record<string, string> = {
  vip: "فنادق VIP الفاخرة",
  luxury: "الفنادق الفاخرة",
  economy: "الفنادق الاقتصادية",
};

type SP = Record<string, string | undefined>;

export default async function HotelsPage({ searchParams }: { searchParams: SP }) {
  const page = Number(searchParams.page) || 1;
  const filters = {
    city: searchParams.city,
    category: searchParams.category,
    stars: searchParams.stars ? Number(searchParams.stars) : undefined,
    q: searchParams.q,
    sort: searchParams.sort as any,
    page,
    perPage: 12,
  };

  const [{ hotels, total, pages }, cities] = await Promise.all([
    getHotels(filters),
    getCities(),
  ]);

  function pageLink(p: number) {
    const sp = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v && k !== "page") sp.set(k, v);
    });
    sp.set("page", String(p));
    return `/hotels?${sp.toString()}`;
  }

  const heading = HEADING[filters.category ?? ""] ?? "كل الفنادق";

  return (
    <div className="container-app py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900">{heading}</h1>
        <p className="mt-1 text-slate-500">{total} فندق متاح — الأسعار بالروبل الروسي (₽)</p>
      </div>

      <SearchFilters cities={cities} />

      {hotels.length === 0 ? (
        <div className="card mt-8 p-12 text-center">
          <p className="text-lg font-bold text-slate-700">لا توجد فنادق مطابقة لبحثك</p>
          <p className="mt-2 text-sm text-slate-500">جرّب تعديل الفلاتر أو إزالة بعض الشروط.</p>
          <Link href="/hotels" className="btn-outline mt-5">إعادة ضبط</Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {hotels.map((h) => (
            <HotelCard key={h.id} hotel={h} />
          ))}
        </div>
      )}

      {pages > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {page > 1 && (
            <Link href={pageLink(page - 1)} className="btn-outline px-4 py-2">السابق</Link>
          )}
          {Array.from({ length: pages }).map((_, i) => {
            const p = i + 1;
            if (p !== 1 && p !== pages && Math.abs(p - page) > 2)
              return p === 2 || p === pages - 1 ? (
                <span key={p} className="px-1 text-slate-400">…</span>
              ) : null;
            return (
              <Link
                key={p}
                href={pageLink(p)}
                className={`grid h-10 min-w-10 place-items-center rounded-lg px-3 text-sm font-bold transition ${
                  p === page
                    ? "bg-brand-600 text-white"
                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-brand-50"
                }`}
              >
                {p}
              </Link>
            );
          })}
          {page < pages && (
            <Link href={pageLink(page + 1)} className="btn-outline px-4 py-2">التالي</Link>
          )}
        </div>
      )}
    </div>
  );
}
