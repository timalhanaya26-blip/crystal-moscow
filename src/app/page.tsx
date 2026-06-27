import Link from "next/link";
import HotelCard from "@/components/HotelCard";
import FaqAccordion from "@/components/FaqAccordion";
import { getFeatured, getCityHotels } from "@/lib/hotels";
import { SITE } from "@/lib/site";
import { FAQ_ITEMS } from "@/lib/faq";

export default async function HomePage() {
  const [moscowVip, moscowLux, moscowEco, sochiHotels, spbHotels] =
    await Promise.all([
      getFeatured("vip", 8, "موسكو"),
      getFeatured("luxury", 8, "موسكو"),
      getFeatured("economy", 6, "موسكو"),
      getCityHotels("سوتشي", 8),
      getCityHotels("سانت بطرسبرغ", 8),
    ]);

  return (
    <>
      {/* الواجهة الرئيسية */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-brand-700 via-brand-600 to-brand-800 text-white">
        <div className="container-app relative py-20 sm:py-28">
          <div className="max-w-2xl">
            <span className="chip bg-white/15 text-white">
              ✦ فنادق في موسكو، سوتشي، وسانت بطرسبرغ
            </span>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              {SITE.tagline}
            </h1>
            <p className="mt-4 text-lg text-brand-100">
              فنادق VIP وفاخرة واقتصادية، أسعار بالروبل وما يعادله بالريال السعودي،
              حجز فوري مع دعم عبر واتساب.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/hotels?category=vip" className="btn-gold">فنادق VIP</Link>
              <Link href="/cities/sochi" className="btn border-2 border-white/40 text-white hover:bg-white/10">
                فنادق سوتشي
              </Link>
              <Link href="/cities/spb" className="btn border-2 border-white/30 text-white/80 hover:bg-white/10">
                سانت بطرسبرغ
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-gold-400/20 blur-2xl" />
      </section>

      {/* مزايا */}
      <section className="container-app -mt-10 relative z-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { t: "أسعار بالروبل والريال", d: "كل سعر معروض بالروبل مع ما يعادله بالريال السعودي تلقائياً." },
            { t: "حجز فوري مؤكد", d: "نموذج حجز مباشر مرتبط بقاعدة البيانات مع تأكيد فوري." },
            { t: "دعم عبر واتساب", d: "أرسل تفاصيل حجزك بنقرة واحدة عبر واتساب." },
          ].map((f) => (
            <div key={f.t} className="card p-5">
              <h3 className="font-extrabold text-slate-900">{f.t}</h3>
              <p className="mt-1 text-sm text-slate-500">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── موسكو ───────────────────────────── */}
      <CityBanner
        city="موسكو"
        cityRu="Москва"
        desc="العاصمة الروسية — تاريخ إمبراطوري، كرملين وساحة حمراء وأرقى الفنادق العالمية"
        href="/cities/moscow"
        color="from-brand-800 to-brand-600"
      />

      <Section
        title="فنادق VIP في موسكو"
        subtitle="تجربة إقامة استثنائية بأرقى الخدمات في العاصمة الروسية"
        href="/cities/moscow#vip"
        hotels={moscowVip}
      />

      <Section
        title="الفنادق الفاخرة في موسكو"
        subtitle="5 نجوم بمعايير عالمية في قلب موسكو"
        href="/cities/moscow#luxury"
        hotels={moscowLux}
      />

      <Section
        title="الفنادق الاقتصادية في موسكو"
        subtitle="إقامة مريحة ونظيفة بأسعار في المتناول"
        href="/cities/moscow#economy"
        hotels={moscowEco}
      />

      {/* ─── سوتشي ───────────────────────────── */}
      <CityBanner
        city="سوتشي"
        cityRu="Сочи"
        desc="لؤلؤة البحر الأسود — شمس دافئة، شواطئ ساحرة وجبال قوقاز خلابة على مدار العام"
        href="/cities/sochi"
        color="from-sky-700 to-cyan-600"
      />

      <Section
        title="فنادق سوتشي"
        subtitle="شاطئ البحر الأسود ومنتجعات جبال قوقاز"
        href="/cities/sochi"
        hotels={sochiHotels}
      />

      {/* ─── سانت بطرسبرغ ────────────────────── */}
      <CityBanner
        city="سانت بطرسبرغ"
        cityRu="Санкт-Петербург"
        desc="مدينة الفنون والقصور — إرميتاج، نيفا، ليالٍ بيضاء وعمارة إمبراطورية لا مثيل لها"
        href="/cities/spb"
        color="from-violet-800 to-purple-600"
      />

      <Section
        title="فنادق سانت بطرسبرغ"
        subtitle="أفخم الإقامات في مدينة الفنون الروسية"
        href="/cities/spb"
        hotels={spbHotels}
      />

      {/* الأسئلة الشائعة */}
      <section className="container-app py-14">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">الأسئلة الشائعة</h2>
            <p className="mt-2 text-slate-500">إجابات سريعة لأكثر ما يسأل عنه عملاؤنا</p>
          </div>
          <FaqAccordion items={FAQ_ITEMS.slice(0, 5)} />
          <div className="mt-6 text-center">
            <Link href="/faq" className="btn-outline">كل الأسئلة</Link>
          </div>
        </div>
      </section>
    </>
  );
}

// ── شريط المدينة ─────────────────────────────────────────────
function CityBanner({
  city, cityRu, desc, href, color,
}: {
  city: string;
  cityRu: string;
  desc: string;
  href: string;
  color: string;
}) {
  return (
    <section className={`bg-gradient-to-r ${color} text-white`}>
      <div className="container-app flex items-center justify-between gap-4 py-6">
        <div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl font-black">{city}</h2>
            <span className="text-sm font-medium text-white/60 tracking-widest" dir="ltr">
              {cityRu}
            </span>
          </div>
          <p className="mt-1 max-w-xl text-sm text-white/80">{desc}</p>
        </div>
        <Link
          href={href}
          className="hidden shrink-0 rounded-xl border-2 border-white/40 px-5 py-2 text-sm font-bold text-white hover:bg-white/10 sm:block"
        >
          عرض الكل ←
        </Link>
      </div>
    </section>
  );
}

// ── قسم الفنادق ──────────────────────────────────────────────
function Section({
  title, subtitle, href, hotels,
}: {
  title: string;
  subtitle: string;
  href: string;
  hotels: Awaited<ReturnType<typeof getFeatured>>;
}) {
  if (!hotels.length) return null;
  return (
    <section className="container-app py-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 sm:text-2xl">{title}</h2>
          <p className="mt-1 text-slate-500 text-sm">{subtitle}</p>
        </div>
        <Link href={href} className="hidden shrink-0 text-sm font-bold text-brand-700 hover:underline sm:block">
          عرض الكل ←
        </Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {hotels.map((h) => (
          <HotelCard key={h.id} hotel={h} />
        ))}
      </div>
    </section>
  );
}
