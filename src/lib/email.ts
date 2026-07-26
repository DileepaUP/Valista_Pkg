import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!process.env.SMTP_HOST) return null;

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
        : undefined,
    });
  }

  return transporter;
}

export async function sendNotificationEmail(subject: string, text: string) {
  const to = process.env.NOTIFICATION_EMAIL_TO;
  const client = getTransporter();

  if (!client || !to) {
    console.warn(`[email] SMTP not configured — skipping send. Subject: "${subject}"`);
    return false;
  }

  await client.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    text,
  });

  return true;
}
