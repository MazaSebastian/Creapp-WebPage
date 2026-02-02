
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

export const generateProjectAdvice = async (userPrompt: string) => {
  if (!API_KEY) return "AI services are currently unavailable.";
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "You are a professional Fintech consultant at Creapp. Help the user brainstorm or define their fintech project. Be concise, professional, and innovative.",
        temperature: 0.7,
      }
    });
    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong with the AI service.";
  }
};
