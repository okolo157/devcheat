import type { Category } from "./commands";

export interface Workflow {
  title: string;
  description: string;
  category: Category;
  steps: { label: string; command: string }[];
}

export const workflows: Workflow[] = [
  // ─── Git ───
  {
    title: "First-Time Repo Setup",
    description: "Initialize a new repo and push to GitHub",
    category: "git",
    steps: [
      { label: "Initialize repo", command: "git init" },
      { label: "Add all files", command: "git add ." },
      { label: "Initial commit", command: 'git commit -m "Initial commit"' },
      { label: "Set main branch", command: "git branch -M main" },
      { label: "Add remote", command: "git remote add origin <repo-url>" },
      { label: "Push", command: "git push -u origin main" },
    ],
  },
  {
    title: "Feature Branch Workflow",
    description: "Create a feature branch, work, and merge back",
    category: "git",
    steps: [
      { label: "Checkout main", command: "git checkout main" },
      { label: "Pull latest", command: "git pull origin main" },
      { label: "Create feature branch", command: "git checkout -b feature/<name>" },
      { label: "Stage changes", command: "git add ." },
      { label: "Commit", command: 'git commit -m "feat: description"' },
      { label: "Push branch", command: "git push -u origin feature/<name>" },
      { label: "Open PR / merge", command: "git checkout main && git merge feature/<name>" },
      { label: "Delete branch", command: "git branch -d feature/<name>" },
    ],
  },
  {
    title: "Resolve Merge Conflicts",
    description: "Step-by-step conflict resolution",
    category: "git",
    steps: [
      { label: "Attempt merge", command: "git merge <branch>" },
      { label: "See conflicted files", command: "git status" },
      { label: "Edit conflicts manually", command: "# fix <<<< ==== >>>> markers in files" },
      { label: "Stage resolved files", command: "git add <resolved-file>" },
      { label: "Complete merge", command: 'git commit -m "Resolve merge conflicts"' },
    ],
  },
  {
    title: "Squash Last N Commits",
    description: "Combine recent commits into one clean commit",
    category: "git",
    steps: [
      { label: "Interactive rebase", command: "git rebase -i HEAD~<n>" },
      { label: "Mark commits as squash", command: "# change 'pick' to 's' for commits to squash" },
      { label: "Edit commit message", command: "# save and edit the combined message" },
      { label: "Force push", command: "git push --force-with-lease" },
    ],
  },
  {
    title: "Release Tagging",
    description: "Tag a release and push tags to remote",
    category: "git",
    steps: [
      { label: "Checkout main", command: "git checkout main" },
      { label: "Pull latest", command: "git pull origin main" },
      { label: "Create annotated tag", command: 'git tag -a v1.0.0 -m "Release v1.0.0"' },
      { label: "Push tag", command: "git push origin v1.0.0" },
      { label: "Push all tags", command: "git push --tags" },
    ],
  },

  // ─── Docker ───
  {
    title: "Docker Build & Push",
    description: "Build an image and push to a registry",
    category: "docker",
    steps: [
      { label: "Login to registry", command: "docker login" },
      { label: "Build image", command: "docker build -t <registry>/<image>:<tag> ." },
      { label: "Test locally", command: "docker run --rm -p 3000:3000 <registry>/<image>:<tag>" },
      { label: "Push image", command: "docker push <registry>/<image>:<tag>" },
    ],
  },
  {
    title: "Full Compose Deploy",
    description: "Deploy a multi-service app with Docker Compose",
    category: "docker",
    steps: [
      { label: "Pull latest images", command: "docker compose pull" },
      { label: "Build custom images", command: "docker compose build" },
      { label: "Start services", command: "docker compose up -d" },
      { label: "Check status", command: "docker compose ps" },
      { label: "View logs", command: "docker compose logs -f" },
    ],
  },
  {
    title: "Docker Full Cleanup",
    description: "Remove all unused containers, images, volumes, and networks",
    category: "docker",
    steps: [
      { label: "Stop all containers", command: "docker stop $(docker ps -q)" },
      { label: "Remove all containers", command: "docker container prune -f" },
      { label: "Remove unused images", command: "docker image prune -a -f" },
      { label: "Remove unused volumes", command: "docker volume prune -f" },
      { label: "Remove unused networks", command: "docker network prune -f" },
      { label: "Full system prune", command: "docker system prune -a --volumes -f" },
    ],
  },

  // ─── npm ───
  {
    title: "New Project Setup (Vite + React)",
    description: "Scaffold a new React project with Vite",
    category: "npm",
    steps: [
      { label: "Create project", command: "npm create vite@latest my-app -- --template react-ts" },
      { label: "Enter directory", command: "cd my-app" },
      { label: "Install dependencies", command: "npm install" },
      { label: "Start dev server", command: "npm run dev" },
    ],
  },
  {
    title: "Publish a Package to npm",
    description: "Prepare and publish your package",
    category: "npm",
    steps: [
      { label: "Login", command: "npm login" },
      { label: "Update version", command: "npm version patch" },
      { label: "Build", command: "npm run build" },
      { label: "Dry run", command: "npm publish --dry-run" },
      { label: "Publish", command: "npm publish" },
    ],
  },
  {
    title: "Audit & Fix Vulnerabilities",
    description: "Check and fix security issues in dependencies",
    category: "npm",
    steps: [
      { label: "Run audit", command: "npm audit" },
      { label: "Auto fix", command: "npm audit fix" },
      { label: "Force fix (breaking)", command: "npm audit fix --force" },
      { label: "Check outdated", command: "npm outdated" },
      { label: "Update all", command: "npm update" },
    ],
  },
  {
    title: "Migrate to pnpm",
    description: "Switch a project from npm to pnpm",
    category: "npm",
    steps: [
      { label: "Install pnpm", command: "npm install -g pnpm" },
      { label: "Remove node_modules", command: "rm -rf node_modules" },
      { label: "Remove package-lock", command: "rm package-lock.json" },
      { label: "Install with pnpm", command: "pnpm install" },
      { label: "Verify", command: "pnpm run dev" },
    ],
  },

  // ─── Shell ───
  {
    title: "Deploy via SSH",
    description: "Connect to a server and deploy your app",
    category: "shell",
    steps: [
      { label: "SSH into server", command: "ssh user@host" },
      { label: "Navigate to project", command: "cd /var/www/myapp" },
      { label: "Pull latest code", command: "git pull origin main" },
      { label: "Install dependencies", command: "npm install --production" },
      { label: "Build", command: "npm run build" },
      { label: "Restart service", command: "sudo systemctl restart myapp" },
    ],
  },
  {
    title: "Backup & Compress",
    description: "Create a compressed backup of a directory",
    category: "shell",
    steps: [
      { label: "Create tar.gz archive", command: "tar -czf backup-$(date +%Y%m%d).tar.gz /path/to/dir" },
      { label: "Verify archive", command: "tar -tzf backup-*.tar.gz | head" },
      { label: "Copy to remote", command: "scp backup-*.tar.gz user@backup-server:/backups/" },
      { label: "Clean up old backups", command: "find /backups -name '*.tar.gz' -mtime +30 -delete" },
    ],
  },
  {
    title: "Server Health Check",
    description: "Quick checks on server status",
    category: "shell",
    steps: [
      { label: "Disk space", command: "df -h" },
      { label: "Memory usage", command: "free -h" },
      { label: "CPU load", command: "uptime" },
      { label: "Top processes", command: "ps aux --sort=-%mem | head -10" },
      { label: "Open ports", command: "netstat -tlnp" },
      { label: "Recent logs", command: "journalctl -u myapp --since '1 hour ago'" },
    ],
  },

  // ─── AI ───
  {
    title: "Set Up Local LLM (Ollama)",
    description: "Install Ollama and run your first local model",
    category: "ai",
    steps: [
      { label: "Install Ollama", command: "curl -fsSL https://ollama.com/install.sh | sh" },
      { label: "Start Ollama", command: "ollama serve" },
      { label: "Pull a model", command: "ollama pull llama3" },
      { label: "Chat with model", command: "ollama run llama3" },
      { label: "Test API", command: "curl http://localhost:11434/api/generate -d '{\"model\":\"llama3\",\"prompt\":\"Hello!\"}'" },
    ],
  },
  {
    title: "Python ML Environment Setup",
    description: "Set up a Python environment for machine learning",
    category: "ai",
    steps: [
      { label: "Create virtual env", command: "python -m venv .venv" },
      { label: "Activate env", command: "source .venv/bin/activate" },
      { label: "Upgrade pip", command: "pip install --upgrade pip" },
      { label: "Install PyTorch", command: "pip install torch torchvision torchaudio" },
      { label: "Install common libs", command: "pip install transformers datasets accelerate" },
      { label: "Install Jupyter", command: "pip install jupyterlab" },
      { label: "Freeze deps", command: "pip freeze > requirements.txt" },
    ],
  },
  {
    title: "RAG Pipeline Setup",
    description: "Set up a Retrieval-Augmented Generation pipeline",
    category: "ai",
    steps: [
      { label: "Install deps", command: "pip install langchain langchain-openai chromadb" },
      { label: "Set API key", command: "export OPENAI_API_KEY='sk-...'" },
      { label: "Install doc loaders", command: "pip install pypdf unstructured" },
      { label: "Install embeddings", command: "pip install sentence-transformers" },
      { label: "Run ChromaDB", command: "chroma run --path ./chroma_data" },
    ],
  },
  {
    title: "Deploy Model API (vLLM)",
    description: "Serve a model as an OpenAI-compatible API",
    category: "ai",
    steps: [
      { label: "Install vLLM", command: "pip install vllm" },
      { label: "Start API server", command: "python -m vllm.entrypoints.openai.api_server --model <model> --port 8000" },
      { label: "Test endpoint", command: "curl http://localhost:8000/v1/chat/completions -H 'Content-Type: application/json' -d '{\"model\":\"<model>\",\"messages\":[{\"role\":\"user\",\"content\":\"hello\"}]}'" },
      { label: "Check models", command: "curl http://localhost:8000/v1/models" },
    ],
  },
];
