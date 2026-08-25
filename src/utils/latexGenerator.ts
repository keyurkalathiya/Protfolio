/**
 * Generates standard LaTeX code matching professional ATS-friendly resumes
 */
export function generateLatex(resumeData: {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  summary: string;
  skills: string[];
  education: Array<{
    institution: string;
    location: string;
    degree: string;
    timeline: string;
    details: string;
  }>;
  research: {
    title: string;
    journal: string;
    authors: string;
    doi: string;
    bullets: string[];
  };
  projects: Array<{
    name: string;
    tech: string;
    bullets: string[];
    liveUrl?: string;
  }>;
  certifications: string[];
  languages?: string[];
}): string {
  // Clean special characters for LaTeX safety
  const clean = (str: string) => {
    if (!str) return "";
    return str
      .replace(/&/g, "\\&")
      .replace(/%/g, "\\%")
      .replace(/\$/g, "\\$")
      .replace(/#/g, "\\#")
      .replace(/_/g, "\\_")
      .replace(/\{/g, "\\{")
      .replace(/\}/g, "\\}")
      .replace(/~/g, "\\textasciitilde ")
      .replace(/\^/g, "\\textasciicircum ")
      .replace(/•/g, "$\\bullet$");
  };

  let skillsListTex = "";
  resumeData.skills.forEach((skillLine) => {
    if (skillLine.includes(":")) {
      const idx = skillLine.indexOf(":");
      const cat = skillLine.substring(0, idx).trim();
      const list = skillLine.substring(idx + 1).trim();
      skillsListTex += `\\textbf{${clean(cat)}}: {${clean(list)}}\\\\ \\vspace{2pt}\n     `;
    } else {
      skillsListTex += `{${clean(skillLine)}}\\\\ \\vspace{2pt}\n     `;
    }
  });

  let educationTex = "";
  resumeData.education.forEach((edu) => {
    educationTex += `\\noindent\\textbf{${clean(edu.institution)}} \\hfill \\textbf{${clean(edu.timeline)}}\\\\
{\\em ${clean(edu.degree)}} \\hfill {\\em ${clean(edu.location)}}\\\\
\\begin{itemize}[leftmargin=0.15in, label={}]\n  \\item {Coursework: ${clean(edu.details)}}\n\\end{itemize}\n\\vspace{6pt}\n`;
  });

  let researchTex = `\\noindent\\textbf{\`\`${clean(resumeData.research.title)}''}\\\\\n{\\em Published in: ${clean(resumeData.research.journal)} | DOI: \\href{${resumeData.research.doi}}{${clean(resumeData.research.doi)}}}\\\\\n\\begin{itemize}[leftmargin=0.15in, label=$\\bullet$]\n`;
  resumeData.research.bullets.forEach((bullet) => {
    researchTex += `  \\item {${clean(bullet)}}\n`;
  });
  researchTex += `\\end{itemize}\n\\vspace{6pt}\n`;

  let projectsTex = "";
  resumeData.projects.forEach((proj) => {
    const cleanName = clean(proj.name);
    const cleanTech = clean(proj.tech);
    let headingLine = `\\noindent\\textbf{${cleanName}}`;
    if (proj.liveUrl) {
      const cleanUrl = proj.liveUrl.replace(/^https?:\/\/(www\.)?/, "");
      headingLine += ` \\hfill \\href{${proj.liveUrl}}{${clean(cleanUrl)}}`;
    }
    projectsTex += `${headingLine}\\\\\n\\textit{${cleanTech}}\\\\\n\\begin{itemize}[leftmargin=0.15in, label=$\\bullet$]\n`;
    proj.bullets.forEach((bullet) => {
      projectsTex += `  \\item {${clean(bullet)}}\n`;
    });
    projectsTex += `\\end{itemize}\n\\vspace{6pt}\n`;
  });

  let certsTex = "\\begin{itemize}[leftmargin=0.15in, label=$\\bullet$]\n";
  resumeData.certifications.forEach((cert) => {
    certsTex += `  \\item {${clean(cert)}}\n`;
  });
  certsTex += "\\end{itemize}\n";

  return `%-------------------------
% Resume in Latex
% Author : Keyur Kalathiya
% License : MIT
%------------------------

\\documentclass[letterpaper,10pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

% Font options
% \\usepackage[sfdefault]{FiraSans}
% \\usepackage[sfdefault]{roboto}
% \\usepackage[sfdefault]{noto-sans}
% \\usepackage[default]{sourcesanspro}

% Sans-serif option
\\renewcommand{\\familydefault}{\\sfdefault}

\\pdfgentounicode=1

\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.0in}
\\addtolength{\\topmargin}{-0.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\begin{document}

%----------HEADING----------
\\begin{center}
    {\\Huge \\scshape ${clean(resumeData.name)}} \\\\ \\vspace{1pt}
    \\small ${clean(resumeData.location)} $|$ 
    \\href{mailto:${resumeData.email}}{${clean(resumeData.email)}} $|$ 
    ${clean(resumeData.phone)} \\\\ \\vspace{1pt}
    \\href{${resumeData.linkedin}}{LinkedIn} $|$ 
    \\href{${resumeData.github}}{GitHub}
\\end{center}


%-----------PROFESSIONAL SUMMARY-----------
\\section{Professional Summary}
\\small{
  ${clean(resumeData.summary)}
}


%-----------EDUCATION-----------
\\section{Education}
${educationTex}


%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     ${skillsListTex}\\textbf{Spoken Languages}: {${resumeData.languages ? resumeData.languages.map(clean).join(", ") : "English, Gujarati, Hindi"}}
    }}
\\end{itemize}


%-----------RESEARCH \& PUBLICATIONS-----------
\\section{Research \\& Publications}
${researchTex}


%-----------SELECTED PROJECTS-----------
\\section{Selected Projects}
${projectsTex}


%-----------CERTIFICATIONS-----------
\\section{Certifications}
${certsTex}

\\end{document}
`;
}
