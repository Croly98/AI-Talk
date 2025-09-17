import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import 'dotenv/config';

// Load environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const INDEX_NAME = process.env.PINECONE_INDEX;
const PINECONE_HOST = process.env.PINECONE_HOST;

if (!OPENAI_API_KEY || !PINECONE_API_KEY || !INDEX_NAME || !PINECONE_HOST) {
  throw new Error("Missing environment variables");
}

// Initialize OpenAI
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Initialize Pinecone client
const pc = new Pinecone({
  apiKey: PINECONE_API_KEY
});

// Get index object with host
const index = pc.index(INDEX_NAME, PINECONE_HOST);

// Knowledge base
const flavours = [
  "We sell Vanilla ice cream. classic flavour, smooth and creamy.",
  "We sell Chocolate ice cream. is rich and sweet, made from cocoa.",
  "We sell Strawberry ice cream. has a fruity taste, usually pink in colour.",
  "We sell Mint chocolate chip ice cream. it is green, flavoured with mint and chocolate chips.",
  "We sell Cookies and cream ice cream. it is made with chunks of oreo in vanilla ice cream."
];

async function ingestData() {
  console.log(`🚀 Starting ingestion into Pinecone index "${INDEX_NAME}"...`);

  for (let i = 0; i < flavours.length; i++) {
    const text = flavours[i];

    try {
      const embedding = await openai.embeddings.create({
        model: "text-embedding-3-large",
        input: text
      });

      await index.upsert([
        {
          id: `flavour-${i}`,
          values: embedding.data[0].embedding,
          metadata: { text }
        }
      ]);

      console.log(`✅ Inserted: ${text}`);
    } catch (err) {
      console.error(`❌ Failed to insert "${text}":`, err);
    }
  }

  console.log("🎉 Ice cream flavours added!");
}

ingestData().catch(err => console.error(err));
