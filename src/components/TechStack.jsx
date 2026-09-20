import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Cpu,
  Database,
  BarChart3,
  Terminal,
  Sparkles,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const techCategories = [
  { id: "all", label: "All Technologies", icon: Layers },
  { id: "web", label: "Frontend & Web", icon: Cpu },
  { id: "backend", label: "Backend & APIs", icon: Terminal },
  { id: "database", label: "Databases & Storage", icon: Database },
  { id: "data", label: "Data Science & AI", icon: BarChart3 },
  { id: "devops", label: "DevOps & Tooling", icon: Zap },
];

const technologies = [
  {
    id: "react",
    name: "React.js",
    category: "web",
    categoryLabel: "Frontend & Web",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    color: "#06b6d4",
    level: "Production Core",
    usedIn: "CollabBoard, RosetteSmartLife, Portfolio",
    impact: "Architected real-time collaborative interfaces syncing across 50+ concurrent sessions with sub-50ms latency.",
    tags: ["React 19", "Hooks & Custom Context", "Virtual DOM", "Framer Motion", "Component Architecture"],
    terminalCmd: "npx create-react-app app --template vite",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "web",
    categoryLabel: "Frontend & Web",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    color: "#eab308",
    level: "Mastery",
    usedIn: "All Web Applications & Full-Stack Systems",
    impact: "Modern ES6+, async/await concurrency, event loop performance, and functional reactive state.",
    tags: ["ES6+", "Async/Await", "Event Loop", "Closures & Scope", "DOM Optimization"],
    terminalCmd: "node --harmony server.js",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    categoryLabel: "Backend & Cloud",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    color: "#22c55e",
    level: "Production Core",
    usedIn: "RosetteSmartLife, CollabBoard Backend",
    impact: "Engineered non-blocking event-driven backend services serving 10+ production REST endpoints and socket streams.",
    tags: ["Event Loop", "REST APIs", "Streams", "Express Middleware", "Process Clustering"],
    terminalCmd: "npm run start:prod",
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    categoryLabel: "Backend & Cloud",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    color: "#a855f7",
    level: "Production Core",
    usedIn: "RosetteSmartLife Internship, Auth Services",
    impact: "Implemented modular RESTful routing, JWT authentication, and centralized error-handling middlewares.",
    tags: ["RESTful Routing", "JWT Auth", "CORS & Security", "Error Middlewares", "Rate Limiting"],
    terminalCmd: "app.use(express.json());",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "database",
    categoryLabel: "Databases & Storage",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    color: "#3b82f6",
    level: "Production Core",
    usedIn: "RosetteSmartLife (PERN Stack), FinTech Ledger",
    impact: "Optimized relational schemas and B-tree indexes, reducing average query response times by 15%.",
    tags: ["ACID Compliance", "B-Tree Indexing", "Complex Joins", "Foreign Keys", "Performance Tuning"],
    terminalCmd: "psql -U postgres -d enterprise_db",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "database",
    categoryLabel: "Databases & Storage",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    color: "#10b981",
    level: "Advanced",
    usedIn: "CollabBoard Workspaces, MERN Systems",
    impact: "Designed document aggregation pipelines and nested board/task collections for rapid reads and writes.",
    tags: ["Aggregation Pipeline", "Mongoose ODM", "Index Tuning", "Document Modeling"],
    terminalCmd: "mongosh mongodb+srv://cluster0",
  },
  {
    id: "python",
    name: "Python",
    category: "data",
    categoryLabel: "Data Science & AI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    color: "#38bdf8",
    level: "Advanced / Research",
    usedIn: "Nandini Price Modeling, ICKACS-2026, RFM Pipelines",
    impact: "Authored empirical ML pipelines evaluating price elasticity, demand regression, and customer clustering.",
    tags: ["Machine Learning", "Pandas & NumPy", "Scikit-Learn", "Data Pipelines", "Automation"],
    terminalCmd: "python3 -m pip install -r requirements.txt",
  },
  {
    id: "sql",
    name: "SQL & MySQL",
    category: "database",
    categoryLabel: "Databases & Storage",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    color: "#f97316",
    level: "Advanced",
    usedIn: "Enterprise Business Analytics & Financial Audits",
    impact: "Crafted complex CTEs, window functions (ROW_NUMBER, DENSE_RANK), and multi-table balance reconciliations.",
    tags: ["Window Functions", "CTEs", "Query Optimization", "Schema Normalization", "Reconciliation"],
    terminalCmd: "SELECT rank() OVER (PARTITION BY cat ORDER BY val DESC);",
  },
  {
    id: "socketio",
    name: "Socket.io",
    category: "web",
    categoryLabel: "Frontend & Web",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg",
    color: "#818cf8",
    level: "Production Ready",
    usedIn: "CollabBoard Real-Time State Sync",
    impact: "Engineered bi-directional event streams for real-time drag-and-drop state sync across 50+ clients.",
    tags: ["WebSockets", "Rooms & Namespaces", "Event Broadcasting", "State Sync"],
    terminalCmd: "io.on('connection', (socket) => { ... });",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "web",
    categoryLabel: "Frontend & Web",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    color: "#38bdf8",
    level: "Expert",
    usedIn: "Portfolio, Production Web Portals",
    impact: "Crafted high-craft editorial design systems with customized tokens, dark/light modes, and micro-animations.",
    tags: ["Design Systems", "Custom Tokens", "Flexbox & Grid", "Responsive Layouts"],
    terminalCmd: "@layer components { .theme-card { ... } }",
  },
  {
    id: "scikitlearn",
    name: "Scikit-learn",
    category: "data",
    categoryLabel: "Data Science & AI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
    color: "#f59e0b",
    level: "Research Core",
    usedIn: "ICKACS-2026 Conference Paper, RFM Segmentation",
    impact: "Built predictive classification and regression models evaluating customer churn and dynamic pricing models.",
    tags: ["Regression", "Clustering (K-Means)", "Cross-Validation", "Feature Scaling"],
    terminalCmd: "from sklearn.ensemble import RandomForestRegressor",
  },
  {
    id: "pandas",
    name: "Pandas & NumPy",
    category: "data",
    categoryLabel: "Data Science & AI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
    color: "#ec4899",
    level: "Advanced",
    usedIn: "Data Preprocessing, Empirical Research",
    impact: "Engineered vectorized data pipelines processing raw retail datasets into clean feature matrices.",
    tags: ["Vectorized Operations", "Data Wrangling", "Feature Engineering", "Aggregation"],
    terminalCmd: "df.groupby('segment').agg({'revenue': 'sum'})",
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "devops",
    categoryLabel: "DevOps & Tooling",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    color: "#f43f5e",
    level: "Advanced",
    usedIn: "All Engineering Projects & Team Collaborations",
    impact: "Maintained branch protection, pull request reviews, merge resolution, and git flow release cadences.",
    tags: ["Git Flow", "Branch Strategy", "GitHub Actions", "Semantic Releases"],
    terminalCmd: "git checkout -b feature/production-release",
  },
  {
    id: "streamlit",
    name: "Streamlit",
    category: "data",
    categoryLabel: "Data Science & AI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg",
    color: "#ff4b4b",
    level: "Production Ready",
    usedIn: "Enterprise RAG Query Assistant",
    impact: "Rapidly converted Python AI and RAG question answering pipelines into interactive web client tools.",
    tags: ["Rapid Prototyping", "RAG UI", "Session State", "Data Exploration"],
    terminalCmd: "streamlit run app.py --server.port 8501",
  },
  {
    id: "postman",
    name: "Postman",
    category: "devops",
    categoryLabel: "DevOps & Tooling",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
    color: "#f97316",
    level: "Advanced",
    usedIn: "RosetteSmartLife API Testing & Documentation",
    impact: "Automated REST endpoint test suites, environment variable schemas, and QA regression validation.",
    tags: ["API Testing", "Collection Runner", "Environment Variables", "Automated QA"],
    terminalCmd: "newman run api_test_collection.json",
  },
  {
    id: "java",
    name: "Java",
    category: "backend",
    categoryLabel: "Backend & Cloud",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    color: "#ea580c",
    level: "Academic Core",
    usedIn: "BCA & MSc Computing, OOP Architectures",
    impact: "Deep foundation in object-oriented principles, design patterns, multithreading, and memory models.",
    tags: ["OOP", "Collections Framework", "Multithreading", "JVM", "Design Patterns"],
    terminalCmd: "javac Main.java && java Main",
  },
];

