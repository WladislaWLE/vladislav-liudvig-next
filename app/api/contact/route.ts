import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { neon } from "@neondatabase/serverless";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  message: z.string().min(5).max(5000),
});

async function sendTelegramNotification(name: string, email: string, message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text = `🔔 *Новая заявка с сайта*\n\n👤 *Имя:* ${name}\n📧 *Email:* ${email}\n\n💬 *Сообщение:*\n${message.slice(0, 800)}${message.length > 800 ? "..." : ""}`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = schema.parse(body);

    // Save to database if DATABASE_URL is set
    if (process.env.DATABASE_URL) {
      try {
        const sql = neon(process.env.DATABASE_URL);
        await sql`
          CREATE TABLE IF NOT EXISTS contact_messages (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW()
          )
        `;
        await sql`
          INSERT INTO contact_messages (name, email, message)
          VALUES (${name}, ${email}, ${message})
        `;
      } catch (dbError) {
        console.error("DB error (non-fatal):", dbError);
      }
    }

    // Telegram notification (non-blocking)
    sendTelegramNotification(name, email, message).catch(console.error);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 });
    }
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
