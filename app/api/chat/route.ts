import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, tool } from "ai";
import { z } from "zod";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    messages: convertToModelMessages(messages),
    tools: {
      render_html: tool({
        description:
          "Whenever the user asks for HTML code, call this function. The user will see the HTML code rendered in their browser.",
        inputSchema: z.object({
          code: z.string(),
        }),
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
