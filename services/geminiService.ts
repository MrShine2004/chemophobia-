
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchElementFacts = async (elementName: string): Promise<string> => {
  try {
    const prompt = `Расскажи мне три интересных и забавных факта о химическом элементе ${elementName}. Отформатируй это как простой список. Сделай текст кратким и подходящим для весёлой образовательной игры.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching element facts from Gemini API:", error);
    return "Не удалось получить дополнительные данные в данный момент. Пожалуйста, проверьте ваше соединение или API-ключ.";
  }
};