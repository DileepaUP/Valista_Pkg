import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNotificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const contactMessage = await prisma.contactMessage.create({
    data: {
      name,
      email,
      phone: phone ?? null,
      subject,
      message,
    },
  });

  const sent = await sendNotificationEmail(
    `New contact message: ${subject}`,
    `New contact form submission.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone ?? "-"}\n\n${message}`
  );

  if (sent) {
    await prisma.contactMessage.update({
      where: { id: contactMessage.id },
      data: { emailSentAt: new Date() },
    });
  }

  return NextResponse.json({ id: contactMessage.id }, { status: 201 });
}
