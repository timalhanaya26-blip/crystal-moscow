"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/", label: "الرئيسية" },
  { href: "/cities/moscow", label: "موسكو" },
  { href: "/cities/sochi", label: "سوتشي" },
  { href: "/cities/spb", label: "سانت بطرسبرغ" },
  { href: "/hotels", label: "كل الفنادق" },
  { href: "/about", label: "من نحن" },
  { href: "/faq", label: "الأسئلة الشائعة" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="container-app flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Russia Hotels Logo"
            width={44}
            height={44}
            className="rounded-lg"
            priority
          />
          <span className="text-lg font-extrabold text-slate-900">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/hotels" className="btn-primary">
            احجز الآن
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 lg:hidden"
          aria-label="القائمة"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white lg:hidden">
          <div className="container-app flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-brand-50"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/hotels"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              احجز الآن
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
