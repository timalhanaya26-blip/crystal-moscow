"use client";

import { useMemo, useState } from "react";
import { whatsappLink } from "@/lib/site";
import { fmtRUB, fmtSAR, rubToSar } from "@/lib/currency";

type RoomOption = { id: number; name: string; price: number };

export default function BookingForm({
  hotelId,
  hotelName,
  rooms,
}: {
  hotelId: number;
  hotelName: string;
  rooms: RoomOption[];
}) {
  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    roomId: rooms[0]?.id ?? 0,
    checkIn: today,
    checkOut: "",
    guests: 2,
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [bookingId, setBookingId] = useState<number | null>(null);

  const selectedRoom = useMemo(
    () => rooms.find((r) => r.id === Number(form.roomId)),
    [rooms, form.roomId],
  );

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0;
    const d =
      (new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) /
      86400000;
    return d > 0 ? Math.round(d) : 0;
  }, [form.checkIn, form.checkOut]);

  const totalRUB = selectedRoom ? selectedRoom.price * nights : 0;
  const totalSAR = rubToSar(totalRUB);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (nights <= 0) {
      setError("الرجاء اختيار تاريخ مغادرة بعد تاريخ الوصول.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, hotelId, roomId: Number(form.roomId) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "تعذّر إتمام الحجز");
      setBookingId(data.id);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    }
  }

  if (status === "done") {
    const msg = `مرحباً، أكدت حجزاً جديداً (#${bookingId}) في ${hotelName}.
الغرفة: ${selectedRoom?.name ?? "-"}
الوصول: ${form.checkIn} — المغادرة: ${form.checkOut}
الضيوف: ${form.guests}
الإجمالي: ${fmtRUB(totalRUB)} (≈ ${fmtSAR(totalSAR)})`;

    return (
      <div className="card p-6 text-center">
        <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-green-100 text-green-600">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-xl font-extrabold text-slate-900">تم استلام طلب حجزك!</h3>
        <p className="mt-2 text-sm text-slate-600">
          رقم الحجز <span className="font-bold">#{bookingId}</span>. سنتواصل معك قريباً لتأكيد التفاصيل.
        </p>
        <a
          href={whatsappLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp mt-5 w-full"
        >
          إرسال تفاصيل الحجز عبر واتساب
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card p-6">
      <h3 className="mb-1 text-xl font-extrabold text-slate-900">احجز الآن</h3>
      <p className="mb-5 text-sm text-slate-500">أدخل بياناتك وسنؤكد الحجز في أسرع وقت.</p>

      <div className="space-y-3">
        <div>
          <label className="label">الاسم الكامل</label>
          <input
            required
            className="field"
            value={form.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            placeholder="مثال: محمد العتيبي"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="label">البريد الإلكتروني</label>
            <input
              required
              type="email"
              className="field"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="name@email.com"
            />
          </div>
          <div>
            <label className="label">رقم الجوال</label>
            <input
              required
              className="field"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+966 5x xxx xxxx"
            />
          </div>
        </div>

        {rooms.length > 0 && (
          <div>
            <label className="label">نوع الغرفة</label>
            <select
              className="field"
              value={form.roomId}
              onChange={(e) => set("roomId", Number(e.target.value))}
            >
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} — {fmtRUB(r.price)} / الليلة
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="label">تاريخ الوصول</label>
            <input
              required
              type="date"
              min={today}
              className="field"
              value={form.checkIn}
              onChange={(e) => set("checkIn", e.target.value)}
            />
          </div>
          <div>
            <label className="label">تاريخ المغادرة</label>
            <input
              required
              type="date"
              min={form.checkIn || today}
              className="field"
              value={form.checkOut}
              onChange={(e) => set("checkOut", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="label">عدد الضيوف</label>
          <input
            type="number"
            min={1}
            max={20}
            className="field"
            value={form.guests}
            onChange={(e) => set("guests", Number(e.target.value))}
          />
        </div>

        <div>
          <label className="label">ملاحظات (اختياري)</label>
          <textarea
            className="field min-h-[80px]"
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="أي طلبات خاصة..."
          />
        </div>
      </div>

      {nights > 0 && selectedRoom && (
        <div className="mt-4 rounded-xl bg-brand-50 p-4 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>
              {fmtRUB(selectedRoom.price)} × {nights} ليلة
            </span>
            <span className="font-bold text-slate-800">{fmtRUB(totalRUB)}</span>
          </div>
          <div className="mt-1 flex justify-between border-t border-brand-100 pt-2">
            <span className="text-slate-500">الإجمالي بالريال السعودي (تقريبي)</span>
            <span className="text-lg font-black text-brand-700">{fmtSAR(totalSAR)}</span>
          </div>
          <p className="mt-1 text-right text-xs text-slate-400">
            سعر الصرف تقريبي: 1 ﷼ ≈ 24 ₽
          </p>
        </div>
      )}

      {error && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary mt-5 w-full disabled:opacity-60"
      >
        {status === "loading" ? "جارٍ الإرسال..." : "تأكيد الحجز"}
      </button>
    </form>
  );
}
