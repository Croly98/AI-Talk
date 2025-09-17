import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/query", async (req, res) => {
  try {
    const { query, openaiKey, pineconeKey, indexName } = req.body;

    // Initialize OpenAI client using key from frontend
    const openai = new OpenAI({ apiKey: openaiKey });

    // Initialize Pinecone client dynamically
    const pc = new Pinecone({ apiKey: pineconeKey });
    const PINECONE_HOST = process.env.PINECONE_HOST;
    const index = pc.index(indexName, PINECONE_HOST);

    // 1. Embed user query
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-large",
      input: query
    });

    // 2. Pinecone retrieval
    const results = await index.query({
      vector: embedding.data[0].embedding,
      topK: 5,
      includeMetadata: true
    });

    console.log("Pinecone results:", results.matches.length, "matches found");
    console.log("Retrieved context:", results.matches.map(r => r.metadata?.text));

    const context = results.matches.map(r => r.metadata?.text || "").filter(t => t).join("\n");

    // 3. Build prompt with retrieved context
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant who works at an ice cream shop. Keep your responses conversational and concise, suitable for speech synthesis. Use the provided context if relevant."
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nUser: ${query}`
        }
      ],
      max_tokens: 150,
      temperature: 0.7
    });

    res.json({ answer: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
