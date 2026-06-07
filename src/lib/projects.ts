// Edit this file to update project content on the portfolio.
// Each project appears as a card in the Projects section and expands into a detail modal.

export const projects = [
  {
    slug: "internal-api-platform",
    title: "Internal API Collaboration Platform",
    subtitle: "We stopped paying for a tool we barely used, I set up a free version instead",
    problem:
      "Our engineers were paying for Postman, a popular tool to test and share APIs. Most of what we paid for went unused. I looked at it and thought: we can do this for free.",
    solution:
      "I set up Hoppscotch, a free open-source tool that does the same job. I ran it on one of our own servers, built the login system from scratch, added user roles so teams have their own private space, and made sure it looked familiar so nobody had to relearn anything.",
    impact: [
      "No more monthly Postman bill",
      "Teams have secure login, user roles, and their own private workspaces",
      "Engineers switched over easily, it works just like what they already knew",
    ],
    architecture:
      "Nginx sends web traffic to Hoppscotch (which runs its own database, cache, and app server) plus two small helper services I built , one for sending login emails and one for handling certain web requests that needed special treatment.",
    tech: ["Hoppscotch", "Docker Compose", "Nginx", "PostgreSQL", "Redis", "RHEL 8.10", "OAuth", "Bash"],
    highlights: [
      { metric: "$0", label: "Licensing Cost" },
      { metric: "RBAC", label: "Access Control" },
      { metric: "Self-hosted", label: "Full Ownership" },
    ],
    github: "https://github.com/naimss-paysys/hoppscotch",
    demo: null,
    category: "Platform Engineering",
    featured: true,
  },
  {
    slug: "kubeforge",
    title: "KubeForge",
    subtitle: "One command to deploy any service to any country, safely and fast",
    problem:
      "Every time we pushed a new version of our app live in Tanzania or Togo, someone had to type out long commands from memory. Different people did it differently. If something broke halfway through, we often had no idea why.",
    solution:
      "I built KubeForge, a simple command-line tool. You type one command, pick the country, and it does the rest. It checks everything first, shows you what's going to change, waits for you to say yes, then rolls out the update safely. If something goes wrong, it fixes itself automatically. Every update gets written to a log so we always know what happened.",
    impact: [
      "Deployments went from over an hour down to just a few minutes",
      "If something breaks, the tool rolls back on its own, no one has to fix it by hand",
      "Every update is logged, we always know who deployed what, where, and when",
    ],
    architecture:
      "One main script that pulls in smaller helper scripts, one for checking the config, one for updating settings, one for rolling out the new version, one for running health checks, and one for writing the log.",
    tech: ["Bash", "Kubernetes", "kubectl", "yq", "ELK Stack", "Filebeat", "GitLab CI", "Ambassador", "YAML"],
    highlights: [
      { metric: "70 – 90%", label: "Faster Deploys" },
      { metric: "2", label: "Countries" },
      { metric: "0", label: "Downtime" },
    ],
    github: "https://github.com/naimss-paysys/k8s-templates",
    demo: null,
    category: "DevOps",
    featured: true,
  },
  {
    slug: "cloud-disaster-recovery",
    title: "Enterprise Disaster Recovery Pipeline",
    subtitle: "Backup and recovery for our Kubernetes systems, tested and proven to work",
    problem:
      "All our important data lived in Kubernetes. But if something went very wrong, we had no clear plan to get it back. Recovery would have meant hours of stressful manual work, if it worked at all.",
    solution:
      "I built a full backup and recovery system. It saves a snapshot of everything on a schedule automatically. I then actually tested it, I deleted a cluster and brought it all back using only the backups. Not just checked that backups existed, but proved they actually work.",
    impact: [
      "Every backup tested end-to-end, not just saved, but proven to actually work",
      "Backups happen automatically on a schedule across all namespaces",
      "No data was lost in any of our recovery tests",
    ],
    architecture:
      "Velero runs on a schedule and saves everything to MinIO (our own storage server). OpenEBS manages the disk space. We restore to a separate cluster to confirm everything came back correctly before signing off.",
    tech: ["Velero", "OpenEBS", "MinIO", "Kubernetes", "Bash", "Helm"],
    highlights: [
      { metric: "100%", label: "Data Recovery" },
      { metric: "0", label: "Data Loss" },
      { metric: "Auto", label: "Scheduled Backups" },
    ],
    github: "https://github.com/Cyber-Naimo",
    demo: null,
    category: "Infrastructure",
    featured: true,
  },
  {
    slug: "elk-stack-observability",
    title: "ELK Stack Observability Platform",
    subtitle: "One dashboard to see what's happening across 9+ services at once",
    problem:
      "When something went wrong, engineers had to check 20+ different apps one by one to find the bad log line. It took hours. By the time they found the problem, it had often already caused an outage.",
    solution:
      "I set up an ELK Stack, a system that automatically collects logs from every app and puts them all in one place. Engineers can now search across everything from one screen. I also set up alerts so the system warns us before things get bad.",
    impact: [
      "Finding issues now takes 80% less time than before",
      "All 9+ services visible from one dashboard",
      "Automatic alerts catch problems early, before users notice",
    ],
    architecture:
      "A small log collector runs on every server and sends logs to a processing service that cleans them up, then stores them in a searchable database. A web dashboard shows everything in one place with live alerts.",
    tech: ["Elasticsearch", "Logstash", "Kibana", "Filebeat", "Kubernetes", "Docker"],
    highlights: [
      { metric: "80%", label: "Faster Detection" },
      { metric: "9+", label: "Services Covered" },
      { metric: "Real-time", label: "Alerting" },
    ],
    github: "https://github.com/Cyber-Naimo",
    demo: null,
    category: "Observability",
    featured: true,
  },
  {
    slug: "data-breach-response",
    title: "Cloud Security Breach Response",
    subtitle: "Fixed a cloud account that was wide open, a security test project",
    problem:
      "In a practice scenario, I was given a Google Cloud account with serious security problems. Ports were open to anyone, storage was public, and servers had too many permissions. These are the kinds of mistakes that cause real data breaches.",
    solution:
      "I went through the account and locked everything down, closed the open ports, set storage to private, removed risky servers, and gave each service only the permissions it actually needs. I also turned on logging so every action gets recorded going forward.",
    impact: [
      "Security risk dropped by 75%",
      "Everything now follows Google Cloud's best security guidelines",
      "All activity is recorded, nothing happens in the dark",
    ],
    architecture:
      "Fixed using Google Cloud's built-in tools, firewall rules, storage access controls, user permissions, and monitoring dashboards to keep watch going forward.",
    tech: ["Google Cloud Platform", "IAM", "VPC", "Cloud Logging", "Cloud Monitoring", "Security Command Center"],
    highlights: [
      { metric: "75%", label: "Risk Reduced" },
      { metric: "100%", label: "Compliance" },
      { metric: "Full", label: "Audit Trail" },
    ],
    github: "https://github.com/Cyber-Naimo",
    demo: null,
    category: "Security",
    featured: false,
  },
  {
    slug: "evora-event-platform",
    title: "Evora",
    subtitle: "A website that makes it easy to find and book event services in Pakistan",
    problem:
      "If you wanted to plan a wedding or event in Pakistan, you had to visit many different places just to find a hall, catering, or transport. There was no one place to compare options or book anything online.",
    solution:
      "I built Evora, a website where people can find all kinds of event services in one place. Vendors list what they offer, and customers can browse and book without visiting each one separately. I helped several small vendors get online for the first time.",
    impact: [
      "All event services in one easy-to-search place",
      "Simple booking, no phone calls or in-person visits needed",
      "Several small businesses went online for the very first time",
    ],
    architecture:
      "A full website with two sides, one for service providers to list what they offer, and one for customers to find and book those services.",
    tech: ["JavaScript", "Node.js", "Database", "Web APIs"],
    highlights: [
      { metric: "1", label: "Unified Platform" },
      { metric: "3+", label: "Service Types" },
      { metric: "Pakistan", label: "Market Focus" },
    ],
    github: "https://github.com/Cyber-Naimo",
    demo: null,
    category: "Full-Stack",
    featured: false,
  },
];
