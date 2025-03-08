import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();


const apiKey: string | undefined = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY is not defined in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt: string = "What do you think about it? Explain in 200 words.";

const image = {
  inlineData: {
    data: fs.readFileSync("cookie.png").toString("base64"),
    mimeType: "image/png",
  },
};

async function generateResponse() {
  try {
    const result = await model.generateContent([prompt, image]);
    console.log(result.response.text());
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

generateResponse();
