import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "من نحن",
  description: `تعرّف على ${SITE.name} ورسالتنا في تسهيل حجز الفنادق في روسيا.`,
};

const stats = [
  { n: "+100", l: "فندق" },
  { n: "+10", l: "مدن روسية" },
  { n: "24/7", l: "دعم العملاء" },
  { n: "+5000", l: "حجز ناجح" },
];

const values = [
  {
    t: "الشفافية",
    d: "أسعار واضحة وصور حقيقية لكل غرفة، بلا مفاجآت أو رسوم خفية.",
  },
  {
    t: "السرعة",
    d: "منصة سريعة التحميل وتجربة حجز تكتمل في دقائق معدودة.",
  },
  {
    t: "الدعم",
    d: "فريق يتحدث العربية جاهز لمساعدتك عبر واتساب في أي وقت.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-bl from-brand-700 to-brand-800 py-16 text-white">
        <div className="container-app">
          <h1 className="text-4xl font-black">من نحن</h1>
          <p className="mt-3 max-w-2xl text-lg text-brand-100">
            {SITE.name} منصة عربية متخصصة في حجز الفنادق داخل روسيا، نجمع لك أفضل
            الخيارات الفاخرة والاقتصادية في مكان واحد.
          </p>
        </div>
      </section>

      <section className="container-app -mt-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="card p-5 text-center">
              <div className="text-2xl font-black text-brand-700">{s.n}</div>
              <div className="mt-1 text-sm text-slate-500">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-app py-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black text-slate-900">رسالتنا</h2>
            <p className="mt-4 leading-8 text-slate-600">
              نؤمن أن حجز فندق يجب أن يكون تجربة بسيطة وموثوقة. لذلك بنينا منصة
              تعرض الفنادق بصور حقيقية وتفاصيل دقيقة لكل غرفة — من المساحة إلى
              السعر — مع إمكانية الحجز الفوري والتواصل المباشر عبر واتساب.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              سواء كنت تبحث عن إقامة فاخرة في قلب موسكو أو خيار اقتصادي مريح، نوفّر
              لك ما يناسب ميزانيتك وذوقك.
            </p>
            <Link href="/hotels" className="btn-primary mt-6">
              ابدأ الحجز الآن
            </Link>
          </div>
          <div className="grid gap-4">
            {values.map((v) => (
              <div key={v.t} className="card p-5">
                <h3 className="font-extrabold text-brand-700">{v.t}</h3>
                <p className="mt-1 text-sm leading-7 text-slate-600">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
