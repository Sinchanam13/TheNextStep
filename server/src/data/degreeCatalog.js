// Bachelor's degree catalog = list of names + reusable rules per degree FAMILY.
// Each rule is written once and applied to every degree in that family, so nothing is typed per degree
// except the exceptions. Everything is imported with status "unverified" until a person checks the source link.

export const DOMAINS = {
  "engineering-and-technology": "Engineering and Technology",
  "computer-and-it": "Computer and IT",
  "medical-and-ayush": "Medical and AYUSH",
  "nursing-and-allied-health": "Nursing and Allied Health",
  "pharmacy-and-veterinary": "Pharmacy and Veterinary",
  "science-and-research": "Science and Research",
  "agriculture-and-allied": "Agriculture and Allied",
  "commerce-and-finance": "Commerce and Finance",
  "management-and-business": "Management and Business",
  "law": "Law",
  "arts-and-humanities": "Arts and Humanities",
  "education-and-teaching": "Education and Teaching",
  "media-and-communication": "Media and Communication",
  "design": "Design",
  "architecture-and-planning": "Architecture and Planning",
  "fine-and-performing-arts": "Fine and Performing Arts",
  "hospitality-and-tourism": "Hospitality and Tourism",
  "aviation-and-maritime": "Aviation and Maritime",
  "sports-and-physical-education": "Sports and Physical Education",
  "vocational-education": "Vocational Education",
};

const CUET = "https://cuet.nta.nic.in";
const NEET = "https://neet.nta.nic.in";

