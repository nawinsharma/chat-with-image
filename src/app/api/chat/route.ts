import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const prompt = formData.get("prompt") as string;
    const imageFile = formData.get("image") as File;
    
    if (!imageFile || !prompt) {
      return NextResponse.json(
        { error: "Image and prompt are required" },
        { status: 400 }
      );
    }
    const imageBuffer = await imageFile.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString("base64");
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const image = {
      inlineData: {
        data: imageBase64,
        mimeType: imageFile.type,
      },
    };
    
    const result = await model.generateContent([prompt, image]);
    const response = result.response.text();
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    );
  }
}