export default function TechStack() {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTech, setSelectedTech] = useState(technologies[0]); // default to React

  const filteredTech = technologies.filter(
    (t) => activeCategory === "all" || t.category === activeCategory
  );

  return (
    <section
      id="skills"
      className="relative w-full py-24 md:py-32 overflow-hidden border-t border-black/5 dark:border-white/5"
    >
      {/* Watermark Section Number */}
      <div
        className="absolute left-4 md:left-12 top-12 font-heading font-black select-none pointer-events-none opacity-[0.035] dark:opacity-[0.05]"
        style={{
          fontSize: "clamp(8rem, 20vw, 20rem)",
          lineHeight: 0.75,
          color: "var(--text-primary)",
        }}
      >
        03
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-violet-600 dark:text-violet-400 font-semibold tracking-wider uppercase">
                // 03. CAPABILITY MATRIX & RUNTIME
              </span>
            </div>
            <h2
              className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase"
              style={{ color: "var(--text-primary)" }}
            >
              Interactive <br className="hidden md:inline" />
              <span style={{ color: "var(--accent-violet)" }}>
                Tech Operating System.
              </span>
            </h2>
          </div>
        </div>

        {/* Dynamic Category Dock Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 overflow-x-auto no-scrollbar">
          {techCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer border shrink-0 ${
                  isActive
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25 border-violet-500"
                    : "text-gray-600 dark:text-gray-400 border-black/10 dark:border-white/10 hover:border-violet-500/40 hover:text-black dark:hover:text-white"
                }`}
                style={{
                  backgroundColor: isActive
                    ? undefined
                    : isDark
                    ? "rgba(14, 17, 28, 0.6)"
                    : "#ffffff",
                  borderColor: isActive
                    ? undefined
                    : isDark
                    ? "rgba(255, 255, 255, 0.1)"
                    : "#cbd5e1",
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-black/5 dark:bg-white/10 text-gray-500"
                  }`}
                >
                  {cat.id === "all"
                    ? technologies.length
                    : technologies.filter((t) => t.category === cat.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Interactive Workspace: Left Grid Modules & Right Live Telemetry Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Glowing Tech Module Grid */}
          <div className="lg:col-span-7">
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5"
            >
              <AnimatePresence>
                {filteredTech.map((tech) => {
                  const isSelected = selectedTech?.id === tech.id;
                  return (
                    <motion.div
                      layout
                      key={tech.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      onClick={() => setSelectedTech(tech)}
                      onMouseEnter={() => setSelectedTech(tech)}
                      className={`relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden ${
                        isSelected
                          ? "ring-2 shadow-xl"
                          : "hover:border-violet-500/50"
                      }`}
                      style={{
                        backgroundColor: isDark
                          ? isSelected
                            ? "rgba(25, 28, 42, 0.95)"
                            : "rgba(14, 17, 28, 0.75)"
                          : isSelected
                          ? "#ffffff"
                          : "#ffffff",
                        borderColor: isSelected
                          ? tech.color
                          : isDark
                          ? "var(--border-subtle)"
                          : "#cbd5e1",
                        ringColor: tech.color,
                        boxShadow: isSelected
                          ? `0 12px 30px -10px ${tech.color}40, 0 0 15px -3px ${tech.color}30`
                          : isDark
                          ? undefined
                          : "0 2px 8px -2px rgba(15, 23, 42, 0.08)",
                      }}
                    >
                      {/* Ambient corner radial glow */}
                      <div
                        className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                        style={{ backgroundColor: tech.color }}
                      />

                      {/* Header Row: Logo */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div
                          className="w-11 h-11 rounded-xl p-2 flex items-center justify-center border shadow-sm transition-transform duration-300 group-hover:scale-110"
                          style={{
                            backgroundColor: isDark
                              ? "rgba(255, 255, 255, 0.05)"
                              : "#f8fafc",
                            borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1",
                          }}
                        >
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            loading="lazy"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Tech Name & Category/Tier */}
                      <div>
                        <h4
                          className="font-display font-bold text-sm truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {tech.name}
                        </h4>
                        <div className="flex flex-col gap-0.5 mt-1 font-mono">
                          <span className="text-[10px] text-gray-500 truncate">
                            {tech.categoryLabel.split(" ")[0]}
                          </span>
                          <span
                            className="font-semibold text-[9px] uppercase tracking-wider truncate"
                            style={{ color: tech.color }}
                          >
                            {tech.level}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Column: Live Telemetry & Inspector HUD */}
          <div className="lg:col-span-5 sticky top-28">
            <AnimatePresence mode="wait">
              {selectedTech && (
                <motion.div
                  key={selectedTech.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="theme-card p-6 sm:p-7 rounded-3xl border relative overflow-hidden shadow-2xl"
                  style={{
                    backgroundColor: isDark ? "rgba(14, 17, 28, 0.95)" : "#ffffff",
                    borderColor: isDark ? `${selectedTech.color}50` : `${selectedTech.color}70`,
                    boxShadow: isDark
                      ? `0 25px 60px -20px rgba(0,0,0,0.8), 0 0 35px -10px ${selectedTech.color}30`
                      : `0 20px 45px -15px rgba(15, 23, 42, 0.12), 0 0 25px -8px ${selectedTech.color}30`,
                  }}
                >
                  {/* Top Ambient Glow Line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{
                      background: `linear-gradient(90deg, ${selectedTech.color}, transparent 80%)`,
                    }}
                  />

                  {/* Inspector Header */}
                  <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-14 h-14 rounded-2xl p-2.5 flex items-center justify-center border shadow-md relative"
                        style={{
                          backgroundColor: isDark
                            ? "rgba(255, 255, 255, 0.05)"
                            : "#f8fafc",
                          borderColor: `${selectedTech.color}60`,
                          boxShadow: `0 0 20px ${selectedTech.color}25`,
                        }}
                      >
                        <img
                          src={selectedTech.icon}
                          alt={selectedTech.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3
                            className="font-display font-black text-2xl"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {selectedTech.name}
                          </h3>
                          <span
                            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider"
                            style={{
                              backgroundColor: `${selectedTech.color}15`,
                              borderColor: `${selectedTech.color}40`,
                              color: selectedTech.color,
                            }}
                          >
                            {selectedTech.level}
                          </span>
                        </div>
                        <div className="font-mono text-xs text-gray-500 mt-0.5">
                          {selectedTech.categoryLabel} // Verified Competency
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Impact & Role in Systems */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 font-semibold block mb-1.5">
                        // Verified Production Impact
                      </span>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {selectedTech.impact}
                      </p>
                    </div>

                    {/* Applied in Project */}
                    <div
                      className="p-3.5 rounded-xl border flex items-center justify-between gap-3"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(255, 255, 255, 0.02)"
                          : "#f8fafc",
                        borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1",
                      }}
                    >
                      <div>
                        <div className="font-mono text-[10px] uppercase text-gray-500 font-semibold">
                          Implemented In Workflows:
                        </div>
                        <div
                          className="font-mono text-xs font-bold mt-0.5"
                          style={{ color: selectedTech.color }}
                        >
                          {selectedTech.usedIn}
                        </div>
                      </div>
                      <Sparkles
                        className="w-4 h-4 shrink-0"
                        style={{ color: selectedTech.color }}
                      />
                    </div>

                    {/* Architectural Competency Tags */}
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 font-semibold block mb-2">
                        // Core Architectural Concepts
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedTech.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="font-mono text-[11px] px-2.5 py-1 rounded-md border flex items-center gap-1.5 font-medium"
                            style={{
                              backgroundColor: isDark
                                ? "rgba(255, 255, 255, 0.03)"
                                : "#f1f5f9",
                              borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1",
                              color: "var(--text-primary)",
                            }}
                          >
                            <CheckCircle2
                              className="w-3 h-3 shrink-0"
                              style={{ color: selectedTech.color }}
                            />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Terminal Invocation Snippet */}
                    <div className="pt-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 font-semibold block mb-1.5 flex items-center gap-1.5">
                        <Terminal className="w-3 h-3 text-violet-500" />
                        CLI Execution / Runtime Signature
                      </span>
                      <div
                        className="p-3 rounded-xl font-mono text-xs text-emerald-400 bg-black/90 border border-white/10 overflow-x-auto shadow-inner"
                      >
                        <span className="text-gray-500 select-none">$ </span>
                        {selectedTech.terminalCmd}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