// stream values: PCM, PCB, Commerce, Arts, Any (open to all), Graduate (needs a bachelor's degree first)
export const FAMILIES = {
  eng: { stream: ["PCM"], dur: "4 years", elig: "Class 12 with Physics, Chemistry and Maths", exam: ["JEE Main", "State CETs (e.g. KCET)", "Institute entrance"], reg: "AICTE", src: "https://jeemain.nta.nic.in", careers: ["Engineer in the chosen branch", "Technical roles in industry", "Government engineering jobs", "M.Tech or MBA"] },
  arch: { stream: ["PCM"], dur: "5 years", elig: "Class 12 with Physics, Chemistry and Maths; aptitude test required", exam: ["NATA", "JEE Main Paper 2"], reg: "Council of Architecture", src: "https://www.nata.in", careers: ["Architect", "Urban planner", "Interior designer", "M.Arch"] },
  apps: { stream: ["Any"], dur: "3 years", elig: "Class 12 in any stream; Maths is preferred by many colleges", exam: ["CUET-UG", "University or state entrance", "Merit"], reg: "UGC / AICTE", src: CUET, careers: ["Software developer", "Web developer", "Software tester", "Data analyst", "MCA or MBA"] },
  sci: { stream: ["PCM", "PCB"], dur: "3 years (4 with honours)", elig: "Class 12 with the science subjects needed for the chosen subject", exam: ["CUET-UG", "University entrance or merit"], reg: "UGC", src: CUET, careers: ["Researcher", "Lecturer or teacher", "Lab scientist", "M.Sc and Ph.D", "Civil services"] },
  mbbs: { stream: ["PCB"], dur: "5.5 years (incl. 1 year internship)", elig: "Class 12 with Physics, Chemistry and Biology", exam: ["NEET-UG"], reg: "NMC", src: NEET, careers: ["Doctor", "Specialist after MD/MS", "Public health", "Medical research"] },
  dent: { stream: ["PCB"], dur: "5 years (incl. 1 year internship)", elig: "Class 12 with Physics, Chemistry and Biology", exam: ["NEET-UG"], reg: "Dental Council of India", src: NEET, careers: ["Dentist", "MDS specialist", "Dental clinic owner", "Teaching and research"] },
  ayush: { stream: ["PCB"], dur: "5.5 years (incl. internship)", elig: "Class 12 with Physics, Chemistry and Biology", exam: ["NEET-UG"], reg: "NCISM / NCH", src: NEET, careers: ["AYUSH physician", "Wellness and therapy centres", "Government AYUSH roles", "MD in the system"] },
  nurs: { stream: ["PCB"], dur: "4 years", elig: "Class 12 with Physics, Chemistry and Biology", exam: ["State or university entrance or merit; rules vary"], reg: "Indian Nursing Council", src: "https://indiannursingcouncil.org", careers: ["Staff nurse", "Nursing officer (government)", "Nurse educator", "Public health nurse"] },
  allied: { stream: ["PCB"], dur: "3 to 4 years", elig: "Class 12 with Physics, Chemistry and Biology", exam: ["State or university entrance or merit; rules vary"], reg: "NCAHP / state universities", src: "https://www.mohfw.gov.in", careers: ["Technician or therapist in hospitals", "Diagnostic and rehab centres", "Clinical specialist", "Master's in the field"] },
  pharm: { stream: ["PCM", "PCB"], dur: "4 years", elig: "Class 12 with Physics, Chemistry and Maths or Biology", exam: ["State CETs (e.g. KCET)", "Merit"], reg: "Pharmacy Council of India", src: "https://www.pci.gov.in", careers: ["Pharmacist", "Drug inspector", "Pharma industry roles", "M.Pharm"] },
  vet: { stream: ["PCB"], dur: "5.5 years (incl. internship)", elig: "Class 12 with Physics, Chemistry and Biology", exam: ["NEET-UG"], reg: "Veterinary Council of India", src: NEET, careers: ["Veterinarian", "Animal husbandry officer", "Livestock industry roles", "M.V.Sc"] },
  agri: { stream: ["PCM", "PCB"], dur: "4 years", elig: "Class 12 with Physics, Chemistry and Maths or Biology (some universities accept Agriculture)", exam: ["CUET-UG (ICAR seats)", "State CETs (e.g. KCET)"], reg: "ICAR", src: "https://icar.org.in", careers: ["Agricultural officer", "Farm or agri-business manager", "Researcher", "Banking and insurance (agri roles)", "M.Sc Agriculture"] },
  law5: { stream: ["Any"], dur: "5 years", elig: "Class 12 pass in any stream", exam: ["CLAT", "Other university law entrance tests"], reg: "Bar Council of India", src: "https://consortiumofnlus.ac.in", careers: ["Advocate", "Corporate lawyer", "Judicial services", "Legal advisor", "LL.M"] },
  law3: { stream: ["Graduate"], dur: "3 years", elig: "Any bachelor's degree", exam: ["University or state law entrance tests"], reg: "Bar Council of India", src: "https://www.barcouncilofindia.org", careers: ["Advocate", "Legal officer", "Judicial services", "LL.M"] },
  com: { stream: ["Any"], dur: "3 years (4 with honours)", elig: "Class 12 pass; Commerce is preferred but many colleges accept other streams", exam: ["CUET-UG", "University entrance or merit"], reg: "UGC", src: CUET, careers: ["Accountant", "Banker", "Tax consultant", "CA, CS or CMA", "MBA"] },
  mgmt: { stream: ["Any"], dur: "3 years", elig: "Class 12 pass in any stream", exam: ["CUET-UG", "University entrance or merit"], reg: "UGC / AICTE", src: CUET, careers: ["Business analyst", "Management trainee", "Entrepreneur", "Marketing or HR roles", "MBA"] },
  arts: { stream: ["Any"], dur: "3 years (4 with honours)", elig: "Class 12 pass in any stream", exam: ["CUET-UG", "University entrance or merit"], reg: "UGC", src: CUET, careers: ["Civil services", "Teaching", "Counsellor or researcher", "Content and policy roles", "Master's degree"] },
  edu: { stream: ["Graduate"], dur: "2 years", elig: "A bachelor's degree with the minimum marks set by NCTE and the university", exam: ["State or university entrance or merit"], reg: "NCTE", src: "https://ncte.gov.in", careers: ["School teacher", "Education counsellor", "Academic content roles", "M.Ed"] },
  media: { stream: ["Any"], dur: "3 years", elig: "Class 12 pass in any stream", exam: ["CUET-UG", "University or institute entrance", "Merit"], reg: "UGC", src: CUET, careers: ["Journalist", "Content creator", "PR executive", "Video editor or producer"] },
  design: { stream: ["Any"], dur: "4 years", elig: "Class 12 pass in any stream", exam: ["UCEED", "NID DAT", "Institute entrance"], reg: "UGC / AICTE", src: "https://uceed.iitb.ac.in", careers: ["UX/UI designer", "Product designer", "Graphic designer", "Design researcher", "M.Des"] },
  fine: { stream: ["Any"], dur: "3 to 4 years", elig: "Class 12 pass in any stream; portfolio or aptitude test at many colleges", exam: ["Institute entrance (portfolio or aptitude)", "CUET-UG"], reg: "UGC", src: CUET, careers: ["Artist or performer", "Illustrator", "Art teacher", "Gallery and museum roles", "Master's in fine arts"] },
  hosp: { stream: ["Any"], dur: "3 years", elig: "Class 12 pass in any stream", exam: ["NCHM JEE (for NCHM colleges)", "University entrance or merit"], reg: "NCHMCT / UGC", src: "https://nchmjee.nta.nic.in", careers: ["Hotel manager", "Chef", "Event manager", "Travel and tourism roles", "Airline and cruise hospitality"] },
  avi: { stream: ["Any"], dur: "3 years", elig: "Class 12 pass; Physics and Maths are needed if you want commercial pilot training (DGCA rules)", exam: ["University entrance or merit"], reg: "UGC / DGCA", src: "https://www.ugc.gov.in", careers: ["Airport and airline operations", "Ground handling and logistics", "Cabin crew", "Aviation management"] },
  mar: { stream: ["PCM"], dur: "3 years", elig: "Class 12 with Physics, Chemistry and Maths (and English); medical fitness required", exam: ["IMU CET"], reg: "Indian Maritime University / DG Shipping", src: "https://www.imu.edu.in", careers: ["Merchant navy officer", "Ship operations", "Port and shipping companies", "Marine surveyor"] },
  sports: { stream: ["Any"], dur: "3 years", elig: "Class 12 pass; fitness or sports test at many institutes", exam: ["Institute entrance or merit"], reg: "UGC / NCTE", src: "https://www.ugc.gov.in", careers: ["Physical education teacher", "Coach", "Sports manager", "Fitness trainer", "Master's in sports"] },
  voc: { stream: ["Any"], dur: "3 years", elig: "Class 12 pass or a diploma in the field", exam: ["University admission or merit"], reg: "UGC / NSQF", src: "https://nqr.gov.in", careers: ["Skilled roles in the chosen industry", "Supervisor roles", "Self-employment", "Further study (M.Voc)"] },
  integ: { stream: ["Any"], dur: "5 years", elig: "Class 12 pass", exam: ["IPMAT (IIM Indore and others)"], reg: "IIMs", src: "https://www.iimidr.ac.in", careers: ["Manager", "Consultant", "Entrepreneur", "Analyst"] },
};

