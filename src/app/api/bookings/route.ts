import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// إنشاء حجز جديد
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      hotelId,
      roomId,
      fullName,
      email,
      phone,
      checkIn,
      checkOut,
      guests,
      notes,
    } = body;

    // تحقق أساسي من المدخلات
    if (!hotelId || !fullName || !email || !phone || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: "الرجاء تعبئة جميع الحقول المطلوبة." },
        { status: 400 },
      );
    }

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    if (isNaN(inDate.getTime()) || isNaN(outDate.getTime()) || outDate <= inDate) {
      return NextResponse.json(
        { error: "تواريخ الحجز غير صحيحة." },
        { status: 400 },
      );
    }

    // التأكد أن الفندق موجود
    const hotel = await prisma.hotel.findUnique({ where: { id: Number(hotelId) } });
    if (!hotel) {
      return NextResponse.json({ error: "الفندق غير موجود." }, { status: 404 });
    }

    const booking = await prisma.booking.create({
      data: {
        hotelId: Number(hotelId),
        roomId: roomId ? Number(roomId) : null,
        fullName: String(fullName).trim(),
        email: String(email).trim(),
        phone: String(phone).trim(),
        checkIn: inDate,
        checkOut: outDate,
        guests: Number(guests) || 1,
        notes: notes ? String(notes).trim() : null,
      },
    });

    return NextResponse.json({ id: booking.id, status: booking.status });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json(
      { error: "حدث خطأ في الخادم. حاول مرة أخرى." },
      { status: 500 },
    );
  }
}
