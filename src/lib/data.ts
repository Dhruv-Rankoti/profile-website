// All portfolio content — single source of truth

export const personalInfo = {
  name: "Dhruv Rankoti",
  handle: "@DhruvRankoti",
  tagline: "building ML systems that work",
  bio: "CS Engineering student at MSIT Delhi building AI-first products. I specialize in NLP pipelines, transformer architectures, and turning research papers into deployable systems.",
  location: "Delhi, India",
  email: "dhruvrankoti@gmail.com",
  github: "https://github.com/dhruvrankoti",
  linkedin: "https://linkedin.com/in/dhruvrankoti",
  twitter: "https://x.com/DhruvRankoti",
  avatarUrl: "/avatar_pfp.jpeg",
  joinedYear: "2005",
  status: "Currently building AI hallucination detection systems",
  cgpa: "8.6 / 10.0",
};

export const stats = [
  { label: "CGPA", value: "8.6", suffix: "/10" },
  { label: "Chess Members", value: "500+", suffix: "" },
  { label: "ML Projects", value: "2+", suffix: "" },
  { label: "Mentored", value: "100+", suffix: " devs" },
];

export const aboutBullets = [
  "ML Engineer & CS student at MSIT Delhi (CGPA: 8.6/10), graduating May 2027.",
  "Building AI systems that detect LLM hallucinations with RAG pipelines and NLI classifiers.",
  "Hands-on with transformer architectures — trained a 3.2M param GPT-2 from scratch on Wikipedia.",
  "Interned at Honda Cars India Ltd., shipping production automation tools that cut manual effort by 30%.",
  "Founded U-Knighted Chess Society at MSIT, scaled it to 500+ members in one semester.",
  "Open to ML Engineering, AI/NLP, and Full Stack roles.",
];

export const experience = [
  {
    id: 1,
    role: "IT Intern",
    company: "Honda Cars India Ltd.",
    duration: "Jun 2025 – Jul 2025",
    location: "Greater Noida, India",
    logo: "/logos/Honda_Cars.png",
    bullets: [
      "Built internal sales support automation tool, streamlining call handling workflows and reducing manual effort by 30%.",
      "Collaborated with senior engineers during testing and deployment, resolving integration issues in production modules.",
      "Tested and validated features across multiple development iterations, contributing fixes during active development.",
    ],
  },
];

export const activities = [
  {
    id: 1,
    role: "Head of Data Structures & Algorithms",
    company: "Microsoft Student Chapter, MSIT",
    duration: "Aug 2024 – Aug 2025",
    location: "New Delhi, India",
    logo: "/logos/mscmsit.png",
    bullets: [
      "Mentored 100+ students through structured DSA bootcamps and problem-solving sessions.",
      "Introduced peer code reviews to improve solution efficiency and collaborative thinking.",
    ],
  },
  {
    id: 2,
    role: "Founder",
    company: "U-Knighted Chess Society, MSIT",
    duration: "Mar 2025 – Present",
    location: "New Delhi, India",
    logo: "/logos/uknightedchess.png",
    bullets: [
      "Founded and scaled the official chess society to 500+ active members within one semester.",
      "Organized inter-college tournaments and weekly strategy sessions focused on analytical thinking.",
    ],
  },
];

export const projects = [
  {
    id: 1,
    name: "SachAI",
    desc: "RAG pipeline that detects & classifies LLM hallucinations in real-time.",
    tech: ["Python", "FastAPI", "spaCy", "HuggingFace", "RAG"],
    github: "https://github.com/dhruvrankoti/SachAI-Hallucination",
    live: null,
    image: "/projects/sachAI.png",
  },
  {
    id: 2,
    name: "Mini GPT-2",
    desc: "Decoder-only transformer (3.2M params) trained from scratch on Wikipedia.",
    tech: ["Python", "PyTorch", "Transformers", "NumPy"],
    github: "https://github.com/dhruvrankoti/miniGPT",
    live: null,
    image: "/projects/minigpt2.png",
  },
  {
    id: 3,
    name: "Deepfake Detection",
    desc: "Multimodal forensic pipeline for detecting AI-manipulated media using spatial, temporal, and frequency-domain analysis.",
    tech: ["ViT", "U-Net", "LIME"],
    github: "https://github.com/dhruvrankoti/deepfake-detection",
    live: null,
    image: "/projects/deepfake.png",
  },
  {
    id: 4,
    name: "Multilingual Voicebot",
    desc: "Low-latency multilingual conversational agent with realtime speech synthesis, streaming inference, and contextual memory.",
    tech: ["SpeechRecognition", "NLP", "Text-to-Speech"],
    github: "https://github.com/dhruvrankoti/multilingual-voicebot-demo",
    live: null,
    image: "/projects/voicebot.png",
  },
];

export const education = [
  {
    institution: "Maharaja Surajmal Institute of Technology",
    degree: "B.Tech Computer Science & Engineering",
    duration: "Sep 2023 – May 2027",
    location: "Janakpuri, Delhi",
    grade: "CGPA: 8.6 / 10.0",
    current: true,
  },
  {
    institution: "Navyug School",
    degree: "CBSE Class XII – Science (PCM)",
    duration: "Aug 2022 – Apr 2023",
    location: "Sarojini Nagar, Delhi",
    grade: "91.6%",
    current: false,
  },
];

export const socialLinks = [
  {
    name: "GitHub",
    handle: "@dhruvrankoti",
    url: "https://github.com/dhruvrankoti",
    color: "#f0f6fc",
    bgColor: "rgba(240,246,252,0.05)",
    iconPath:
      "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    name: "LinkedIn",
    handle: "dhruvrankoti",
    url: "https://linkedin.com/in/dhruvrankoti",
    color: "#0a66c2",
    bgColor: "rgba(10,102,194,0.08)",
    iconPath: null,
    isLinkedIn: true,
  },
  {
    name: "X / Twitter",
    handle: "@DhruvRankoti",
    url: "https://x.com/DhruvRankoti",
    color: "#e7e9ea",
    bgColor: "rgba(231,233,234,0.05)",
    iconPath:
      "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Email",
    handle: "dhruvrankoti@gmail.com",
    url: "mailto:dhruvrankoti@gmail.com",
    color: "#ea4335",
    bgColor: "rgba(234,67,53,0.08)",
    iconPath: null,
    isEmail: true,
  },
];