const D = (n) => n; // readability helper
// [domain, family, name, overrides]  overrides: stream, dur, elig, exam[], careers[], src, reg
const ROWS = [
  // Engineering and Technology
  ...["Mechanical Engineering","Civil Engineering","Electrical and Electronics Engineering","Electronics and Communication Engineering","Chemical Engineering","Industrial and Production Engineering","Automobile Engineering","Mining Engineering","Metallurgical and Materials Engineering","Textile Engineering","Environmental Engineering","Instrumentation Engineering","Petroleum Engineering","Robotics and Automation"].map((n) => ["engineering-and-technology", "eng", `B.Tech in ${n}`]),
  ["engineering-and-technology", "eng", "B.Tech in Biotechnology", { stream: ["PCM", "PCB"], elig: "Class 12 with Physics, Chemistry and Maths or Biology (varies by college)" }],
  ["engineering-and-technology", "eng", "B.Tech in Biomedical Engineering", { stream: ["PCM", "PCB"], elig: "Class 12 with Physics, Chemistry and Maths or Biology (varies by college)" }],
  // Computer and IT
  ...["Computer Science and Engineering","Information Technology","Artificial Intelligence and Machine Learning","Data Science","Cyber Security"].map((n) => ["computer-and-it", "eng", `B.Tech in ${n}`]),
  ["computer-and-it", "apps", "BCA (Bachelor of Computer Applications)"],
  ["computer-and-it", "apps", "BCA in Data Science"],
  ["computer-and-it", "apps", "B.Sc in Computer Science", { stream: ["Any"], elig: "Class 12 pass; Maths is preferred by many colleges" }],
  ["computer-and-it", "apps", "B.Sc in Information Technology"],
  ["computer-and-it", "apps", "B.Sc in Data Science", { elig: "Class 12 with Maths is preferred by many colleges", stream: ["PCM", "Any"] }],
  // Medical and AYUSH
  ["medical-and-ayush", "mbbs", "MBBS (Bachelor of Medicine and Bachelor of Surgery)"],
  ["medical-and-ayush", "dent", "BDS (Bachelor of Dental Surgery)"],
  ["medical-and-ayush", "ayush", "BAMS (Ayurvedic Medicine and Surgery)"],
  ["medical-and-ayush", "ayush", "BHMS (Homoeopathic Medicine and Surgery)"],
  ["medical-and-ayush", "ayush", "BUMS (Unani Medicine and Surgery)"],
  ["medical-and-ayush", "ayush", "BNYS (Naturopathy and Yogic Sciences)"],
  ["medical-and-ayush", "ayush", "BSMS (Siddha Medicine and Surgery)"],
  // Nursing and Allied Health
  ["nursing-and-allied-health", "nurs", "B.Sc in Nursing"],
  ["nursing-and-allied-health", "allied", "BPT (Bachelor of Physiotherapy)", { dur: "4.5 years (incl. internship)" }],
  ["nursing-and-allied-health", "allied", "BOT (Bachelor of Occupational Therapy)", { dur: "4.5 years (incl. internship)" }],
  ["nursing-and-allied-health", "allied", "B.Sc in Medical Laboratory Technology"],
  ["nursing-and-allied-health", "allied", "B.Sc in Radiology and Imaging Technology"],
  ["nursing-and-allied-health", "allied", "B.Optom (Bachelor of Optometry)", { dur: "4 years" }],
  ["nursing-and-allied-health", "allied", "BASLP (Audiology and Speech-Language Pathology)", { dur: "4 years (incl. internship)" }],
  ["nursing-and-allied-health", "allied", "B.Sc in Anaesthesia Technology"],
  ["nursing-and-allied-health", "allied", "B.Sc in Operation Theatre Technology"],
  ["nursing-and-allied-health", "allied", "B.Sc in Dialysis Technology"],
  ["nursing-and-allied-health", "allied", "B.Sc in Nutrition and Dietetics", { dur: "3 years", stream: ["PCB", "PCM"], elig: "Class 12 science (Biology or Chemistry preferred)" }],
  // Pharmacy and Veterinary
  ["pharmacy-and-veterinary", "pharm", "B.Pharm (Bachelor of Pharmacy)"],
  ["pharmacy-and-veterinary", "pharm", "Pharm.D (Doctor of Pharmacy)", { dur: "6 years (incl. internship)" }],
  ["pharmacy-and-veterinary", "vet", "BVSc and AH (Veterinary Science and Animal Husbandry)"],
  // Science and Research
  ["science-and-research", "sci", "B.Sc in Physics", { stream: ["PCM"], elig: "Class 12 with Physics, Chemistry and Maths" }],
  ["science-and-research", "sci", "B.Sc in Chemistry", { stream: ["PCM", "PCB"], elig: "Class 12 with Physics, Chemistry and Maths or Biology" }],
  ["science-and-research", "sci", "B.Sc in Mathematics", { stream: ["PCM"], elig: "Class 12 with Maths" }],
  ["science-and-research", "sci", "B.Sc in Statistics", { stream: ["PCM"], elig: "Class 12 with Maths" }],
  ["science-and-research", "sci", "B.Sc in Zoology", { stream: ["PCB"], elig: "Class 12 with Biology" }],
  ["science-and-research", "sci", "B.Sc in Botany", { stream: ["PCB"], elig: "Class 12 with Biology" }],
  ["science-and-research", "sci", "B.Sc in Microbiology", { stream: ["PCB"], elig: "Class 12 with Biology and Chemistry" }],
  ["science-and-research", "sci", "B.Sc in Biotechnology", { stream: ["PCB", "PCM"], elig: "Class 12 with Biology or Maths, plus Physics and Chemistry" }],
  ["science-and-research", "sci", "B.Sc in Biochemistry", { stream: ["PCB"], elig: "Class 12 with Biology and Chemistry" }],
  ["science-and-research", "sci", "B.Sc in Genetics", { stream: ["PCB"], elig: "Class 12 with Biology and Chemistry" }],
  ["science-and-research", "sci", "B.Sc in Geology", { stream: ["PCM", "PCB"], elig: "Class 12 science" }],
  ["science-and-research", "sci", "B.Sc in Electronics", { stream: ["PCM"], elig: "Class 12 with Physics and Maths" }],
  ["science-and-research", "sci", "B.Sc in Environmental Science", { stream: ["PCM", "PCB"], elig: "Class 12 science" }],
  ["science-and-research", "sci", "B.Sc in Forensic Science", { stream: ["PCM", "PCB"], elig: "Class 12 science" }],
  ["science-and-research", "sci", "B.Sc in Psychology", { stream: ["Any"], elig: "Class 12 pass; science stream preferred by some colleges" }],
  ["science-and-research", "sci", "B.Sc in Geography", { stream: ["Any"], elig: "Class 12 pass; subject rules vary" }],
  ["science-and-research", "integ", "Integrated BS-MS (IISER)", { stream: ["PCM", "PCB"], elig: "Class 12 science", exam: ["IISER Aptitude Test (IAT)", "JEE Advanced", "KVPY/NEET routes as notified"], src: "https://www.iiseradmission.in", careers: ["Research scientist", "Ph.D and academia", "Science policy and industry R&D"], reg: "IISERs" }],
  // Agriculture and Allied
  ["agriculture-and-allied", "agri", "B.Sc (Hons) in Agriculture"],
  ["agriculture-and-allied", "agri", "B.Sc (Hons) in Horticulture"],
  ["agriculture-and-allied", "agri", "B.Sc (Hons) in Forestry"],
  ["agriculture-and-allied", "agri", "B.F.Sc (Fisheries Science)"],
  ["agriculture-and-allied", "agri", "B.Sc (Hons) in Sericulture"],
  ["agriculture-and-allied", "agri", "B.Sc (Hons) in Community Science (Home Science)", { stream: ["PCB", "PCM", "Any"] }],
  ["agriculture-and-allied", "agri", "B.Tech in Food Technology", { stream: ["PCM", "PCB"] }],
  ["agriculture-and-allied", "agri", "B.Tech in Agricultural Engineering", { stream: ["PCM"], elig: "Class 12 with Physics, Chemistry and Maths" }],
  // Commerce and Finance
  ["commerce-and-finance", "com", "B.Com (Bachelor of Commerce)"],
  ["commerce-and-finance", "com", "B.Com (Hons)"],
  ["commerce-and-finance", "com", "B.Com in Accounting and Finance"],
  ["commerce-and-finance", "com", "B.Com in Computer Applications"],
  ["commerce-and-finance", "com", "B.Com in Banking and Insurance"],
  ["commerce-and-finance", "com", "BFM (Bachelor of Financial Markets)"],
  ["commerce-and-finance", "com", "BAF (Bachelor of Accounting and Finance)"],
  ["commerce-and-finance", "com", "B.A. in Economics", { elig: "Class 12 pass; Maths is helpful" }],
  // Management and Business
  ["management-and-business", "mgmt", "BBA (Bachelor of Business Administration)"],
  ["management-and-business", "mgmt", "BMS (Bachelor of Management Studies)"],
  ["management-and-business", "mgmt", "BBM (Bachelor of Business Management)"],
  ["management-and-business", "mgmt", "BBA in Business Analytics"],
  ["management-and-business", "mgmt", "BBA in International Business"],
  ["management-and-business", "integ", "IPM (Integrated Programme in Management)"],
  // Law
  ["law", "law5", "B.A. LL.B. (Hons)"],
  ["law", "law5", "BBA LL.B. (Hons)"],
  ["law", "law5", "B.Com LL.B. (Hons)"],
  ["law", "law3", "LL.B. (3-year, after graduation)"],
  // Arts and Humanities
  ["arts-and-humanities", "arts", "B.A. (Bachelor of Arts)"],
  ["arts-and-humanities", "arts", "B.A. in English Literature"],
  ["arts-and-humanities", "arts", "B.A. in History"],
  ["arts-and-humanities", "arts", "B.A. in Political Science"],
  ["arts-and-humanities", "arts", "B.A. in Sociology"],
  ["arts-and-humanities", "arts", "B.A. in Psychology"],
  ["arts-and-humanities", "arts", "B.A. in Philosophy"],
  ["arts-and-humanities", "arts", "B.A. in Geography"],
  ["arts-and-humanities", "arts", "B.A. in Public Administration"],
  ["arts-and-humanities", "arts", "BSW (Bachelor of Social Work)"],
  // Education and Teaching
  ["education-and-teaching", "edu", "B.Ed (Bachelor of Education)"],
  ["education-and-teaching", "edu", "Integrated B.Ed (ITEP)", { stream: ["Any"], dur: "4 years", elig: "Class 12 pass", exam: ["NCET"] }],
  ["education-and-teaching", "edu", "B.El.Ed (Elementary Education)", { stream: ["Any"], dur: "4 years", elig: "Class 12 pass; marks rules vary by university", exam: ["University entrance or merit"] }],
  // Media and Communication
  ["media-and-communication", "media", "B.A. in Journalism and Mass Communication"],
  ["media-and-communication", "media", "B.Sc in Visual Communication"],
  ["media-and-communication", "media", "B.Sc in Animation and VFX"],
  ["media-and-communication", "media", "BMM (Bachelor of Mass Media)"],
  ["media-and-communication", "media", "B.A. in Advertising and Public Relations"],
  // Design
  ["design", "design", "B.Des (Bachelor of Design)"],
  ["design", "design", "B.Des in Fashion Design (NIFT)", { exam: ["NIFT entrance exam"], src: "https://www.nift.ac.in" }],
  ["design", "design", "B.Des in Interior Design"],
  ["design", "design", "B.Des in Product Design"],
  ["design", "design", "B.Des in Communication Design"],
  ["design", "design", "B.Des in Textile Design", { exam: ["NIFT entrance exam", "NID DAT"] }],
  ["design", "design", "B.F.Tech (Fashion Technology, NIFT)", { stream: ["PCM"], elig: "Class 12 with Physics, Chemistry and Maths", exam: ["NIFT entrance exam"], src: "https://www.nift.ac.in" }],
  ["design", "design", "B.Sc in Interior Design", { dur: "3 years", exam: ["University or institute entrance", "Merit"] }],
  // Architecture and Planning
  ["architecture-and-planning", "arch", "B.Arch (Bachelor of Architecture)"],
  ["architecture-and-planning", "arch", "B.Plan (Bachelor of Planning)", { dur: "4 years", exam: ["JEE Main Paper 2"], src: "https://jeemain.nta.nic.in" }],
  // Fine and Performing Arts
  ["fine-and-performing-arts", "fine", "BFA in Painting"],
  ["fine-and-performing-arts", "fine", "BFA in Applied Art"],
  ["fine-and-performing-arts", "fine", "BFA in Sculpture"],
  ["fine-and-performing-arts", "fine", "B.Mus (Bachelor of Music)", { dur: "3 years", elig: "Class 12 pass; audition or aptitude test", exam: ["Audition or aptitude test"] }],
  ["fine-and-performing-arts", "fine", "BPA (Bachelor of Performing Arts)", { dur: "3 years", elig: "Class 12 pass; audition or aptitude test", exam: ["Audition or aptitude test"] }],
  // Hospitality and Tourism
  ["hospitality-and-tourism", "hosp", "B.Sc in Hospitality and Hotel Administration (NCHM)", { exam: ["NCHM JEE"] }],
  ["hospitality-and-tourism", "hosp", "BBA in Hospitality Management"],
  ["hospitality-and-tourism", "hosp", "B.Sc in Culinary Arts"],
  ["hospitality-and-tourism", "hosp", "BTTM (Travel and Tourism Management)"],
  ["hospitality-and-tourism", "hosp", "B.Sc in Catering Science and Hotel Management"],
  // Aviation and Maritime
  ["aviation-and-maritime", "avi", "B.Sc in Aviation"],
  ["aviation-and-maritime", "avi", "BBA in Aviation Management"],
  ["aviation-and-maritime", "eng", "B.Tech in Aerospace Engineering", { src: "https://jeemain.nta.nic.in" }],
  ["aviation-and-maritime", "mar", "B.Tech in Marine Engineering", { dur: "4 years" }],
  ["aviation-and-maritime", "mar", "B.Sc in Nautical Science"],
  ["aviation-and-maritime", "mar", "B.Sc in Maritime Science"],
  // Sports and Physical Education
  ["sports-and-physical-education", "sports", "B.P.E.S. (Physical Education and Sports)", { src: "https://lnipe.edu.in" }],
  ["sports-and-physical-education", "sports", "B.P.Ed (Bachelor of Physical Education)", { stream: ["Graduate"], dur: "2 to 3 years (varies by university)", elig: "A bachelor's degree; fitness or sports test" }],
  ["sports-and-physical-education", "sports", "B.Sc in Sports Science"],
  ["sports-and-physical-education", "sports", "BBA in Sports Management"],
  // Vocational Education
  ["vocational-education", "voc", "B.Voc in Software Development"],
  ["vocational-education", "voc", "B.Voc in Retail Management"],
  ["vocational-education", "voc", "B.Voc in Automobile Technology"],
];

const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function buildDegrees() {
  const seen = new Set();
  return ROWS.map(([domain, fam, name, ov = {}]) => {
    const f = FAMILIES[fam];
    if (!f) throw new Error(`Unknown family ${fam} for ${name}`);
    if (!DOMAINS[domain]) throw new Error(`Unknown domain ${domain} for ${name}`);
    let slug = slugify(name);
    if (seen.has(slug)) throw new Error(`Duplicate slug ${slug}`);
    seen.add(slug);
    return {
      name, slug, level: "UG",
      categorySlug: domain, categoryName: DOMAINS[domain],
      stream: ov.stream || f.stream,
      minDuration: ov.dur || f.dur,
      eligibility: ov.elig || f.elig,
      entranceExams: ov.exam || f.exam,
      pathways: ov.careers || f.careers,
      regulator: ov.reg || f.reg,
      sourceUrl: ov.src || f.src,
      lastVerified: null,
      status: "unverified",
    };
  });
}
