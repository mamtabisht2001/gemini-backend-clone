import { Worker } from "bullmq";
import IORedis from "ioredis";
import dotenv from "dotenv";
dotenv.config();
import { model } from "../config/geminiConfig.js";
import { prisma } from "../config/prismaConfig.js";

const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "gemini",
  async (job) => {
    try {
      console.log("Received job:", job.data);

      const { userMessage, chatroomId , userId} = job.data;

      console.log("Processing user message:", userMessage);

      const result = await model.generateContent(userMessage);

      const aiResponse = result.response.text();

      console.log("AI Response:", aiResponse);

      // Save AI response in DB
      await prisma.message.create({
        data: {
          chatroomId,
          userId,
          content: aiResponse,
          role: "ai",
        },
      });

      // save response in DB here
    } catch (err) {
      console.log("Gemini Error:", err);
    }
  },
  {
    connection,
  },
);

console.log("Worker started");
