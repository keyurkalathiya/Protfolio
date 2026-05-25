import { jsPDF } from "jspdf";

interface ResumeData {
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
  }>;
  certifications: string[];
  languages?: string[];
}

export function generatePdf(resumeData: ResumeData, filename: string = "Keyur_Kalathiya_Resume.pdf"): void {
  // Create jsPDF in 'letter' format with portrait layout (points as unit, letter is 612 x 792 pt)
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "letter"
  });

  const pageWidth = 612;
  const pageHeight = 792;
  const leftMargin = 45;
  const rightMargin = pageWidth - 45;
  const contentWidth = rightMargin - leftMargin; // 522 pt

  let y = 45; // Start coordinates

  // Spacing helpers
  const lineSpacing = 13;
  const h1Spacing = 18;
  const sectionSpacing = 16;
  const listIndent = 12;

  // Custom multi-page height checks and rendering helpers
  const checkPageBoundary = (heightNeeded: number) => {
    if (y + heightNeeded > pageHeight - 45) {
      doc.addPage();
      y = 45;
      // Re-apply serif font family on new page
      doc.setFont("times", "normal");
    }
  };

  const drawSectionTitle = (title: string) => {
    checkPageBoundary(30);
    y += 10;
    doc.setFont("times", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(title.toUpperCase(), leftMargin, y);
    
    // Draw a thin horizontal Rule exactly mimicking latex \titlerule
    y += 4;
    doc.setDrawColor(148, 163, 184); // slate-400
    doc.setLineWidth(0.5);
    doc.line(leftMargin, y, rightMargin, y);
    y += 12;
  };

  // Header Details (Centered Name and Contacts)
  doc.setFont("times", "bold");
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.text(resumeData.name, pageWidth / 2, y, { align: "center" });

  y += 14;
  doc.setFont("times", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105); // slate-600
  
  const line1 = `${resumeData.location}  |  ${resumeData.email}  |  ${resumeData.phone}`;
  doc.text(line1, pageWidth / 2, y, { align: "center" });

  y += 12;
  const cleanLinkedin = resumeData.linkedin.replace("https://", "");
  const cleanGithub = resumeData.github.replace("https://", "");
  const line2 = `LinkedIn: ${cleanLinkedin}  |  GitHub: ${cleanGithub}`;
  doc.text(line2, pageWidth / 2, y, { align: "center" });

  y += 15;

  // 1. PROFESSIONAL SUMMARY SECTION
  drawSectionTitle("Professional Summary");
  doc.setFont("times", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85); // slate-700
  
  const summaryWrapped = doc.splitTextToSize(resumeData.summary, contentWidth);
  summaryWrapped.forEach((line: string) => {
    checkPageBoundary(lineSpacing);
    doc.text(line, leftMargin, y);
    y += lineSpacing;
  });

  // 2. EDUCATION SECTION
  drawSectionTitle("Education");
  resumeData.education.forEach((edu) => {
    checkPageBoundary(35);
    
    // Institution (Bold, left-aligned) and timeline (Bold, right-aligned)
    doc.setFont("times", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text(edu.institution, leftMargin, y);
    doc.text(edu.timeline, rightMargin, y, { align: "right" });

    y += 12;
    // Degree (Italic, left) and Location (Italic, right)
    doc.setFont("times", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105);
    doc.text(edu.degree, leftMargin, y);
    doc.text(edu.location, rightMargin, y, { align: "right" });

    y += 11;
    // Coursework details (Regular wrapped)
    doc.setFont("times", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85);
    
    const courseworkText = `Relevant Coursework: ${edu.details}`;
    const cbWrapped = doc.splitTextToSize(courseworkText, contentWidth - 10);
    cbWrapped.forEach((line: string) => {
      checkPageBoundary(lineSpacing);
      doc.text(line, leftMargin + 8, y);
      y += lineSpacing;
    });
    y += 4;
  });

  // 3. TECHNICAL SKILLS SECTION
  drawSectionTitle("Technical Skills");
  checkPageBoundary(20);
  doc.setFont("times", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text("Core Technologies: ", leftMargin, y);

  doc.setFont("times", "normal");
  doc.setTextColor(51, 65, 85);
  const skillsString = resumeData.skills.join(", ");
  const skillsWrapped = doc.splitTextToSize(skillsString, contentWidth - 100);
  
  skillsWrapped.forEach((line: string, idx: number) => {
    checkPageBoundary(lineSpacing);
    const xPos = idx === 0 ? leftMargin + 90 : leftMargin + 90;
    doc.text(line, xPos, y);
    y += lineSpacing;
  });
  y += 2;

  // Spoken Languages Subsegment
  checkPageBoundary(15);
  doc.setFont("times", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text("Spoken Languages: ", leftMargin, y);

  doc.setFont("times", "normal");
  doc.setTextColor(51, 65, 85);
  const langsString = resumeData.languages ? resumeData.languages.join(", ") : "English, Gujarati, Hindi";
  doc.text(langsString, leftMargin + 90, y);
  y += lineSpacing + 4;

  // 4. RESEARCH & PUBLICATIONS SECTION
  drawSectionTitle("Research & Publications");
  checkPageBoundary(35);
  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  
  // Wrap research title to prevent overflow or overlaps
  const researchTitleWrapped = doc.splitTextToSize(`"${resumeData.research.title}"`, contentWidth);
  researchTitleWrapped.forEach((line: string) => {
    checkPageBoundary(13);
    doc.text(line, leftMargin, y);
    y += 12;
  });

  doc.setFont("times", "italic");
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  const researchMeta = `Published in: ${resumeData.research.journal}`;
  const researchMetaWrapped = doc.splitTextToSize(researchMeta, contentWidth);
  researchMetaWrapped.forEach((line: string) => {
    checkPageBoundary(11);
    doc.text(line, leftMargin, y);
    y += 10;
  });

  y += 2;
  doc.setFont("times", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  resumeData.research.bullets.forEach((bullet) => {
    checkPageBoundary(30);
    doc.text(String.fromCharCode(149), leftMargin + listIndent, y); // bullet point character
    const bulletWrapped = doc.splitTextToSize(bullet, contentWidth - 25);
    bulletWrapped.forEach((line: string, lineIdx: number) => {
      if (lineIdx > 0) checkPageBoundary(lineSpacing);
      doc.text(line, leftMargin + listIndent + 10, y);
      y += lineSpacing;
    });
    y += 2;
  });
  y += 4;

  // 5. SELECTED PROJECTS SECTION
  drawSectionTitle("Selected Projects");
  resumeData.projects.forEach((proj) => {
    checkPageBoundary(40);
    
    // Project Name (Bold, wrapped)
    doc.setFont("times", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    const projNameWrapped = doc.splitTextToSize(proj.name, contentWidth);
    projNameWrapped.forEach((line: string) => {
      checkPageBoundary(13);
      doc.text(line, leftMargin, y);
      y += 12;
    });

    // Tech Stack (Italic, wrapped underneath to completely prevent horizontal overlapping / column cutoffs)
    doc.setFont("times", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105);
    const techText = `Technologies: ${proj.tech}`;
    const techWrapped = doc.splitTextToSize(techText, contentWidth);
    techWrapped.forEach((line: string) => {
      checkPageBoundary(11);
      doc.text(line, leftMargin, y);
      y += 11;
    });

    y += 2;
    doc.setFont("times", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85);
    
    proj.bullets.forEach((bullet) => {
      checkPageBoundary(30);
      doc.text(String.fromCharCode(149), leftMargin + listIndent, y);
      const bulletWrapped = doc.splitTextToSize(bullet, contentWidth - 25);
      bulletWrapped.forEach((line: string, lineIdx: number) => {
        if (lineIdx > 0) checkPageBoundary(lineSpacing);
        doc.text(line, leftMargin + listIndent + 10, y);
        y += lineSpacing;
      });
      y += 2;
    });
    y += 4;
  });

  // 6. CERTIFICATIONS SECTION
  drawSectionTitle("Certifications");
  doc.setFont("times", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  
  resumeData.certifications.forEach((cert) => {
    checkPageBoundary(20);
    doc.text(String.fromCharCode(149), leftMargin + listIndent, y);
    const certWrapped = doc.splitTextToSize(cert, contentWidth - 25);
    certWrapped.forEach((line: string, lineIdx: number) => {
      if (lineIdx > 0) checkPageBoundary(lineSpacing);
      doc.text(line, leftMargin + listIndent + 10, y);
      y += lineSpacing;
    });
    y += 2;
  });

  // Trigger download of compiled PDF
  doc.save(filename);
}
