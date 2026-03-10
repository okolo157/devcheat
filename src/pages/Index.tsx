import { useState, useMemo } from "react";
import { Search, Terminal, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { commands, categoryLabels, type Category } from "@/data/commands";
import { CommandCard } from "@/components/CommandCard";
import logo from "/developer.png"

const categories: Category[] = ["git", "shell", "npm", "docker"];

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
};

const Index = () => {
  const [search, setSearch] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(new Set());
  const [dark, setDark] = useState(true);

  const toggleCategory = (cat: Category) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const toggleTheme = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return commands.filter((cmd) => {
      const matchesCategory = activeCategories.size === 0 || activeCategories.has(cmd.category);
      const matchesSearch =
        !q || cmd.title.toLowerCase().includes(q) || cmd.command.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategories]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="DevCheat logo"
                className="h-8 w-8 object-contain"
              />

              <div className="flex items-baseline gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground font-mono">
                  DevCheat
                </h1>

                <span className="text-xs text-muted-foreground">
                  {commands.length} commands
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
              placeholder="Search commands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border font-mono text-sm"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
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
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground font-mono text-sm">
            No commands found.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cmd, i) => (
              <CommandCard key={`${cmd.category}-${i}`} {...cmd} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
