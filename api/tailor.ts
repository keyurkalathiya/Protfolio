import { GoogleGenAI } from "@google/genai";

function getGenAI(req: any): GoogleGenAI {
  const userKey = req.headers["x-gemini-key"] || req.body?.userApiKey;
  const key = userKey || process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.VITE_GOOGLE_API_KEY;
  if (!key) {
    throw new Error("GEMINI_API_KEY environment variable is required");
  }
  return new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Keyur's master details as reference
const MASTER_DETAILS = {
  name: "Keyur Kalathiya",
  role: "AI-Powered Full-Stack Web Developer & Machine Learning / NLP Researcher",
  location: "Surat, Gujarat, India",
  email: "keyurkalathiya121@gmail.com",
  phone: "+91 9510703901",
  linkedin: "https://linkedin.com/in/keyurkalathiya-871451330",
  github: "https://github.com/keyurkalathiya",
  summary: "Motivated and detail-oriented Computer Science graduate student with strong foundations in PHP, Python, Java, and full-stack web development. Published researcher with hands-on experience in machine learning and data structures. Proficient in AI-assisted development using tools like Claude and ChatGPT to accelerate coding, debugging, and problem-solving workflows. Eager to contribute technical skills and a problem-solving mindset to a high-impact IT or software engineering role.",
  skills: [
    "Python", "PHP & APIs", "MySQL & SQL", "React.js", 
    "Scikit-Learn", "NumPy & Pandas", "Git & GitHub", "AI Vibe Coding"
  ],
  education: [
    {
      institution: "P P Savani University",
      location: "Surat, Gujarat, India",
      degree: "Master of Science (M.Sc.) in Computer Science",
      timeline: "August 2024 - June 2026",
      details: "Advanced Algorithms, Machine Learning, Database Systems, Software Engineering, Statistical Modeling"
    },
    {
      institution: "Veer Narmad South Gujarat University (VNSGU)",
      location: "Surat, Gujarat, India",
      degree: "Bachelor of Computer Applications (BCA) - CS & IT",
      timeline: "June 2019 - June 2022",
      details: "Data Structures, Object-Oriented Programming, Web Technologies, Operating Systems, Relational Database Management"
    }
  ],
  research: {
    title: "Energy Efficiency of Machine Learning Algorithms: An Empirical Study",
    journal: "International Journal of Research Publication and Reviews (IJRPR) | Vol. 7, Issue 4, pp. 1720-1728",
    authors: "Keyur Kalathiya, Subhashini. K",
    doi: "https://doi.org/10.55248/gengpi.07.0426.20830",
    bullets: [
      "Designed and executed an empirical framework to benchmark energy consumption, GPU power usage, training duration, and carbon footprint (CO2 emissions) of deep learning architectures (BiLSTM, Transformer, Hybrid) on the IMDB dataset.",
      "Showed Transformer achieved highest energy efficiency at 0.000653 kWh with the lowest carbon footprint (0.000535 kg CO2).",
      "Formulated the 'Energy Efficiency Score (EES)', a dual-axis metric that evaluates training accuracy relative to energy costs to empower engineering teams to build sustainable AI systems."
    ]
  },
  projects: [
    {
      name: "NLP-Based Movie Recommendation System",
      tech: "Python, NLP, Pandas, Scikit-learn, Machine Learning",
      bullets: [
        "Analyzes film datasets, executes automated data cleaning and feature engineering, and implements similarity matrices (Cosine Similarity, TF-IDF Vectorization) to map metadata correlations."
      ]
    },
    {
      name: "Food & Vegetable eCommerce Website",
      tech: "PHP, HTML, CSS, JavaScript, MySQL",
      bullets: [
        "Built a responsive full-stack platform managing custom catalog registries. Designed normalized MySQL logical keys, product state controls, customer dashboard components, and dynamic ordering workflows."
      ]
    },
    {
      name: "Blood Donation Management System",
      tech: "PHP, MySQL, HTML5, CSS3, JavaScript",
      bullets: [
        "Created an emergency blood donation network platform which matches localized emergency blood requirements with registered local donors in real time."
      ]
    }
  ],
  certifications: [
    "Data Science Using Python (SWAYAM / AMU) - July-October 2025 (Score: 86%)",
    "Using Python to Access Web Data (University of Michigan, Coursera) - Feb 23, 2026",
    "Capstone: Retrieving, Processing, & Visualizing Data with Python (Univ. of Michigan, Coursera) - Feb 23, 2026",
    "Python Data Structures (University of Michigan, Coursera) - Feb 16, 2026",
    "Programming for Everybody / Getting Started (Univ. of Michigan, Coursera) - Feb 14, 2026"
  ]
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { companyName, jobRole, jobDescription } = req.body;
    if (!companyName || !jobRole || !jobDescription) {
      return res.status(400).json({ error: "companyName, jobRole, and jobDescription are required." });
    }

    const ai = getGenAI(req);

    const prompt = `You are an expert resume writer and recruiter specializing in ATS (Applicant Tracking Systems) matching optimizations.
Given the target role and Keyur Kalathiya's existing credentials, you need to personalize and tailor Keyur's **Professional Summary**, **Skills**, and **Project Bullet Points/Research Highlights** to stand out exactly for this job description.

Do NOT invent new credentials, degrees, or years. Keep the original facts authentic. Simply rewrite and prioritize wording, framing, action verbs, and highlighted achievements to match the keywords and goals of the target role.

Target Company: ${companyName}
Target Role: ${jobRole}
Target Job Description:
${jobDescription}

Keyur's Original Biography and Portfolio Data:
${JSON.stringify(MASTER_DETAILS, null, 2)}

Provide your output as a valid raw JSON object matching the following structure exactly. Do not wrap it in any extra text or commentary.
{
  "summary": "Rewritten ATS-tailored professional summary emphasizing skills relative to the job requirements (approx. 4-5 sentences, including mention of AI vibe coding, graduate CS mindset, and relevant project focus)",
  "skills": ["An optimized list of approx 8 key skills selected or combined from Keyur's skills that match the target role best (e.g. Python, SQL, React.js, Scikit-learn, PHP, Git, etc.)"],
  "projects": [
    {
      "name": "NLP-Based Movie Recommendation System",
      "tech": "Python, NLP, Pandas, Scikit-learn, Machine Learning",
      "bullets": [
        "Create 2-3 tailored bullet points for this project using strong action verbs, highlighting ML, NLP, algorithms, or problem solving optimized to the target JD."
      ]
    },
    {
      "name": "Food & Vegetable eCommerce Website",
      "tech": "PHP, HTML, CSS, JavaScript, MySQL",
      "bullets": [
        "Create 2 tailored bullet points highlighting database engineering, PHP MVC systems, structured logic, or cart status processing optimized to the target JD."
      ]
    },
    {
      "name": "Blood Donation Management System",
      "tech": "PHP, MySQL, HTML5, CSS3, JavaScript",
      "bullets": [
        "Create 2 tailored bullet points highlighting backend functionality, data querying, and real-time community networking features matching the target JD's keywords."
      ]
    }
  ],
  "research": {
    "title": "Energy Efficiency of Machine Learning Algorithms: An Empirical Study",
    "bullets": [
      "Create 3 tailored bullets highlighting deep learning frameworks (Transformers, BiLSTM), empirical benchmarking, Green AI, GPU tracking, or energy statistics (0.000653 kWh, 0.000535 kg CO2) customized to the job requirements."
    ]
  }
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const textOutput = response.text?.trim() || "{}";
    // Ensure it's valid JSON
    let tailoredData = {};
    try {
      tailoredData = JSON.parse(textOutput);
    } catch (e) {
      console.error("Failed to parse Gemini JSON. Raw response was:", textOutput);
      // Fallback clean parsing of standard JSON marker if it is wrapped in ```json
      const cleanJson = textOutput.replace(/```json/g, "").replace(/```/g, "").trim();
      tailoredData = JSON.parse(cleanJson);
    }

    res.status(200).json(tailoredData);
  } catch (error: any) {
    console.error("Error in serverless /api/tailor route:", error);
    res.status(500).json({ error: error?.message || "Internal Server Error" });
  }
}
