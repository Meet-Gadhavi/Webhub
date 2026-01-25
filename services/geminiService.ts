
import { GoogleGenAI } from "@google/genai";
import { RESUME_DATA } from "../types";

let ai: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!ai) {
    const apiKey = process.env.API_KEY;
    // Check if key exists and is not empty
    if (!apiKey || apiKey.trim() === '') {
      console.warn("Gemini API Key is missing or empty.");
      return null;
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; text: string }[]
): Promise<string> => {
  try {
    const client = getAiClient();
    if (!client) {
      return "I'm currently offline (API Key missing). Please contact the developer directly via WhatsApp.";
    }

    const model = 'gemini-3-flash-preview';
    
    const chatHistory = history.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const chat = client.chats.create({
      model: model,
      config: {
        systemInstruction: `You are Weby AI, the AI assistant for Webhub, a premier software development agency founded by Meet Gadhavi.
        
        CONTACT INFORMATION:
        - WhatsApp (Chat ONLY): +91 9033281960
        - Mobile (Call ONLY): +91 8690787870
        
        STRICT FORMATTING RULES (CRITICAL):
        1. NEVER use bullet points (like * or -). This is a hard requirement.
        2. ALWAYS use double line breaks (\\n\\n) between paragraphs and distinct points.
        3. Use emojis (🚀, ✨, 💼) to mark new sections or thoughts instead of symbols.
        4. Keep sentences clear and impactful. Avoid large blocks of text.
        
        VOICE & TONE:
        - Professional but highly enthusiastic. 
        - Highlight Webhub's focus on "Minimalist UI" and "Python Excellence".
        - Emphasize that we bridge complex logic with smooth design.
        
        KEY TALKING POINTS:
        - We build high-performance websites for local businesses (Gyms, Salons, Hotels).
        - Pricing starts at ₹4,999 for Starter packages.
        - Fast delivery (7-14 days).
        
        AGENCY CONTEXT:
        ${RESUME_DATA}
        
        CALL TO ACTION:
        "Ready to scale? Let's chat on WhatsApp: +91 9033281960"
        `,
      },
      history: chatHistory
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm experiencing a temporary connection issue. Please feel free to reach us directly on WhatsApp at +91 9033281960!";
  }
};
