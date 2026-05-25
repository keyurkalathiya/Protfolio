/**
 * Local Portfolio Response System for Keyur Kalathiya's chatbot widget.
 * This ensures 100% availability, instant responses (0ms delay),
 * and prevents dependencies on server-side environment variables on Vercel/live hosting.
 */

export function getLocalReply(query: string): string {
  const normalized = query.toLowerCase().trim();

  // 1. GREETINGS
  if (
    /^(hello|hi|hey|sup|yo|g'day|good\s*morning|good\s*afternoon|good\s*evening|greeting|hallo|hola|namaste)/i.test(normalized) ||
    normalized === "hi" ||
    normalized === "hello"
  ) {
    return `Hello there! I am **Keyur's Portfolio Coach** 🙋‍♂️. 

I'm ready to instantly answer any questions regarding Keyur's Computer Science credentials, machine learning research, full-stack projects, and how to hire him.

What would you like to know about?
- 🎓 **Education & Degrees**
- 📝 **Machine Learning Publication**
- 💻 **Core Projects & Technologies**
- 📜 **Professional Certifications**
- ✉️ **Contact & Hiring Details**`;
  }

  // 2. CONTACT / HIRE / EMAIL / PHONE / WHATSAPP / SOCIALS
  if (
    normalized.includes("contact") ||
    normalized.includes("email") ||
    normalized.includes("phone") ||
    normalized.includes("mobile") ||
    normalized.includes("call") ||
    normalized.includes("hire") ||
    normalized.includes("whatsapp") ||
    normalized.includes("linkedin") ||
    normalized.includes("github") ||
    normalized.includes("address") ||
    normalized.includes("location") ||
    normalized.includes("social") ||
    normalized.includes("find") ||
    normalized.includes("reach") ||
    normalized.includes("mail") ||
    normalized.includes("write") ||
    normalized.includes("touch")
  ) {
    return `### ✉️ Contact & Hiring Keyur Kalathiya

Keyur is available for full-time software engineering roles, full-stack web development projects, or machine learning consultancy. You can reach him instantly via:

- 📧 **Email**: [keyurkalathiya121@gmail.com](mailto:keyurkalathiya121@gmail.com)
- 📞 **Phone & WhatsApp**: [+91 9510703901](tel:+919510703901)
- 📍 **Location**: Surat, Gujarat, India
- 💼 **LinkedIn Profile**: [linkedin.com/in/keyurkalathiya-871451330](https://linkedin.com/in/keyurkalathiya-871451330)
- 🐙 **GitHub Portfolio**: [github.com/keyurkalathiya](https://github.com/keyurkalathiya)

👉 **How to connect right now:**
- You can write your inquiry in the **Contact Form** on this website.
- Click the **"Hire Me"** button in Keyur's header to send an email proposal instantly.`;
  }

  // 3. EDUCATION / DEGREE / COLLEGE / MASTER / BACHELOR / BCA / MSC
  if (
    normalized.includes("degree") ||
    normalized.includes("education") ||
    normalized.includes("study") ||
    normalized.includes("collage") ||
    normalized.includes("college") ||
    normalized.includes("university") ||
    normalized.includes("bca") ||
    normalized.includes("msc") ||
    normalized.includes("school") ||
    normalized.includes("academic") ||
    normalized.includes("qualification") ||
    normalized.includes("vnsgu") ||
    normalized.includes("savani") ||
    normalized.includes("ppsuni") ||
    normalized.includes("grad")
  ) {
    return `### 🎓 Keyur Kalathiya's Academic Background

Keyur has built a strong computer science foundation through both bachelor's and master's degree programs:

1. **Master of Science (M.Sc.) in Computer Science**
   - **University**: P P Savani University (Surat, Gujarat, India)
   - **Timeline**: August 2024 - June 2026 *(Current/Concluding)*
   - **Focus Area**: Advanced Algorithms, Deep Learning, Database Management Systems, Software Architecture, Statistical Modeling.

2. **Bachelor of Computer Applications (BCA) in CS & IT**
   - **University**: Veer Narmad South Gujarat University - VNSGU (Surat, Gujarat, India)
   - **Timeline**: June 2019 - June 2022
   - **Focus Area**: Object-Oriented Programming (OOP), Data Structures and Algorithms (DSA), Relational Database Management (RDBMS), Web Technologies.`;
  }

  // 4. RESEARCH / PAPER / PUBLICATION / JOURNAL / SUSTAINABILITY / ENGERY / GREEN AI / CO2
  if (
    normalized.includes("research") ||
    normalized.includes("paper") ||
    normalized.includes("publication") ||
    normalized.includes("journal") ||
    normalized.includes("energy") ||
    normalized.includes("efficiency") ||
    normalized.includes("carbon") ||
    normalized.includes("co2") ||
    normalized.includes("emissions") ||
    normalized.includes("bilstm") ||
    normalized.includes("transformer") ||
    normalized.includes("empirical") ||
    normalized.includes("subhashini") ||
    normalized.includes("ijrpr")
  ) {
    return `### 📝 Keyur's Machine Learning Research Publication

Keyur co-authored and published a prominent research paper demonstrating his deep expertise in **Green AI & Sustainable Deep Learning**:

- **Title**: *"Energy Efficiency of Machine Learning Algorithms: An Empirical Study"*
- **Co-author**: Subhashini. K
- **Journal**: International Journal of Research Publication and Reviews (IJRPR) | Vol. 7, Issue 4, pp. 1720-1728 (April 2026)
- **Official DOI / Link**: [https://doi.org/10.55248/gengpi.07.0426.20830](https://doi.org/10.55248/gengpi.07.0426.20830)

#### 🔬 Key Research Breakthroughs:
1. **Model Comparison**: Benchmarked training energy metrics (kWh), GPU power limits, running durations, and carbon impact (kg CO2 emissions) across BiLSTM, Transformer, and Hybrid neural architectures using the IMDB benchmark dataset.
2. **Key Discovery**: Demonstrated that the **Transformer** model runs at an ultra-low energy footprint of **0.000653 kWh** and minimal **0.000535 kg CO2** emissions compared to traditional sequence models.
3. **EES Score Formulation**: Created a new multi-axis benchmarking metric called **"Energy Efficiency Score (EES)"** to help engineers globally construct eco-friendly corporate neural systems.`;
  }

  // 5. PROJECTS / EXAMPLES / WORK / PRODUCTS
  if (
    normalized.includes("project") ||
    normalized.includes("work") ||
    normalized.includes("built") ||
    normalized.includes("movie") ||
    normalized.includes("recommend") ||
    normalized.includes("ecommerce") ||
    normalized.includes("food") ||
    normalized.includes("vegetable") ||
    normalized.includes("blood") ||
    normalized.includes("donation") ||
    normalized.includes("emergency") ||
    normalized.includes("system")
  ) {
    return `### 💻 Keyur Kalathiya's Key Projects

Keyur has built several advanced applications focused on real-world utility and machine learning algorithms:

1. **Movie Recommendation System (NLP-Powered)**
   - **Tech Stack**: Python, Pandas, NumPy, Scikit-learn (Machine Learning).
   - **Functionality**: Cleans raw film metadata, performs TF-IDF vectorization weighting, and computes Cosine Similarity matrices to discover pair-wise movie recommendations.

2. **Food & Vegetable eCommerce Platform**
   - **Tech Stack**: PHP, MySQL Database, HTML5, CSS3, JavaScript.
   - **Functionality**: Features highly normalized tables, interactive customer shipping cart state management, a secure product catalogue dashboard, and responsive checkout flows.

3. **Emergency Blood Donation Management System**
   - **Tech Stack**: PHP Backend, MySQL, JS, Bootstrap.
   - **Functionality**: Dynamically correlates localized clinic demands with regional registered emergency blood donors in real-time.`;
  }

  // 6. CERTIFICATIONS / COURSE / LEARNING
  if (
    normalized.includes("certification") ||
    normalized.includes("certificate") ||
    normalized.includes("course") ||
    normalized.includes("swayam") ||
    normalized.includes("coursera") ||
    normalized.includes("michigan") ||
    normalized.includes("aligarh") ||
    normalized.includes("score")
  ) {
    return `### 📜 Keyur's Professional Certifications

Keyur has earned multiple prestigious certifications validating his development, data parsing, and computer science skills:

1. **Data Science Using Python**
   - **Issuer**: SWAYAM Online (Aligarh Muslim University, AMU)
   - **Score / Recognition**: **86% score** | Recommended for 3-4 academic credits (July–October 2025).

2. **Using Python to Access Web Data**
   - **Issuer**: University of Michigan (via Coursera) | February 23, 2026.
   - **Focus**: Sockets, XML/JSON parsing, REST APIs.

3. **Capstone: Retrieving, Processing, & Visualizing Data with Python**
   - **Issuer**: University of Michigan (via Coursera) | February 23, 2026.
   - **Focus**: SQL Databases, dynamic web maps, and D3.js charts.

4. **Python Data Structures**
   - **Issuer**: University of Michigan (via Coursera) | February 16, 2026.
   - **Focus**: Lists, dictionaries, tuples, and file searches.

5. **Programming for Everybody (Getting Started with Python)**
   - **Issuer**: University of Michigan (via Coursera) | February 14, 2026.`;
  }

  // 7. SKILLS / LANGUAGES / LIBRARIES / FRAMEWORKS / DATABASES
  if (
    normalized.includes("skill") ||
    normalized.includes("language") ||
    normalized.includes("tech") ||
    normalized.includes("python") ||
    normalized.includes("php") ||
    normalized.includes("js") ||
    normalized.includes("javascript") ||
    normalized.includes("sql") ||
    normalized.includes("mysql") ||
    normalized.includes("java") ||
    normalized.includes("libraries") ||
    normalized.includes("tools") ||
    normalized.includes("ai") ||
    normalized.includes("react") ||
    normalized.includes("scikit") ||
    normalized.includes("pandas") ||
    normalized.includes("numpy")
  ) {
    return `### 🔧 Keyur Kalathiya's Core Technical Skills

Keyur has high domain proficiency in several program ecosystems:

- 💻 **Languages**: Python, PHP, Core Java, JavaScript (ES6+), SQL, HTML5, CSS3.
- ⚙️ **Databases & Backends**: MySQL Relational Database Modeling, PHP MVC web systems, REST API construction, Serverless routing.
- ⚛️ **Frontend Layout**: React.js, Tailwind CSS, responsive web viewports.
- 🔬 **Data Science & ML**: Pandas, NumPy, Scikit-learn, TF-IDF vectorization, Cosine Similarity mathematical matching.
- 🤖 **AI & Developer Productivity**: Prompt Engineering, AI Vibe Coding, Claude, ChatGPT, GitHub Copilot.
- 🛠️ **Workflow**: Git, GitHub, VS Code, automated deployment streams.`;
  }

  // 8. WHO / PROFILE / OUTLINE / BIOGRAPHY / KEYUR / RESUME
  if (
    normalized.includes("who") ||
    normalized.includes("keyur") ||
    normalized.includes("profile") ||
    normalized.includes("about") ||
    normalized.includes("resume") ||
    normalized.includes("bio") ||
    normalized.includes("background")
  ) {
    return `### 👨‍💻 About Keyur Kalathiya

Keyur Kalathiya is an **AI-Powered Full-Stack Web Developer** and **Machine Learning / NLP Researcher** based in Surat, Gujarat, India. 

- He is currently concluding his **M.Sc. in Computer Science** at P P Savani University (2024–2026).
- He is a published researcher in Green AI, having co-authored a peer-reviewed paper in April 2026 evaluating the energy efficiency of deep learning algorithms.
- He holds several certifications in **Data Science & Python engineering** from SWAYAM (Aligarh Muslim University) and the University of Michigan.
- Keyur specializes in full-stack web architectures (PHP, MySQL, React) combined with a deep understanding of machine learning pipelines.`;
  }

  // 9. GENERAL PORTFOLIO SUMMARY FALLBACK
  return `### Keyur Kalathiya's Portfolio Overview

I am happy to provide instant insights into Keyur Kalathiya's portfolio. Since you asked, here is a quick directory of his background facts:

- 🎓 **Education**: M.Sc. in Computer Science (P P Savani University) & Bachelor of Computer Applications (Veer Narmad South Gujarat University).
- 📝 **Research**: Published co-author of *"Energy Efficiency of Machine Learning Algorithms: An Empirical Study"* in IJRPR (April 2026).
- 💻 **Core Projects**: Movie Recommendation NLP System, PHP-MySQL eCommerce, and Clinic Emergency Blood Donation System.
- 🔧 **Skills**: Python, PHP, Core Java, JavaScript, React.js, MySQL, Scikit-learn, Pandas.
- 📜 **Certifications**: SWAYAM Data Science (86%), University of Michigan Python credentials.

*Feel free to specify your question, e.g. "What is Keyur's degree?" or "Give me his email to hire him!"*`;
}
