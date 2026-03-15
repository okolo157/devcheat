import { useState } from "react";
import { Check, ChevronDown, ChevronRight, Copy } from "lucide-react";
import type { Workflow } from "@/data/workflows";
import type { Category } from "@/data/commands";
import { categoryLabels } from "@/data/commands";
import { Badge } from "@/components/ui/badge";

const categoryStyles: Record<Category, string> = {
  git: "bg-cmd-git/15 text-cmd-git border-cmd-git/30",
  shell: "bg-cmd-shell/15 text-cmd-shell border-cmd-shell/30",
  npm: "bg-cmd-npm/15 text-cmd-npm border-cmd-npm/30",
  docker: "bg-cmd-docker/15 text-cmd-docker border-cmd-docker/30",
  ai: "bg-cmd-ai/15 text-cmd-ai border-cmd-ai/30",
};

export function WorkflowCard({ title, description, category, steps }: Workflow) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyAll = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const allCommands = steps.map((s) => s.command).join("\n");
    await navigator.clipboard.writeText(allCommands);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-lg border border-border bg-card transition-colors hover:border-muted-foreground/30">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        {open ? (
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
            <Badge variant="outline" className={`shrink-0 text-[10px] ${categoryStyles[category]}`}>
              {categoryLabels[category]}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{description}</p>
        </div>
        <span className="shrink-0 text-[10px] text-muted-foreground font-mono">
          {steps.length} steps
        </span>
      </button>

      {open && (
        <div className="border-t border-border px-4 pb-4 pt-3">
          <ol className="space-y-2">
            {steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">{step.label}</p>
                  <pre className="overflow-x-auto rounded-md bg-background px-3 py-1.5 font-mono text-xs text-cmd-code">
                    <code>{step.command}</code>
                  </pre>
                </div>
              </li>
            ))}
          </ol>
          <button
            onClick={handleCopyAll}
            className="mt-3 flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-cmd-shell" /> Copied!
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" /> Copy all commands
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
