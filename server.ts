import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy client setup
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    genAIClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// Background data about Keyur Kalathiya
const KEYUR_CONTEXT = `You are a helpful portfolio intelligence AI assistant representing Keyur Kalathiya, designed to answer any questions about him, his credentials, skillset, research publications, projects, and educational achievements.

Respond in a professional, warm, engaging, and friendly manner. Avoid sounding robotic, but keep responses factual, visually neat, and focused specifically on Keyur.

=== KEYUR KALATHIYA'S DETAILED BACKGROUND ===
- Name: Keyur Kalathiya
- Role: AI-Powered Full-Stack Web Developer & Machine Learning / NLP Researcher
- Location: Surat, Gujarat, India
- Email: keyurkalathiya121@gmail.com
- Phone: +91 9510703901
- LinkedIn: https://linkedin.com/in/keyurkalathiya-871451330
- GitHub: https://github.com/keyurkalathiya

EDUCATION:
1. P P Savani University (Surat, Gujarat, India)
   - Master of Science (M.Sc.) in Computer Science
   - August 2024 - June 2026 (Currently pursuing/concluding)
   - Relevant Coursework: Advanced Algorithms, Machine Learning, Database Systems, Software Engineering, Statistical Modeling.
2. Veer Narmad South Gujarat University - VNSGU (Surat, Gujarat, India)
   - Bachelor of Computer Applications (BCA) in CS & IT
   - June 2019 - June 2022
   - Coursework: Data Structures, Object-Oriented Programming (OOP), Web Technologies, Operating Systems, Relational Database Management (RDBMS).

RESEARCH & PUBLICATIONS:
- Title: "Energy Efficiency of Machine Learning Algorithms: An Empirical Study"
- Co-author: Subhashini. K
- Journal: International Journal of Research Publication and Reviews (IJRPR) | Vol. 7, Issue 4, pp. 1720-1728 (April 2026)
- DOI / Link: https://doi.org/10.55248/gengpi.07.0426.20830
- Deep Insights:
  - Benchmarked training energy metrics (kWh), GPU power usage, durations, and carbon footprint (kg CO2 emissions) on BiLSTM, Transformer, and Hybrid deep learning architectures with the IMDB sentiment dataset.
  - Demonstrated that the Transformer model is highly efficient, processing at 0.000653 kWh with a minimal 0.000535 kg CO2 emission signature.
  - Formulated the "Energy Efficiency Score (EES)" - a new multi-axis benchmarking metric to help development teams globally build eco-friendly green AI systems.

TECHNICAL SKILLS:
- Languages: Python, PHP, Core Java, JavaScript, HTML5, CSS3, SQL (MySQL)
- AI & Productivity Tools: Claude, ChatGPT, GitHub Copilot, Prompt Engineering, AI Vibe Coding, Git, GitHub, VS Code
- Web frameworks & databases: PHP Backend, RESTful Web APIs, MySQL, and React.js frontend structures.
- DS & AI libraries: Scikit-learn, NumPy, Pandas, custom NLP similarity structures.

NOTABLE PROJECTS:
1. NLP-Based Movie Recommendation System:
   - Built under Python with Pandas & Scikit-learn.
   - Cleans unstructured metadata, does TF-IDF vectorization, and computes Cosine Similarity matrices to discover content pairings.
2. Food & Vegetable eCommerce Platform:
   - Full-stack web system using SQL, PHP, CSS, and JS.
   - Created optimized normalized database tables, secure product catalogue dashboards, active customer cart routines, and full-featured checkouts.
3. Blood Donation Emergency Management System:
   - Scalable PHP-MySQL application to connect localized clinics and emergency blood requirements with registered regional blood donors dynamically.

CERTIFICATIONS:
1. Data Science Using Python (SWAYAM Online, Aligarh Muslim University) - July-October 2025. Score: 86%. Recommended for 3-4 academic credits.
2. Using Python to Access Web Data (University of Michigan, Coursera) - Feb 23, 2026. Handled sockets, parsing raw XML/JSON, APIs.
3. Capstone: Retrieving, Processing, & Visualizing Data with Python (Univ. of Michigan, Coursera) - Feb 23, 2026. Structured SQL databases and dynamic D3.js web visual charts.
4. Python Data Structures (Univ. of Michigan, Coursera) - Feb 16, 2026. Implemented list, tuple, and dictionary algorithms.
5. Programming for Everybody / Getting Started (Univ. of Michigan, Coursera) - Feb 14, 2026. Established basic loops and conditions.

=== CHAT GUIDELINES ===
- Introduce yourself as "Keyur's Assistant" or "Keyur's Portfolio AI Coach" when asked.
- Keep the tone confident, positive, and accurate.
- If Asked to hire or contact Keyur: Provide his details such as email keyurkalathiya121@gmail.com, phone +91 9510703901, and suggest clicking "Hire Me" or writing in the contact form to connect immediately over Email/WhatsApp.
- Ground all facts in the above text. Do not invent details not specified here (e.g., other jobs he didn't do, or incorrect certifications). If asked about something not covered, politely say that you don't have that specific data, but they can reach out to Keyur directly to ask! Please use Markdown formatting for responses (bullet points, italicization, brave headers).`;

// Unified route for chatbot interactions with streaming support
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    const ai = getGenAI();

    // Reformat incoming chat array for GenAI SDK
    // Mapping: role "assistant" -> "model"
    const formattedContents = messages.map((m: { role: string; content: string }) => {
      return {
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      };
    });

    // Request Headers for Streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: KEYUR_CONTEXT,
        temperature: 0.7,
      },
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
      }
    }
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error: any) {
    console.error("Error in /api/chat route:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: error?.message || "Internal Server Error" });
    } else {
      res.write(`data: ${JSON.stringify({ error: error?.message || "Internal Server Error" })}\n\n`);
      res.end();
    }
  }
});

// Vite server / production fallback
const configureServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Running full-stack on http://localhost:${PORT}`);
  });
};

configureServer();
