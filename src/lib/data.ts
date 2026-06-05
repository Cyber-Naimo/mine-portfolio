export const personalInfo = {
  name: "Muhammad Naimatullah Khan",
  shortName: "Naimatullah",
  initials: "NK",
  title: "DevOps Engineer",
  tagline: "2× Gold Medalist · KodeKloud CKA",
  headline: "Building Infrastructure That Handles Millions of Transactions",
  subheadline:
    "DevOps Engineer specializing in Kubernetes, CI/CD, and cloud infrastructure for mission-critical fintech systems across multiple countries.",
  email: "muhammadnaimatullahkhan99@gmail.com",
  linkedin: "https://www.linkedin.com/in/muhammad-naimatullah-khan",
  github: "https://github.com/Cyber-Naimo",
  location: "Karachi, Pakistan",
  phone: "+92 316 2604957",
  resumePdf: "/Muhammad_Naimatullah_Khan.pdf",
  bio: "I fix things before people notice they're broken, and sometimes I fix things people didn't even know needed fixing. I'm a DevOps Engineer working on fintech infrastructure that handles real financial transactions across multiple countries. Downtime here isn't just an inconvenience, it's a serious business problem. That pressure taught me to build systems that are reliable, not just good on paper.",
  stats: [
    { label: "Uptime Maintained", value: "99.9%" }, 
    { label: "Microservices Managed", value: "10+" },
    { label: "Engineers Mentored", value: "20+" },
    { label: "Deployment Failures Reduced", value: "75%" },
  ],
};

export const skills = [
  {
    category: "Container & Orchestration",
    icon: "layers",
    items: [
      { name: "Kubernetes", level: "Expert" },
      { name: "EKS Anywhere", level: "Advanced" },
      { name: "Docker", level: "Expert" },
      { name: "Helm", level: "Advanced" },
    ],
  },
  {
    category: "CI/CD & Automation",
    icon: "git-branch",
    items: [
      { name: "GitLab CI", level: "Expert" },
      { name: "Jenkins", level: "Advanced" },
      { name: "GitHub Actions", level: "Advanced" },
      { name: "ArgoCD", level: "Intermediate" },
    ],
  },
  {
    category: "Monitoring & Observability",
    icon: "activity",
    items: [
      { name: "ELK Stack", level: "Advanced" },
      { name: "Prometheus", level: "Advanced" },
      { name: "Grafana", level: "Advanced" },
      { name: "Kibana", level: "Advanced" },
    ],
  },
  {
    category: "Cloud Platforms",
    icon: "cloud",
    items: [
      { name: "Google Cloud (GCP)", level: "Advanced" },
      { name: "AWS", level: "Intermediate" },
    ],
  },
  {
    category: "Infrastructure as Code",
    icon: "code",
    items: [
      { name: "Terraform", level: "Intermediate" },
      { name: "Ansible", level: "Intermediate" },
    ],
  },
  {
    category: "Security & DevSecOps",
    icon: "shield",
    items: [
      { name: "Trivy", level: "Advanced" },
      { name: "SonarQube", level: "Advanced" },
      { name: "Penetration Testing", level: "Intermediate" },
      { name: "API Security", level: "Intermediate" },
    ],
  },
  {
    category: "Languages & Scripting",
    icon: "terminal",
    items: [
      { name: "Bash", level: "Advanced" },
      { name: "Python", level: "Intermediate" },
      { name: "YAML", level: "Expert" },
      { name: "SQL", level: "Intermediate" },
    ],
  },
  {
    category: "Storage & Disaster Recovery",
    icon: "database",
    items: [
      { name: "Velero", level: "Advanced" },
      { name: "MinIO (S3-compatible)", level: "Advanced" },
      { name: "OpenEBS", level: "Intermediate" },
    ],
  },
];

