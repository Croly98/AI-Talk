import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

dotenv.config();
const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Serve pipeline.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pipeline.html"));
});

// Route: LLM response (with browsing)
app.post("/ask", async (req, res) => {
  const userText = req.body.text;

  // Safety check
  if (!userText || userText.trim() === "") {
    return res.status(400).json({ error: "No text provided to LLM" });
  }

  try {
    const response = await openai.responses.create({
      model: "gpt-4.1",          // ✅ browsing-capable
      input: userText,
      tools: [{ type: "web_search_preview_2025_03_11" }],  // ✅ allow internet search
    });

    // Extract AI reply text safely
    const aiReply = response.output?.[0]?.content?.[0]?.text || "No reply generated";

    res.json({ reply: aiReply });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "LLM request failed" });
  }
});

app.listen(port, () => {
  console.log(`Server running → http://localhost:${port}`);
});
