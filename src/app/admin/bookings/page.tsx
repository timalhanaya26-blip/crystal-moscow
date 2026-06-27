import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "لوحة الحجوزات",
  robots: { index: false },
};

const statusLabels: Record<string, { t: string; c: string }> = {
  pending: { t: "قيد الانتظار", c: "bg-amber-100 text-amber-700" },
  confirmed: { t: "مؤكد", c: "bg-green-100 text-green-700" },
  cancelled: { t: "ملغى", c: "bg-red-100 text-red-700" },
};

function fmt(d: Date) {
  return new Date(d).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: { hotel: { select: { name: true } }, room: { select: { name: true } } },
    take: 200,
  });

  return (
    <div className="container-app py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">لوحة الحجوزات</h1>
          <p className="mt-1 text-sm text-slate-500">
            إجمالي {bookings.length} حجز
          </p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="card p-12 text-center text-slate-500">
          لا توجد حجوزات بعد.
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="border-b border-slate-100 text-xs text-slate-500">
              <tr>
                <th className="p-4 font-bold">#</th>
                <th className="p-4 font-bold">العميل</th>
                <th className="p-4 font-bold">التواصل</th>
                <th className="p-4 font-bold">الفندق / الغرفة</th>
                <th className="p-4 font-bold">الوصول</th>
                <th className="p-4 font-bold">المغادرة</th>
                <th className="p-4 font-bold">الضيوف</th>
                <th className="p-4 font-bold">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const st = statusLabels[b.status] ?? statusLabels.pending;
                return (
                  <tr
                    key={b.id}
                    className="border-b border-slate-50 hover:bg-slate-50"
                  >
                    <td className="p-4 font-bold text-slate-400">#{b.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900">
                        {b.fullName}
                      </div>
                      {b.notes && (
                        <div className="mt-0.5 text-xs text-slate-400">
                          {b.notes}
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-slate-600">
                      <div>{b.phone}</div>
                      <div className="text-xs text-slate-400">{b.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-800">
                        {b.hotel.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {b.room?.name ?? "—"}
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">{fmt(b.checkIn)}</td>
                    <td className="p-4 text-slate-600">{fmt(b.checkOut)}</td>
                    <td className="p-4 text-slate-600">{b.guests}</td>
                    <td className="p-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${st.c}`}
                      >
                        {st.t}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