export const experience = [
  {
    company: "Paysys Labs",
    role: "Associate DevOps Engineer",
    duration: "Aug 2025 – Present",
    location: "Karachi, Pakistan · Hybrid",
    type: "Full-time",
    description:
      "Managing critical fintech infrastructure across 2 countries (Togo & Tanzania), ensuring 99.9% uptime for real-time gross settlement (RTGS) systems.",
    highlights: [
      {
        metric: "99.9%",
        label: "Uptime",
        detail: "Across 20+ Java microservices using EKS Anywhere",
      },
      {
        metric: "65%",
        label: "Fewer Failures",
        detail: "GitLab CI/CD pipelines for 20+ microservices",
      },
      {
        metric: "60%",
        label: "Faster Detection",
        detail: "Full ELK Stack with custom dashboards & alerting",
      },
      {
        metric: "100%",
        label: "DR Recovery",
        detail: "Velero + OpenEBS + MinIO disaster recovery pipeline",
      },
      {
        metric: "90%",
        label: "Less Manual Work",
        detail: "Reusable deployment templates for repetitive configuration",
      },
      {
        metric: "85%",
        label: "Faster Builds",
        detail: "Docker optimization with layer caching and cleanup",
      },
    ],
    contributions: [
      "Managed Kubernetes (EKS Anywhere) infrastructure for fintech deployments across Togo & Tanzania",
      "Implemented HPA and rollback mechanisms for peak transaction loads",
      "Built GitLab CI/CD pipelines for 20+ Java microservices",
      "Deployed full ELK Stack (Filebeat + Logstash + Kibana) with custom alerting",
      "Designed end-to-end DR pipeline using Velero, OpenEBS, and MinIO",
      "Built a private Docker registry with Nginx reverse proxy, SSL, and environment tagging",
      "Applied DevSecOps with Trivy and SonarQube across all CI/CD pipelines",
      "Conducted Kubernetes & ELK Stack workshops for partner bank engineers",
      "Automated end-to-end transaction search workflow, eliminating manual cross-service data hunting",
    ],
    tech: [
      "Kubernetes",
      "EKS Anywhere",
      "Helm",
      "Docker",
      "GitLab CI",
      "ELK Stack",
      "Prometheus",
      "Grafana",
      "Velero",
      "MinIO",
      "Trivy",
      "SonarQube",
    ],
  },
  {
    company: "VentureDive",
    role: "QA Engineer Intern",
    duration: "Mar 2025 – Jul 2025",
    location: "Karachi, Pakistan",
    type: "Internship",
    description:
      "Built automated testing frameworks for mobile applications including the Careem Dubai app, and identified critical security vulnerabilities.",
    highlights: [
      {
        metric: "40%",
        label: "Coverage Increase",
        detail: "Selenium framework with config files and Extent Reports",
      },
      {
        metric: "100%",
        label: "Pass Rate",
        detail: "Careem Dubai app automated with Maestro before every release",
      },
      {
        metric: "3+",
        label: "Critical Flaws",
        detail: "Security vulnerabilities found in Askeddy app",
      },
      {
        metric: "30%",
        label: "Time Saved",
        detail: "BDD test cases with Cucumber for faster onboarding",
      },
    ],
    contributions: [
      "Built a Selenium test framework using config files, Extent Reports, and data-driven testing",
      "Automated critical UI flows of the Careem Dubai app using Maestro",
      "Found 3+ major security flaws (unlimited OTP attempts, no account lockout)",
      "Wrote reusable BDD test cases with Cucumber",
    ],
    tech: ["Selenium", "Maestro", "Cucumber", "BDD", "Java", "Security Testing"],
  },
  {
    company: "SkillReactor",
    role: "Campus Ambassador",
    duration: "Jan 2023 – Apr 2023",
    location: "Karachi, Pakistan",
    type: "Part-time",
    description:
      "Promoted SkillReactor on campus, gaining hands-on experience in marketing, communication, and leadership.",
    highlights: [],
    contributions: [
      "Promoted SkillReactor's platform across FAST NUCES campus",
      "Organized events and built a local community of learners",
    ],
    tech: ["Marketing", "Community Building", "Leadership"],
  },
];

export { projects } from "@/lib/projects";

