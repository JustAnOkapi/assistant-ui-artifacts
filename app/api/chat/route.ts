import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
