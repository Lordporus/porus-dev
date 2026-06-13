export interface Project {
  id: string;
  index: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  gradient: string;
  isPlaceholder?: boolean;
}

export const projects: Project[] = [
  {
    id: '001',
    index: '#001',
    title: 'AI Data Analyzer',
    description:
      'A full-stack SaaS platform that lets users upload datasets and extract instant AI-powered insights. Built on FastAPI, Streamlit, Celery, and Supabase — deployed on AWS EC2 with Nginx and Cloudflare SSL. Features usage-gated AI Insights, Razorpay payments, and a per-user analytics dashboard.',
    techStack: ['Python', 'FastAPI', 'Streamlit', 'Supabase', 'AWS', 'Celery', 'Docker'],
    liveUrl: 'https://buildwithporus.qzz.io',
    githubUrl: '#',
    gradient: 'from-blue-900/40 via-indigo-950/40 to-purple-950/40',
  },
  {
    id: '002',
    index: '#002',
    title: 'Jarvis AI Assistant',
    description:
      'A production-ready conversational AI assistant built for real-world deployment. Jarvis combines LangChain, Groq\'s LLM API, and FAISS vector memory to deliver fast, context-aware responses with streaming output. Designed as a scalable personal AI — extensible with tools, APIs, and custom knowledge bases.',
    techStack: ['Python', 'FastAPI', 'LangChain', 'Groq', 'FAISS', 'SSE Streaming'],
    liveUrl: 'https://jarvisforeveryone.com',
    githubUrl: '#',
    gradient: 'from-emerald-900/40 via-teal-950/40 to-cyan-950/40',
  },
  {
    id: '003',
    index: '#003',
    title: 'AI Outbound Lab',
    description:
      'A production-ready web application that helps sales teams and founders generate high-converting outbound messages using AI. Paste a prospect\'s profile, choose your tone and goal, and get personalized cold emails, LinkedIn DMs, and follow-ups in seconds — powered by Groq\'s LLM API.',
    techStack: ['React', 'Node.js', 'Groq', 'REST API'],
    liveUrl: '#',
    githubUrl: '#',
    gradient: 'from-amber-900/30 via-orange-950/30 to-rose-950/30',
  },
  {
    id: '004',
    index: '#004',
    title: 'project_loading...',
    description: 'Currently in development. ETA: Soon™',
    techStack: [],
    liveUrl: '#',
    githubUrl: '#',
    gradient: 'from-gray-800/30 to-gray-900/30',
    isPlaceholder: true,
  },
  {
    id: '005',
    index: '#005',
    title: 'project_loading...',
    description: 'Currently in development. ETA: Soon™',
    techStack: [],
    liveUrl: '#',
    githubUrl: '#',
    gradient: 'from-gray-800/30 to-gray-900/30',
    isPlaceholder: true,
  },
  {
    id: '006',
    index: '#006',
    title: 'project_loading...',
    description: 'Currently in development. ETA: Soon™',
    techStack: [],
    liveUrl: '#',
    githubUrl: '#',
    gradient: 'from-gray-800/30 to-gray-900/30',
    isPlaceholder: true,
  },
];