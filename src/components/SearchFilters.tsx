"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchFilters({ cities }: { cities: string[] }) {
  const router = useRouter();
  const params = useSearchParams();

  const [q, setQ] = useState(params.get("q") ?? "");

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    router.push(`/hotels?${next.toString()}`);
  }

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    update("q", q);
  }

  return (
    <div className="card p-4">
      <form onSubmit={submitSearch} className="mb-4 flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ابحث باسم الفندق أو المدينة..."
          className="field"
        />
        <button type="submit" className="btn-primary px-5">بحث</button>
      </form>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="label">المدينة</label>
          <select
            className="field"
            value={params.get("city") ?? ""}
            onChange={(e) => update("city", e.target.value)}
          >
            <option value="">كل المدن</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">التصنيف</label>
          <select
            className="field"
            value={params.get("category") ?? ""}
            onChange={(e) => update("category", e.target.value)}
          >
            <option value="">الكل</option>
            <option value="vip">VIP فاخر ★★★★★</option>
            <option value="luxury">فاخر ★★★★★</option>
            <option value="economy">اقتصادي ★★★★</option>
          </select>
        </div>

        <div>
          <label className="label">النجوم</label>
          <select
            className="field"
            value={params.get("stars") ?? ""}
            onChange={(e) => update("stars", e.target.value)}
          >
            <option value="">أي تقييم</option>
            <option value="5">5 نجوم</option>
            <option value="4">4 نجوم</option>
          </select>
        </div>

        <div>
          <label className="label">الترتيب</label>
          <select
            className="field"
            value={params.get("sort") ?? "rating"}
            onChange={(e) => update("sort", e.target.value)}
          >
            <option value="rating">الأعلى تقييماً</option>
            <option value="price_asc">السعر: من الأقل</option>
            <option value="price_desc">السعر: من الأعلى</option>
            <option value="stars">عدد النجوم</option>
          </select>
        </div>
      </div>
    </div>
  );
}
