/**
 * Centralized Portfolio Data Configuration
 * All personal information, projects, skills, education, and experience for Prashma Poojary.
 */

export const personalInfo = {
  name: "Prashma Poojary",
  firstName: "Prashma",
  lastName: "Poojary",
  primaryTitle: "Full Stack Web Developer",
  secondaryTitle: "Data Analyst",
  location: "Udupi / Manipal, Karnataka, India",
  cgpa: "9.16",
  heroStats: "9.16 CGPA • 9 projects • 25+ tech",
  summary:
    "Full-Stack Web Developer and MSc Computer Science student with hands-on experience building scalable, production-ready applications using React, Node.js, Express, MongoDB, and PostgreSQL. Skilled in designing secure REST APIs, JWT-based authentication, role-based access control, and real-time features with Socket.io. Comfortable across the full development lifecycle — from database schema design to deployment — with a strong focus on clean architecture, performance optimisation, and agile collaboration.",
  extendedSummary:
    "I also work as a data analyst: turning raw business data into actionable insights using Python, SQL, and BI tools such as Power BI and Tableau, with experience in customer segmentation, predictive modelling (churn, demand forecasting, pricing), and NLP-driven sentiment analysis. I also have exposure to Generative AI (RAG, LangChain, multi-agent workflows) and CI/CD pipelines.",
  currentFocus: [
    "Full-Stack Web Development (PERN / MERN)",
    "Real-time applications (Socket.io)",
    "Data Analytics & BI dashboards",
    "NLP and Machine Learning",
    "Generative AI (RAG, multi-agent systems)",
    "CI/CD & Cloud Deployment",
  ],
  contact: {
    email: "prashmapoojary@gmail.com",
    phone: "+91-7411795077",
    showPhone: false, // Single toggle to hide/show phone number in the public UI
    linkedin: "https://www.linkedin.com/in/prashma-poojary-3843522b5",
    github: "https://github.com/prashmapoojary",
    instagram: "", // Placeholder - replace when provided
    profileImage: "/assets/profile.jpg",
    resumePdf: "/assets/resume.pdf",
  },
};

