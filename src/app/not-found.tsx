import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-app grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <div className="text-7xl font-black text-brand-600">404</div>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">
          الصفحة غير موجودة
        </h1>
        <p className="mt-2 text-slate-500">
          ربما تم نقل الصفحة أو لم تعد متاحة.
        </p>
        <Link href="/" className="btn-primary mt-6">
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
