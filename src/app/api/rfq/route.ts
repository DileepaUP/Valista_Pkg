import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNotificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    industry,
    boxType,
    lengthMm,
    widthMm,
    depthMm,
    quantity,
    artworkUrl,
    contactName,
    companyName,
    email,
    phone,
    notes,
  } = body;

  if (
    !industry ||
    !boxType ||
    !lengthMm ||
    !widthMm ||
    !depthMm ||
    !quantity ||
    !contactName ||
    !companyName ||
    !email ||
    !phone
  ) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const quoteRequest = await prisma.quoteRequest.create({
    data: {
      industry,
      boxType,
      lengthMm: Number(lengthMm),
      widthMm: Number(widthMm),
      depthMm: Number(depthMm),
      quantity: Number(quantity),
      artworkUrl: artworkUrl ?? null,
      contactName,
      companyName,
      email,
      phone,
      notes: notes ?? null,
    },
  });

  const sent = await sendNotificationEmail(
    `New RFQ from ${companyName}`,
    `New quote request received.\n\nCompany: ${companyName}\nContact: ${contactName}\nEmail: ${email}\nPhone: ${phone}\nIndustry: ${industry}\nBox type: ${boxType}\nDimensions (L x W x D): ${lengthMm} x ${widthMm} x ${depthMm} mm\nQuantity: ${quantity}\nNotes: ${notes ?? "-"}`
  );

  if (sent) {
    await prisma.quoteRequest.update({
      where: { id: quoteRequest.id },
      data: { emailSentAt: new Date() },
    });
  }

  return NextResponse.json({ id: quoteRequest.id }, { status: 201 });
}
