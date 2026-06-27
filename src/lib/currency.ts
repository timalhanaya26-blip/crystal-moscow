// سعر الصرف التقريبي: 1 روبل = 0.042 ريال سعودي (1 ريال ≈ 24 روبل)
export const RUB_TO_SAR = 0.042;

export function rubToSar(rub: number): number {
  return Math.round(rub * RUB_TO_SAR);
}

export function fmtRUB(n: number): string {
  return `₽ ${n.toLocaleString("ar-EG")}`;
}

export function fmtSAR(n: number): string {
  return `${n.toLocaleString("ar-EG")} ﷼`;
}
