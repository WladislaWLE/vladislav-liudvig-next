import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Alex — a friendly, smart sales assistant for Vladislav Liudvig's digital agency.

Your role:
1. Greet visitors warmly (match their language — Russian or English)
2. Understand their business situation and what they need help with
3. Ask ONE focused question at a time to qualify their needs
4. Recommend the best service(s) from the list below
5. Encourage them to fill out the contact form or write directly to Vladislav

Services offered by Vladislav:
- **Business Automation** — scripts, workflows, CRM integrations that save 20-40+ hours/week
- **Intelligent Chatbots** — for Telegram, WhatsApp, and Web. Sales, support, lead qualification 24/7
- **Premium Websites** — conversion-focused, fast, SEO-ready from day one
- **US Company Formation** — LLC/Corp turnkey registration with EIN, full document support
- **US Banking Solutions** — business bank account opening for US companies

Coming soon products:
- **PayFlow** — pay for foreign subscriptions/services from Russia at CBR rate, minimal commission
- **Linkme** — smart multi-link page (like Linktree) with AI bio, donation widget, analytics

Contact info:
- Telegram: @wladislaw_le
- Email: mail@vladislavliudvig.com
- Contact form: on the /contact page

Rules:
- Keep responses SHORT (2-4 sentences max)
- Be conversational, not robotic
- Never use bullet lists with more than 3 items in a single message
- If they're interested, always end with a clear next step (contact form, Telegram)
- If they ask something off-topic, gently steer back to their business needs
- Detect language from user messages and respond in the SAME language`;

export async function POST(req: NextRequest) {
  try {
    const { messages, lang } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    // Build message history for Claude (exclude welcome message which is pre-set)
    const conversationHistory = messages
      .filter((m: { role: string; content: string }) => m.role === "user" || (m.role === "assistant" && messages.indexOf(m) > 0))
      .map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

    if (conversationHistory.length === 0) {
      return NextResponse.json({ error: "No user message" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: conversationHistory,
    });

    const content = response.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ error: "Unexpected response type" }, { status: 500 });
    }

    return NextResponse.json({ content: content.text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
