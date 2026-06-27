import { PrismaClient } from "@prisma/client";

// عميل Prisma واحد يُعاد استخدامه (يمنع إنشاء اتصالات متعددة أثناء التطوير)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
