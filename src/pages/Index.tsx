import { useState, useMemo } from "react";
import { Search, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";
import { commands, categoryLabels, type Category } from "@/data/commands";
import { workflows } from "@/data/workflows";
import { CommandCard } from "@/components/CommandCard";
import { WorkflowCard } from "@/components/WorkflowCard";
import logoDark from "/developer-dark.png";

const categories: Category[] = ["git", "shell", "npm", "docker", "ai"];

const chipStyles: Record<Category, { active: string; inactive: string }> = {
  git: {
    active: "bg-cmd-git/20 text-cmd-git border-cmd-git/40",
    inactive: "text-muted-foreground border-border hover:border-cmd-git/30 hover:text-cmd-git",
  },
  shell: {
    active: "bg-cmd-shell/20 text-cmd-shell border-cmd-shell/40",
    inactive: "text-muted-foreground border-border hover:border-cmd-shell/30 hover:text-cmd-shell",
  },
  npm: {
    active: "bg-cmd-npm/20 text-cmd-npm border-cmd-npm/40",
    inactive: "text-muted-foreground border-border hover:border-cmd-npm/30 hover:text-cmd-npm",
  },
  docker: {
    active: "bg-cmd-docker/20 text-cmd-docker border-cmd-docker/40",
    inactive: "text-muted-foreground border-border hover:border-cmd-docker/30 hover:text-cmd-docker",
  },
  ai: {
    active: "bg-cmd-ai/20 text-cmd-ai border-cmd-ai/40",
    inactive: "text-muted-foreground border-border hover:border-cmd-ai/30 hover:text-cmd-ai",
  },
};

type ViewMode = "commands" | "workflows";

const Index = () => {
  const [search, setSearch] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(new Set());
  
  const [view, setView] = useState<ViewMode>("commands");

  const toggleCategory = (cat: Category) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const filteredCommands = useMemo(() => {
    const q = search.toLowerCase();
    return commands.filter((cmd) => {
      const matchesCategory = activeCategories.size === 0 || activeCategories.has(cmd.category);
      const matchesSearch =
        !q || cmd.title.toLowerCase().includes(q) || cmd.command.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategories]);

  const filteredWorkflows = useMemo(() => {
    const q = search.toLowerCase();
    return workflows.filter((wf) => {
      const matchesCategory = activeCategories.size === 0 || activeCategories.has(wf.category);
      const matchesSearch =
        !q ||
        wf.title.toLowerCase().includes(q) ||
        wf.description.toLowerCase().includes(q) ||
        wf.steps.some((s) => s.command.toLowerCase().includes(q) || s.label.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategories]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src={dark ? logoDark : logo} alt="DevCheat logo" className="h-8 w-8 object-contain" />
              <div className="flex items-baseline gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground font-mono">
                  DevCheat
                </h1>
                <span className="text-xs text-muted-foreground">
                  {commands.length} commands · {workflows.length} workflows
                </span>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>

          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search commands & workflows..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border font-mono text-sm"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {/* View toggle */}
            <div className="flex rounded-md border border-border overflow-hidden mr-2">
              <button
                onClick={() => setView("commands")}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  view === "commands"
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Commands
              </button>
              <button
                onClick={() => setView("workflows")}
                className={`flex items-center gap-1 px-3 py-1 text-xs font-medium transition-colors ${
                  view === "workflows"
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Layers className="h-3 w-3" /> Workflows
              </button>
            </div>

            {categories.map((cat) => {
              const isActive = activeCategories.has(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                    isActive ? chipStyles[cat].active : chipStyles[cat].inactive
                  }`}
                >
                  {categoryLabels[cat]}
                </button>
              );
            })}
            {activeCategories.size > 0 && (
              <button
                onClick={() => setActiveCategories(new Set())}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {view === "commands" ? (
          filteredCommands.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground font-mono text-sm">
              No commands found.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCommands.map((cmd, i) => (
                <CommandCard key={`${cmd.category}-${i}`} {...cmd} />
              ))}
            </div>
          )
        ) : filteredWorkflows.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground font-mono text-sm">
            No workflows found.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredWorkflows.map((wf, i) => (
              <WorkflowCard key={`${wf.category}-${i}`} {...wf} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
