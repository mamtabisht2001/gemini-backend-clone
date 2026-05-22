// import axios from "axios";

// export const callGeminiAPI = async (prompt) => {
//    try {
//      const response = await axios.post(
//        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//        {
//          contents: [
//            {
//              parts: [
//                {
//                  text: prompt,
//                },
//              ],
//            },
//          ],
//        },
//      );

//      const aiText = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

//      console.log(aiText);
//   } catch (error) {
//     const { status } = error.response;
//     if (status === 429) {
//       return "You've hit the rate limit. Please try again later.";
//     } else if (status === 403) {
//       return "Forbidden: Check your API key or permissions.";
//     } else if (status === 404) {
//       return "Model not found. Check the model name.";
//     }
//   }
// };

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});
