import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Command, Category } from "@/data/commands";
import { categoryLabels } from "@/data/commands";
import { Badge } from "@/components/ui/badge";

const categoryStyles: Record<Category, string> = {
  git: "bg-cmd-git/15 text-cmd-git border-cmd-git/30",
  shell: "bg-cmd-shell/15 text-cmd-shell border-cmd-shell/30",
  npm: "bg-cmd-npm/15 text-cmd-npm border-cmd-npm/30",
  docker: "bg-cmd-docker/15 text-cmd-docker border-cmd-docker/30",
  ai: "bg-cmd-ai/15 text-cmd-ai border-cmd-ai/30",
};

export function CommandCard({ title, command, category }: Command) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-muted-foreground/30">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <Badge variant="outline" className={`shrink-0 text-[10px] ${categoryStyles[category]}`}>
          {categoryLabels[category]}
        </Badge>
      </div>
      <div className="relative">
        <pre className="overflow-x-auto rounded-md bg-background px-3 py-2 font-mono text-sm text-cmd-code">
          <code>{command}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground opacity-0 transition-all hover:bg-muted hover:text-foreground group-hover:opacity-100"
          aria-label="Copy command"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-cmd-shell" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}
