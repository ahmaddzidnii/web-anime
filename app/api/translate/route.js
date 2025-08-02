import { NextResponse } from "next/server";
import { translate } from "@vitalets/google-translate-api";
import { tryCatch } from "@/utils/catchexception";
// import { HttpProxyAgent } from "http-proxy-agent";

export async function POST(request) {
  const [body, err] = await tryCatch(request.json());
  if (err) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
  const { text, to } = body;

  // const agent = new HttpProxyAgent("http://123.141.181.7:5031");

  const { text: translatedText } = await translate(text, {
    to: to || "id",
    // fetchOptions: {
    //   agent,
    // },
  });

  return NextResponse.json({
    originalText: text,
    translatedText,
  });
}
