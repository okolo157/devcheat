export type Category = "git" | "shell" | "npm" | "docker";

export interface Command {
  title: string;
  command: string;
  description?: string;
  category: Category;
}

export const categoryLabels: Record<Category, string> = {
  git: "Git",
  shell: "Terminal",
  npm: "npm/yarn",
  docker: "Docker",
};

export const commands: Command[] = [
  // Git
  { title: "Clone a repository", command: "git clone <repo-url>", category: "git" },
  { title: "Initialize a repo", command: "git init", category: "git" },
  { title: "Check status", command: "git status", category: "git" },
  { title: "Stage all changes", command: "git add .", category: "git" },
  { title: "Commit with message", command: 'git commit -m "message"', category: "git" },
  { title: "Push to remote", command: "git push origin <branch>", category: "git" },
  { title: "Pull latest changes", command: "git pull", category: "git" },
  { title: "Create a new branch", command: "git checkout -b <branch>", category: "git" },
  { title: "Switch branch", command: "git checkout <branch>", category: "git" },
  { title: "Merge a branch", command: "git merge <branch>", category: "git" },
  { title: "Rebase onto branch", command: "git rebase <branch>", category: "git" },
  { title: "Stash changes", command: "git stash", category: "git" },
  { title: "Apply stash", command: "git stash pop", category: "git" },
  { title: "View commit log", command: "git log --oneline", category: "git" },
  { title: "Reset to last commit", command: "git reset --hard HEAD", category: "git" },
  { title: "Cherry-pick a commit", command: "git cherry-pick <commit-hash>", category: "git" },
  { title: "Delete a branch", command: "git branch -d <branch>", category: "git" },
  { title: "View diff", command: "git diff", category: "git" },

  // Terminal/Shell
  { title: "List files", command: "ls -la", category: "shell" },
  { title: "Change directory", command: "cd <path>", category: "shell" },
  { title: "Print working directory", command: "pwd", category: "shell" },
  { title: "Create a directory", command: "mkdir <dir>", category: "shell" },
  { title: "Remove a file", command: "rm <file>", category: "shell" },
  { title: "Remove directory recursively", command: "rm -rf <dir>", category: "shell" },
  { title: "Copy files", command: "cp <src> <dest>", category: "shell" },
  { title: "Move/rename files", command: "mv <src> <dest>", category: "shell" },
  { title: "Search in files", command: 'grep -r "pattern" <dir>', category: "shell" },
  { title: "Find files by name", command: 'find . -name "*.ext"', category: "shell" },
  { title: "Download a file", command: "curl -O <url>", category: "shell" },
  { title: "SSH into server", command: "ssh user@host", category: "shell" },
  { title: "Change permissions", command: "chmod 755 <file>", category: "shell" },
  { title: "Create a tar archive", command: "tar -czf archive.tar.gz <dir>", category: "shell" },
  { title: "Extract tar archive", command: "tar -xzf archive.tar.gz", category: "shell" },
  { title: "Kill a process", command: "kill -9 <pid>", category: "shell" },
  { title: "Find process by port", command: "lsof -i :<port>", category: "shell" },
  { title: "Watch file changes", command: "watch -n 1 <command>", category: "shell" },

  // npm/yarn
  { title: "Initialize project", command: "npm init -y", category: "npm" },
  { title: "Install dependencies", command: "npm install", category: "npm" },
  { title: "Add a package", command: "npm install <package>", category: "npm" },
  { title: "Add dev dependency", command: "npm install -D <package>", category: "npm" },
  { title: "Remove a package", command: "npm uninstall <package>", category: "npm" },
  { title: "Run a script", command: "npm run <script>", category: "npm" },
  { title: "Start dev server", command: "npm run dev", category: "npm" },
  { title: "Build for production", command: "npm run build", category: "npm" },
  { title: "Update all packages", command: "npm update", category: "npm" },
  { title: "Check outdated", command: "npm outdated", category: "npm" },
  { title: "Run with npx", command: "npx <package>", category: "npm" },
  { title: "Yarn add package", command: "yarn add <package>", category: "npm" },
  { title: "Yarn dev dependency", command: "yarn add -D <package>", category: "npm" },

  // Docker
  { title: "Build an image", command: "docker build -t <name> .", category: "docker" },
  { title: "Run a container", command: "docker run -d -p 3000:3000 <image>", category: "docker" },
  { title: "List running containers", command: "docker ps", category: "docker" },
  { title: "List all containers", command: "docker ps -a", category: "docker" },
  { title: "Stop a container", command: "docker stop <id>", category: "docker" },
  { title: "Remove a container", command: "docker rm <id>", category: "docker" },
  { title: "List images", command: "docker images", category: "docker" },
  { title: "Remove an image", command: "docker rmi <image>", category: "docker" },
  { title: "Execute in container", command: "docker exec -it <id> bash", category: "docker" },
  { title: "View container logs", command: "docker logs <id>", category: "docker" },
  { title: "Compose up", command: "docker compose up -d", category: "docker" },
  { title: "Compose down", command: "docker compose down", category: "docker" },
  { title: "Prune unused resources", command: "docker system prune -a", category: "docker" },
];
