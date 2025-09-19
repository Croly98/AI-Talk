/* === ICE CREAM KNOWLEDGE BASE INGESTION ===
   This script populates the Pinecone vector database with ice cream knowledge.
   Retrieval part of RAG - without this data, the AI would have no
   specific ice cream knowledge to retrieve and would give generic responses.

   PROCESS:
   1. Define ice cream knowledge as text strings
   2. Convert each text to vector embedding using OpenAI
   3. Store vectors + metadata in Pinecone for similarity search
   4. When users ask questions, similar vectors are retrieved
*/

import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import 'dotenv/config';

// === ENVIRONMENT SETUP ===
// Load API keys and configuration from .env file
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;      // For embedding generation
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;  // For vector database
const INDEX_NAME = process.env.PINECONE_INDEX;          // Database index name
const PINECONE_HOST = process.env.PINECONE_HOST;        // Database host URL

if (!OPENAI_API_KEY || !PINECONE_API_KEY || !INDEX_NAME || !PINECONE_HOST) {
  throw new Error("Missing environment variables");
}

// === INITIALIZE CLIENTS ===
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const pc = new Pinecone({ apiKey: PINECONE_API_KEY });
const index = pc.index(INDEX_NAME, PINECONE_HOST);      // Connect to vector database

// === ICE CREAM KNOWLEDGE BASE ===
// This is the knowledge that will be retrieved when users ask questions
// Each string becomes a searchable vector in Pinecone
const flavours = [
  "We sell Vanilla ice cream. classic flavour, smooth and creamy.",
  "We sell Chocolate ice cream. is rich and sweet, made from cocoa.",
  "We sell Strawberry ice cream. has a fruity taste, usually pink in colour.",
  "We sell Mint chocolate chip ice cream. it is green, flavoured with mint and chocolate chips.",
  "We sell Cookies and cream ice cream. it is made with chunks of oreo in vanilla ice cream."
];

/* === DATA INGESTION FUNCTION ===
   This function processes each ice cream knowledge piece and stores it in Pinecone
   as a searchable vector. This only needs to be run once to populate the database.
*/
async function ingestData() {
  console.log(`🚀 Starting ingestion into Pinecone index "${INDEX_NAME}"...`);

  // Process each ice cream knowledge piece
  for (let i = 0; i < flavours.length; i++) {
    const text = flavours[i];                           // Current ice cream description

    try {
      // === STEP 1: CONVERT TEXT TO VECTOR ===
      // OpenAI embedding model converts text to numerical vector
      const embedding = await openai.embeddings.create({
        model: "text-embedding-3-large",               // Best embedding model
        input: text                                     // Ice cream description
      });

      // === STEP 2: STORE IN PINECONE VECTOR DATABASE ===
      // Save the vector along with original text as metadata
      await index.upsert([
        {
          id: `flavour-${i}`,                          // Unique identifier
          values: embedding.data[0].embedding,         // The vector representation
          metadata: { text }                           // Original text for retrieval
        }
      ]);

      console.log(`✅ Inserted: ${text}`);
    } catch (err) {
      console.error(`❌ Failed to insert "${text}":`, err);
    }
  }

  console.log("🎉 Ice cream flavours added to vector database!");
  console.log("📊 RAG system is now ready - users can ask about ice cream flavours!");
}

// === RUN THE INGESTION ===
// Execute the function to populate Pinecone with ice cream knowledge
ingestData().catch(err => console.error(err));
