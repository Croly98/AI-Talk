/* === RAG SERVER FOR ICE CREAM VENDOR ===
   This server implements the RAG (Retrieval-Augmented Generation) backend:
   - Receives user queries from the frontend
   - Embeds queries using OpenAI text-embedding-3-large
   - Searches Pinecone vector database for relevant ice cream knowledge
   - Combines retrieved context with user query for GPT-3.5-turbo
   - Returns enhanced AI responses with specific ice cream information
*/

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import 'dotenv/config';

const app = express();
app.use(cors());                    // Allow frontend to call our API
app.use(bodyParser.json());         // Parse JSON request bodies

/* === RAG QUERY ENDPOINT ===
   This is where the magic happens! The /query endpoint implements the full RAG pipeline:
   1. EMBED: Convert user question to vector using OpenAI
   2. RETRIEVE: Search Pinecone for similar vectors (ice cream knowledge)
   3. AUGMENT: Combine retrieved context with user question
   4. GENERATE: Get GPT response enhanced with specific knowledge
*/
app.post("/query", async (req, res) => {
  try {
    const { query, openaiKey, pineconeKey, indexName } = req.body;

    // === STEP 1: INITIALIZE CLIENTS ===
    const openai = new OpenAI({ apiKey: openaiKey });           // For embeddings and chat
    const pc = new Pinecone({ apiKey: pineconeKey });           // For vector database
    const PINECONE_HOST = process.env.PINECONE_HOST;            // Database location
    const index = pc.index(indexName, PINECONE_HOST);           // Connect to specific index

    // === STEP 2: EMBED USER QUERY ===
    // Convert user's question into a vector representation
    // This allows us to find similar ice cream knowledge in the database
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-large",                          // OpenAI's best embedding model
      input: query                                              // User's spoken question
    });

    // === STEP 3: RETRIEVE SIMILAR KNOWLEDGE FROM PINECONE ===
    // Search for vectors similar to the user's question vector
    const results = await index.query({
      vector: embedding.data[0].embedding,                      // User query as vector
      topK: 5,                                                 // Get top 5 most similar results
      includeMetadata: true                                     // Include the actual text content
    });

    console.log("Pinecone results:", results.matches.length, "matches found");
    console.log("Retrieved context:", results.matches.map(r => r.metadata?.text));

    // === STEP 4: EXTRACT CONTEXT FROM RETRIEVED RESULTS ===
    // Combine all retrieved ice cream knowledge into a single context string
    const context = results.matches.map(r => r.metadata?.text || "").filter(t => t).join("\n");

    // === STEP 5: AUGMENT USER QUERY WITH RETRIEVED CONTEXT ===
    // Send both the retrieved ice cream knowledge AND user question to GPT
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant who works at an ice cream shop. Keep your responses conversational and concise, suitable for speech synthesis. Use the provided context if relevant."
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nUser: ${query}`    // Context + original query
        }
      ],
      max_tokens: 150,                                         // Keep responses short for quick speech
      temperature: 0.7                                         // Balanced creativity
    });

    // === STEP 6: RETURN ENHANCED RESPONSE ===
    res.json({ answer: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
