// إعدادات الموقع العامة — عدّل هذه القيم لتناسب علامتك التجارية
export const SITE = {
  name: "Crystal Moscow",
  nameEn: "Crystal Moscow",
  tagline: "احجز أفضل الفنادق في روسيا بأفضل الأسعار",
  description:
    "منصة حجز فنادق روسيا — فنادق فاخرة واقتصادية في موسكو وسان بطرسبرغ وكازان وسوتشي وغيرها، مع صور حقيقية وأسعار واضحة وحجز فوري.",
  // معلومات التواصل — استبدلها بمعلوماتك الحقيقية
  whatsapp: "+79001234567", // رقم واتساب الرسمي (بصيغة دولية بدون مسافات)
  phone: "+7 900 123 4567",
  email: "info@russiahotels.com",
  address: "موسكو، الاتحاد الروسي",
  // روابط التواصل الاجتماعي
  social: {
    instagram: "https://instagram.com/",
    twitter: "https://x.com/",
    facebook: "https://facebook.com/",
    snapchat: "https://snapchat.com/",
    tiktok: "https://tiktok.com/",
  },
};

// رابط واتساب جاهز برسالة مبدئية
export function whatsappLink(message?: string) {
  const num = SITE.whatsapp.replace(/[^\d]/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${num}${text}`;
}