export const skillsData = {
  categories: [
    {
      title: "Languages",
      skills: ["JavaScript", "Python", "SQL", "Java"],
    },
    {
      title: "Frontend",
      skills: ["React.js", "Redux", "HTML5", "CSS3", "Tailwind CSS"],
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "Socket.io"],
    },
    {
      title: "Databases",
      skills: ["MongoDB", "PostgreSQL", "MySQL"],
    },
    {
      title: "Data Analytics & Visualization",
      skills: ["Power BI", "Tableau", "Excel", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    },
    {
      title: "Machine Learning & NLP",
      skills: [
        "Scikit-learn",
        "XGBoost",
        "Prophet",
        "Regression & Classification",
        "Customer Segmentation (RFM)",
        "Hugging Face Transformers",
        "BERTopic",
        "Sentiment Analysis",
        "Topic Modeling",
      ],
    },
    {
      title: "Generative AI",
      skills: ["RAG", "LangChain"],
    },
    {
      title: "DevOps & Tools",
      skills: [
        "Git",
        "GitHub",
        "CI/CD",
        "Postman",
        "VS Code",
        "Jupyter Notebook",
        "Streamlit",
        "Agile Development",
      ],
    },
  ],
  // Flat list with icons for the interactive capabilities grid
  techStackIcons: [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/react/react-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/javascript/javascript-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/nodejs/nodejs-original.svg" },
    { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/express/express-original.svg" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/postgresql/postgresql-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/mongodb/mongodb-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/python/python-original.svg" },
    { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/mysql/mysql-original.svg" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/java/java-original.svg" },
    { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Socket.io", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/socketio/socketio-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/git/git-original.svg" },
    { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/pandas/pandas-original.svg" },
    { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/numpy/numpy-original.svg" },
    { name: "Scikit-learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/scikitlearn/scikitlearn-original.svg" },
    { name: "Streamlit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/streamlit/streamlit-original.svg" },
    { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/postman/postman-original.svg" },
  ],
};

/**
 * Projects Categories Order:
 * 1. Full Stack Web Developer
 * 2. Data Analytics
 * 3. Generative AI
 * 4. DevOps
 * 5. Data Science — RESERVED. Not rendered until >= 1 project added.
 */
export const projectCategories = [
  "Full Stack Web Developer",
  "Data Analytics",
  "Generative AI",
  "DevOps",
  "Data Science", // Reserved
];

export const projectsData = [
  {
    id: "collab-board",
    num: "01",
    title: "Real-Time Team Collaboration Board",
    category: "Full Stack Web Developer",
    date: "August 2026",
    status: "Live Production",
    technologies: ["React.js", "Node.js", "Express.js", "Socket.io", "MongoDB", "JWT"],
    description:
      "A Trello-style task management app with real-time drag-and-drop board updates using Socket.io, syncing changes instantly across 50+ concurrent user sessions without page refresh.",
    highlights: [
      "JWT-based team workspaces with role permissions (owner / editor / viewer)",
      "Activity logs for audit tracking across projects",
      "Aimed at reducing task-status miscommunication",
    ],
    metricNotes: "50+ concurrent sessions verified via Socket.io stress testing during peak board edits.",
    links: {
      github: "https://github.com/prashmapoojary/CollabBoard",
      live: "https://collabboard-8m5c.onrender.com/dashboard",
    },
    video: "",
    image: "",
    color: "#3d2fa9",
    accent: "#6366f1",
    quote: "A real-time workspace syncing state seamlessly across distributed teams.",
    quoteRole: "Real-Time Systems",
    isMobile: false,
  },
  {
    id: "my-finance-app",
    num: "02",
    title: "My Finance App",
    category: "Full Stack Web Developer",
    date: "May 2026",
    status: "Live Production",
    technologies: ["React.js", "Node.js", "Express.js", "PostgreSQL", "JWT", "REST API"],
    description:
      "A full-stack personal finance platform with JWT-based secure authentication and protected routes, enabling complete CRUD operations for wallets, transactions, and monthly budgets.",
    highlights: [
      "Automated balance reconciliation logic on transaction add/delete",
      "Financial reporting APIs for income, expense, and net savings insights across user accounts",
    ],
    metricNotes: "ACID compliance enforced across relational PostgreSQL transactions and wallet balances.",
    links: {
      github: "https://github.com/prashmapoojary/MyFinanceApp",
      live: "https://my-finance-app-b2h7.vercel.app/login",
    },
    video: "",
    image: "",
    color: "#0f766e",
    accent: "#14b8a6",
    quote: "Ensuring ACID transactions and continuous balance reconciliation.",
    quoteRole: "Financial Architecture",
    isMobile: false,
  },
  {
    id: "stock-management",
    num: "03",
    title: "Stock Management System",
    category: "Full Stack Web Developer",
    date: "July 2026",
    status: "Live Production",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "REST API"],
    description:
      "A full-stack stock management application for real-time inventory control, multi-warehouse tracking, product catalogs, and automated low-stock threshold alerts.",
    highlights: [
      "Real-time inventory level tracking and automated low-stock threshold notifications",
      "Multi-warehouse product catalog management and audit logs for stock movements",
    ],
    metricNotes: "Improves stock tracking speed and eliminates catalog sync discrepancies.",
    links: {
      github: "https://github.com/prashmapoojary/stock-management",
      live: "https://stock-management-7aiz.vercel.app/",
    },
    video: "",
    image: "",
    color: "#b45309",
    accent: "#f59e0b",
    quote: "Inventory management and real-time stock balance monitoring.",
    quoteRole: "Inventory Systems",
    isMobile: false,
  },
  {
    id: "college-portal",
    num: "04",
    title: "College Website Portal",
    category: "Full Stack Web Developer",
    date: "August 2025",
    status: "Deployed System",
    technologies: ["MongoDB", "React.js", "Express.js", "Node.js", "REST API", "Tailwind CSS"],
    description:
      "A full-stack college portal serving 500+ users with complete CRUD operations for student applications, course enrolments, and user profile management.",
    highlights: [
      "Secure role-based admin panel with persistent MongoDB storage",
      "Reduced estimated manual administrative effort by 40%",
    ],
    metricNotes: "500+ users calculated from active enrolled student roster and administrative staff accounts; 40% effort reduction estimated by benchmark comparing manual paper forms vs digital processing.",
    links: {
      github: "https://github.com/prashmapoojary/college-website-portal",
      live: "https://college-portal-demo.vercel.app/",
    },
    video: "",
    image: "",
    color: "#1e3a8a",
    accent: "#3b82f6",
    quote: "Empowering students and faculties with centralized portal operations.",
    quoteRole: "Campus Web Infrastructure",
    isMobile: false,
  },
  {
    id: "ecommerce-intel",
    num: "05",
    title: "E-Commerce Intelligence Platform",
    category: "Data Analytics",
    date: "August 2026",
    status: "Live Application",
    technologies: ["Python", "SQL", "Scikit-learn", "Power BI", "Tableau", "Streamlit"],
    description:
      "An end-to-end analytics pipeline on e-commerce sales data, with RFM customer segments and interactive Power BI/Tableau dashboards for revenue, retention, and delivery insights.",
    highlights: [
      "Churn prediction and demand forecasting models using XGBoost and Prophet",
      "Enables data-driven retention targeting and inventory planning",
    ],
    metricNotes: "RFM segmentation models classifying 10,000+ customer transaction records into actionable retention cohorts.",
    links: {
      github: "https://github.com/prashmapoojary/ecommerce-intelligence-platform",
      live: "https://e-commerce-diqiphympzqzitaietnt5a.streamlit.app/",
    },
    video: "",
    image: "",
    color: "#065f46",
    accent: "#10b981",
    quote: "Actionable retention intelligence backed by XGBoost and Prophet forecasts.",
    quoteRole: "Predictive Analytics",
    isMobile: false,
  },
  {
    id: "pricing-engine",
    num: "06",
    title: "Dynamic Pricing Strategy — Nandini Dairy Products",
    category: "Data Analytics",
    date: "August 2026",
    status: "Published at ICKACS-2026",
    technologies: ["Python", "Machine Learning", "Scikit-learn", "Streamlit", "Power BI"],
    description:
      "A machine learning pricing strategy and demand elasticity optimization model for Nandini Dairy Products, presented at the International Conference on Knowledge Acquisition in Computer Science (ICKACS-2026).",
    highlights: [
      "Published and presented at ICKACS-2026 (Kongunadu Arts & Science College, Coimbatore)",
      "Interactive simulation evaluating price-revenue impact and competitor price gaps",
      "Demand elasticity estimation maximizing category revenues",
    ],
    metricNotes: "Verified Conference Paper & Presentation Certificate at ICKACS-2026.",
    links: {
      github: "https://github.com/prashmapoojary/nandini-pricing-strategy",
      live: "https://nandini-pricing-engine.streamlit.app/",
      paper: "/assets/resume.pdf",
    },
    video: "",
    image: "",
    color: "#831843",
    accent: "#ec4899",
    quote: "Maximizing category revenue through statistical elasticity estimation and machine learning.",
    quoteRole: "Pricing Optimization & Research",
    isMobile: false,
  },
  {
    id: "review-intel",
    num: "07",
    title: "Customer Review Intelligence System",
    category: "Data Analytics",
    date: "September 2026",
    status: "NLP Pipeline",
    technologies: ["Python", "Hugging Face Transformers", "BERTopic", "Tableau", "Streamlit"],
    description:
      "An NLP pipeline using transformer-based sentiment analysis and topic modeling to extract complaint/praise themes from thousands of customer reviews.",
    highlights: [
      "Risk-scoring system flagging products with rising negative sentiment",
      "Tableau early-warning dashboard for product teams",
    ],
    metricNotes: "Transformer-based NLP classifying review sentiment across 5,000+ customer feedback entries.",
    links: {
      github: "https://github.com/prashmapoojary/review-intelligence-system",
      live: "https://customer-review-intel.streamlit.app/",
    },
    video: "",
    image: "",
    color: "#581c87",
    accent: "#a855f7",
    quote: "Extracting latent customer sentiment and automated early-warning alerts.",
    quoteRole: "NLP Intelligence",
    isMobile: false,
  },
  {
    id: "multi-agent-assistant",
    num: "08",
    title: "Multi-Agent Research & Report Assistant",
    category: "Generative AI",
    date: "June 2026",
    status: "Live Application",
    technologies: ["Python", "LangChain", "Streamlit", "OpenAI API", "Multi-Agent Architecture"],
    description:
      "An autonomous multi-agent research assistant that coordinates web searching, literature synthesis, and automated Markdown report generation with structured citations.",
    highlights: [
      "Autonomous multi-agent collaboration for automated web research and synthesis",
      "Structured Markdown report generation with citations and automated executive summaries",
    ],
    metricNotes: "Multi-agent graph executing parallel research web queries and citation verification.",
    links: {
      github: "https://github.com/prashmapoojary/multi-agent-research-assistant",
      live: "https://multi-agent-research-report-assistant-h2hzojlys6appof4re6appvw.streamlit.app/",
    },
    video: "",
    image: "",
    color: "#1e1b4b",
    accent: "#6366f1",
    quote: "Coordinated agent workflows delivering automated research syntheses.",
    quoteRole: "Multi-Agent Systems",
    isMobile: false,
  },
  {
    id: "rag-qa",
    num: "09",
    title: "Enterprise RAG Q&A System",
    category: "Generative AI",
    date: "May 2026",
    status: "Live Application",
    technologies: ["Python", "LangChain", "FAISS", "Streamlit", "Hugging Face", "Vector Search"],
    description:
      "A Retrieval-Augmented Generation (RAG) system for context-grounded question answering over enterprise documents using vector embeddings and FAISS similarity search.",
    highlights: [
      "Semantic vector search over enterprise documents using FAISS and embeddings",
      "Context-aware grounding to prevent LLM hallucinations with source document citations",
    ],
    metricNotes: "Sub-second vector retrieval over chunked PDF knowledge bases using FAISS indexes.",
    links: {
      github: "https://github.com/prashmapoojary/rag-qa-system",
      live: "https://rag-app-project-fsrbidfj8q3sebytbcycxz.streamlit.app/",
    },
    video: "",
    image: "",
    color: "#311042",
    accent: "#c084fc",
    quote: "Context-aware question answering with semantic document grounding.",
    quoteRole: "Generative AI / RAG",
    isMobile: false,
  },
];

export const experienceData = [
  {
    id: 1,
    period: "Feb 2026 – Jul 2026",
    type: "Work Experience",
    title: "Web Developer Intern",
    org: "RosetteSmartLife Company — Manipal, Karnataka",
    shortDesc: "Full Stack Development | PERN Stack (PostgreSQL, Express, React, Node)",
    color: "#f97316",
    accent: "#ea580c",
    icon: "💼",
    tags: ["PostgreSQL", "Express.js", "React.js", "Node.js", "REST APIs", "Performance"],
    achievement: "Production REST APIs & Query Optimization",
    side: "left",
    gapMonths: 0,
    bullets: [
      "Developed and shipped 10+ REST API endpoints using the PERN stack (PostgreSQL, Express.js, React.js, Node.js); optimised database schemas and indexes, reducing average query response time by 15%.",
      "Collaborated with the engineering team on release cycles, integrating third-party APIs and reducing data-fetch latency by approximately 20% across key application flows.",
      "Investigated and resolved 20+ production issues reported through QA, performing root-cause analysis and improving overall application stability and reliability.",
    ],
    fullDesc:
      "Developed and shipped 10+ REST API endpoints using the PERN stack (PostgreSQL, Express.js, React.js, Node.js); optimised database schemas and indexes, reducing average query response time by 15%. Collaborated with the engineering team on release cycles, integrating third-party APIs and reducing data-fetch latency by approximately 20% across key application flows. Investigated and resolved 20+ production issues reported through QA, performing root-cause analysis and improving overall application stability and reliability.",
  },
  {
    id: 2,
    period: "2024 – 2026",
    type: "Education",
    title: "Master of Science in Computer Science",
    org: "Mahatma Gandhi Memorial College (MGM College), Udupi",
    shortDesc: "CGPA: 9.16 / 10.0 — Advanced Computing, Full Stack & Analytics",
    color: "#22d3ee",
    accent: "#0891b2",
    icon: "🎓",
    tags: ["MSc Computer Science", "Algorithms", "Full-Stack Web", "Data Analytics", "Generative AI"],
    achievement: "CGPA: 9.16 / 10.0",
    side: "right",
    gapMonths: 4,
    bullets: [
      "Secured outstanding 9.16 / 10.0 CGPA specializing in advanced algorithms, web engineering, and machine learning pipelines.",
      "Led end-to-end coursework projects in distributed databases, real-time web applications, and predictive modeling.",
    ],
    fullDesc:
      "Advanced studies in Computer Science focusing on modern software engineering, web architectures, distributed systems, and machine learning. Hands-on exploration of production web stacks, database optimization, predictive modeling pipelines, and Generative AI workflows.",
  },
  {
    id: 3,
    period: "2021 – 2024",
    type: "Education",
    title: "Bachelor of Computer Application",
    org: "Mahatma Gandhi Memorial College (MGM College), Udupi",
    shortDesc: "CGPA: 9.52 / 10.0 — First Class with Distinction",
    color: "#a78bfa",
    accent: "#7c3aed",
    icon: "🏫",
    tags: ["BCA", "Data Structures", "Java", "SQL", "Database Design", "Web Basics"],
    achievement: "CGPA: 9.52 / 10.0 (Distinction)",
    side: "left",
    gapMonths: 18,
    bullets: [
      "Graduated First Class with Distinction (9.52 / 10.0 CGPA) at Mahatma Gandhi Memorial College.",
      "Core coursework mastery in Data Structures, Object-Oriented Java, Database Design, and Web Architectures.",
    ],
    fullDesc:
      "Solid ground in core computer science disciplines: object-oriented programming, data structures and algorithms, database management systems, and web technologies. Consistently maintained exceptional academic performance, graduating with high distinction.",
  },
  {
    id: 4,
    period: "Jul – Oct 2025",
    type: "Certifications",
    title: "Elite IIT Certifications — Big Data & Machine Learning",
    org: "NPTEL, IIT Kanpur & IIT Kharagpur (Swayam, MoE Govt. of India)",
    shortDesc: "Top 2% Nationwide Topper in Big Data Computing (IIT Kanpur, 93% Score, Perfect 25/25 Assignments) & Elite Certified in Machine Learning (IIT Kharagpur)",
    color: "#10b981",
    accent: "#059669",
    icon: "📜",
    tags: ["Top 2% Topper", "Big Data Computing", "IIT Kanpur", "Machine Learning", "IIT Kharagpur", "NPTEL Swayam"],
    achievement: "Top 2% National Topper (93%)",
    pdfUrl: "/assets/Big Data Computing-Certificate.pdf",
    mlPdfUrl: "/assets/Machine learning certificate.pdf",
    side: "right",
    gapMonths: 24,
    bullets: [
      "Secured prestigious 'Top 2% Topper' nationwide ranking in 'Big Data Computing' from IIT Kanpur with a 93% consolidated score (Perfect 25/25 Online Assignments, 68.25/75 Proctored Exam) out of 5,740 certified candidates (Roll: NPTEL25CS131S1262900294).",
      "Awarded Elite Online Certification in 'Introduction to Machine Learning' from IIT Kharagpur with a 61% consolidated score (22.08/25 Online Assignments) out of 9,715 certified candidates (Roll: NPTEL25CS149S641600166).",
      "Rigorous 8-week proctored curriculums covering MapReduce programming paradigms, Hadoop Distributed File System (HDFS), distributed clustering, and supervised machine learning pipelines.",
    ],
    fullDesc:
      "Completed rigorous Ministry of Education (MoE, Govt. of India) funded NPTEL Swayam certifications: Recognized as a 'Top 2% Topper' nationwide in Big Data Computing certified by IIT Kanpur, achieving an outstanding 93% consolidated score with a perfect 25/25 in online assignments among 5,740 certified candidates. Concurrently earned the Elite certification in Introduction to Machine Learning certified by IIT Kharagpur covering foundational and modern algorithmic machine learning across 9,715 certified candidates.",
  },
  {
    id: 5,
    period: "Aug 2026",
    type: "Publication",
    title: "A Study on Pricing Strategy for Nandini Dairy Products Using Machine Learning Models",
    org: "ICKACS-2026 — Kongunadu Arts and Science College (Autonomous), Coimbatore",
    shortDesc: "International Conference on Knowledge Acquisition in Computer Science (21–22 Aug 2026)",
    color: "#ec4899",
    accent: "#db2777",
    icon: "📄",
    tags: ["Machine Learning", "Pricing Strategy", "Demand Elasticity", "Research Publication", "ICKACS-2026"],
    achievement: "Conference Presentation Certificate Verified",
    pdfUrl: "/assets/Prashma Poojary.pdf",
    side: "left",
    gapMonths: 2,
    bullets: [
      "Presented empirical research paper on dynamic pricing strategy and demand elasticity optimization for Nandini Dairy Products.",
      "Evaluated machine learning regression and forecasting models against competitor pricing and seasonal milk supply indices.",
      "Verified conference presentation certificate issued by ICKACS-2026, Kongunadu Arts & Science College, Coimbatore.",
    ],
    fullDesc:
      "Authored and presented research paper entitled 'A Study on Pricing Strategy for Nandini Dairy Products Using Machine Learning Models' at the International Conference on Knowledge Acquisition in Computer Science: Techniques, Challenges, and Emerging Trends (ICKACS-2026), organized by the Department of Computer Science (SF), Kongunadu Arts and Science College (Autonomous), Coimbatore, Tamil Nadu on 21st & 22nd August 2026.",
  },
];
