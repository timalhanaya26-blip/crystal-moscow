import Link from "next/link";
import { SITE, whatsappLink } from "@/lib/site";

const social = [
  { key: "instagram", label: "إنستغرام", href: SITE.social.instagram },
  { key: "twitter", label: "إكس (تويتر)", href: SITE.social.twitter },
  { key: "facebook", label: "فيسبوك", href: SITE.social.facebook },
  { key: "snapchat", label: "سناب شات", href: SITE.social.snapchat },
  { key: "tiktok", label: "تيك توك", href: SITE.social.tiktok },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="container-app grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-lg font-black text-white">
              ر
            </span>
            <span className="text-lg font-extrabold text-white">
              {SITE.name}
            </span>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            {SITE.description}
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">روابط سريعة</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/hotels" className="hover:text-white">
                كل الفنادق
              </Link>
            </li>
            <li>
              <Link href="/hotels?category=luxury" className="hover:text-white">
                فنادق فاخرة
              </Link>
            </li>
            <li>
              <Link
                href="/hotels?category=economy"
                className="hover:text-white"
              >
                فنادق اقتصادية
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                من نحن
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white">
                الأسئلة الشائعة
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">تواصل معنا</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`tel:${SITE.phone}`} className="hover:text-white">
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink("مرحباً، لدي استفسار عن الحجز")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                واتساب
              </a>
            </li>
            <li className="text-slate-400">{SITE.address}</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">
            وسائل التواصل
          </h3>
          <ul className="space-y-2 text-sm">
            {social.map((s) => (
              <li key={s.key}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-5">
        <div className="container-app flex flex-col items-center justify-between gap-2 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. جميع الحقوق محفوظة.
          </p>
          <p>صُمّم بعناية لتجربة حجز سريعة وسهلة.</p>
        </div>
      </div>
    </footer>
  );
}