export const achievements = [
  {
    year: "2025",
    title: "Raising the Bar Award",
    org: "Paysys Labs",
    description:
      "Awarded for exceptional performance — going above and beyond what was asked and delivering work that stood out across the team.",
    icon: "award",
    type: "award",
  },
  {
    year: "2025",
    title: "CKA — Certified Kubernetes Administrator",
    org: "KodeKloud · Preparing for CNCF exam",
    description:
      "Passed the KodeKloud CKA certification. Currently preparing for the official CNCF CKA exam.",
    icon: "award",
    type: "certification",
  },
  {
    year: "2025",
    title: "Built DR Pipeline with 100% Recovery Rate",
    org: "Paysys Labs",
    description:
      "Designed and validated a complete disaster recovery system for fintech Kubernetes clusters.",
    icon: "shield",
    type: "impact",
  },
  {
    year: "2025",
    title: "Trained 20+ Engineers at Partner Banks",
    org: "Paysys Labs",
    description:
      "Conducted hands-on workshops on Kubernetes and ELK Stack for engineers at external banking institutions.",
    icon: "users",
    type: "leadership",
  },
  {
    year: "2025",
    title: "Gold Medal — 1st Position (Spring 2025)",
    org: "FAST NUCES",
    description:
      "Secured top position in the Spring 2025 semester, awarded a Gold Medal for academic excellence.",
    icon: "medal",
    type: "academic",
  },
  {
    year: "2024",
    title: "Gold Medal — 1st Position (Fall 2024)",
    org: "FAST NUCES",
    description:
      "Secured top position in the Fall 2024 semester, awarded a Gold Medal for academic excellence.",
    icon: "medal",
    type: "academic",
  },
  {
    year: "2024",
    title: "Google Cloud Computing Foundations Certificate",
    org: "Google Cloud",
    description:
      "Completed Google's official cloud computing foundations curriculum.",
    icon: "cloud",
    type: "certification",
  },
  {
    year: "2024",
    title: "Head of Offensive Security Team",
    org: "ACM Student Chapter, FAST NUCES",
    description:
      "Led the offensive security wing of the university's ACM chapter, organizing CTF events and security workshops.",
    icon: "target",
    type: "leadership",
  },
  {
    year: "2023",
    title: "Best Position Paper Award",
    org: "Habib University Model United Nations",
    description:
      "Awarded best position paper at HUMUN, demonstrating strong research and analytical writing.",
    icon: "file-text",
    type: "award",
  },
  {
    year: "2023",
    title: "International Book Club Organizer",
    org: "Cross-border Community",
    description:
      "Organized and sustained a 12-month international book club spanning multiple countries.",
    icon: "globe",
    type: "community",
  },
];

export const certifications = [
  {
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "KodeKloud",
    date: "Sep 2025",
    credentialFile: "/cka.pdf",
    credentialUrl: null,
    note: "Preparing for CNCF official exam",
  },
  {
    name: "Google Cloud Computing Foundations",
    issuer: "Google Cloud / Credly",
    date: "Jul 2024",
    credentialFile: null,
    credentialUrl: "https://www.credly.com/badges/2e5e551d-a72f-4b78-a125-642658b22c10/linked_in_profile",
    note: null,
  },
  {
    name: "Google Cloud Cybersecurity Certificate",
    issuer: "Google Cloud / Credly",
    date: "2024",
    credentialFile: null,
    credentialUrl: "https://www.credly.com/badges/d284a3fd-3646-41aa-b65b-2e200a9a4d92/public_url",
    note: null,
  },
  {
    name: "Postman API Fundamentals Student Expert",
    issuer: "Postman / Parchment",
    date: "2024",
    credentialFile: null,
    credentialUrl: "https://badges.parchment.com/public/assertions/Y-A49546QWaJh8gUJVjlAw",
    note: null,
  },
  {
    name: "Ethical Hacking Essentials (EHE)",
    issuer: "EC-Council",
    date: "2023",
    credentialFile: "/EHE.jpeg",
    credentialUrl: null,
    note: null,
  },
];
