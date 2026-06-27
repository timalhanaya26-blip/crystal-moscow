import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import { FAQ_ITEMS } from "@/lib/faq";
import { whatsappLink } from "@/lib/site";

export const metadata = {
  title: "الأسئلة الشائعة",
  description: "إجابات على أكثر الأسئلة شيوعاً حول الحجز والدفع والإلغاء.",
};

export default function FaqPage() {
  return (
    <div className="container-app py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
            الأسئلة الشائعة
          </h1>
          <p className="mt-2 text-slate-500">
            كل ما تحتاج معرفته قبل إتمام حجزك
          </p>
        </div>

        <FaqAccordion items={FAQ_ITEMS} />

        <div className="card mt-10 bg-brand-600 p-8 text-center text-white">
          <h2 className="text-xl font-extrabold">لم تجد إجابتك؟</h2>
          <p className="mt-2 text-brand-100">
            فريق الدعم جاهز لمساعدتك في أي وقت
          </p>
          <a
            href={whatsappLink("مرحباً، لدي سؤال لم أجد إجابته في الأسئلة الشائعة")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-5"
          >
            تواصل عبر واتساب
          </a>
        </div>

        <div className="mt-6 text-center">
          <Link href="/hotels" className="text-sm font-bold text-brand-700 hover:underline">
            تصفّح الفنادق ←
          </Link>
        </div>
      </div>
    </div>
  );
}
