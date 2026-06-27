import React from "react";
import { notFound } from "next/navigation";
import HotelCard from "@/components/HotelCard";
import { getHotels } from "@/lib/hotels";

const CITIES: Record<string, {
  ar: string; ru: string; desc: string; color: string; heritage: string;
}> = {
  moscow: {
    ar: "موسكو",
    ru: "Москва",
    desc: "العاصمة الروسية — تاريخ إمبراطوري، كرملين وساحة حمراء وأرقى الفنادق العالمية",
    color: "from-brand-800 to-brand-600",
    heritage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Moscow_Kremlin_%288281675670%29.jpg/1600px-Moscow_Kremlin_%288281675670%29.jpg",
  },
  sochi: {
    ar: "سوتشي",
    ru: "Сочи",
    desc: "لؤلؤة البحر الأسود — شمس دافئة، شواطئ ساحرة وجبال قوقاز خلابة على مدار العام",
    color: "from-sky-700 to-cyan-600",
    heritage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/View_on_Sotsji_from_black_sea.jpg/1600px-View_on_Sotsji_from_black_sea.jpg",
  },
  spb: {
    ar: "سانت بطرسبرغ",
    ru: "Санкт-Петербург",
    desc: "مدينة الفنون والقصور — إرميتاج، نيفا، ليالٍ بيضاء وعمارة إمبراطورية لا مثيل لها",
    color: "from-violet-800 to-purple-600",
    heritage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Winter_Palace_Panorama_3.jpg/1600px-Winter_Palace_Panorama_3.jpg",
  },
};

const CAT_META = {
  vip:     { label: "فنادق VIP",          sub: "تجربة إقامة استثنائية بأرقى الخدمات" },
  luxury:  { label: "الفنادق الفاخرة",    sub: "5 نجوم بمعايير عالمية" },
  economy: { label: "الفنادق الاقتصادية", sub: "إقامة مريحة ونظيفة بأسعار في المتناول" },
};

export function generateStaticParams() {
  return Object.keys(CITIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const city = CITIES[params.slug];
  if (!city) return { title: "غير موجود" };
  return {
    title: `فنادق ${city.ar} | روسيا هوتيلز`,
    description: city.desc,
  };
}

export default async function CityPage({ params }: { params: { slug: string } }) {
  const city = CITIES[params.slug];
  if (!city) notFound();

  const [{ hotels: vip }, { hotels: luxury }, { hotels: economy }] = await Promise.all([
    getHotels({ city: city.ar, category: "vip",     perPage: 50 }),
    getHotels({ city: city.ar, category: "luxury",  perPage: 50 }),
    getHotels({ city: city.ar, category: "economy", perPage: 50 }),
  ]);

  const hasVip = vip.length > 0;
  const hasLux = luxury.length > 0;
  const hasEco = economy.length > 0;

  return (
    <>
      {/* Hero with heritage background */}
      <section
        className={`relative overflow-hidden bg-gradient-to-r ${city.color} text-white`}
        style={{ backgroundImage: `url(${city.heritage})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${city.color} opacity-80`} />
        <div className="container-app py-16 relative z-10">
          <p className="text-sm font-medium text-white/70 tracking-widest" dir="ltr">
            {city.ru}
          </p>
          <h1 className="mt-1 text-4xl font-black sm:text-5xl drop-shadow-lg">فنادق {city.ar}</h1>
          <p className="mt-3 max-w-xl text-base text-white/90 drop-shadow">{city.desc}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {hasVip && (
              <a href="#vip" className="btn-gold">فنادق VIP</a>
            )}
            {hasLux && (
              <a href="#luxury" className="btn border-2 border-white/50 bg-white/10 text-white hover:bg-white/20">
                فنادق فاخرة
              </a>
            )}
            {hasEco && (
              <a href="#economy" className="btn border-2 border-white/30 text-white/80 hover:bg-white/10">
                فنادق اقتصادية
              </a>
            )}
          </div>
        </div>
      </section>

      {/* VIP */}
      {hasVip && (
        <HeritagSection id="vip" bg={city.heritage}>
          <SectionHeader label={`${CAT_META.vip.label} في ${city.ar}`} sub={CAT_META.vip.sub} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {vip.map((h) => <HotelCard key={h.id} hotel={h} />)}
          </div>
        </HeritagSection>
      )}

      {/* Luxury */}
      {hasLux && (
        <HeritagSection id="luxury" bg={city.heritage} border={hasVip}>
          <SectionHeader label={`${CAT_META.luxury.label} في ${city.ar}`} sub={CAT_META.luxury.sub} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {luxury.map((h) => <HotelCard key={h.id} hotel={h} />)}
          </div>
        </HeritagSection>
      )}

      {/* Economy */}
      {hasEco && (
        <HeritagSection id="economy" bg={city.heritage} border={hasVip || hasLux}>
          <SectionHeader label={`${CAT_META.economy.label} في ${city.ar}`} sub={CAT_META.economy.sub} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {economy.map((h) => <HotelCard key={h.id} hotel={h} />)}
          </div>
        </HeritagSection>
      )}
    </>
  );
}

// ── مقطع الفنادق مع خلفية التراث الروسي ─────────────────────
function HeritagSection({
  id, bg, border = false, children,
}: {
  id: string;
  bg: string;
  border?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative py-12 ${border ? "border-t border-slate-100" : ""}`}
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundAttachment: "fixed", backgroundPosition: "center" }}
    >
      {/* White overlay so cards stay readable */}
      <div className="absolute inset-0 bg-white/92" />
      <div className="container-app relative z-10">{children}</div>
    </section>
  );
}

function SectionHeader({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-black text-slate-900">{label}</h2>
      <p className="mt-1 text-slate-500 text-sm">{sub}</p>
    </div>
  );
}
