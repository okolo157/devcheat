

# Expand DevCheat: Workflows, AI Commands, Dark Default

## Changes

### 1. Dark mode as default
Already set via CSS (`html { @apply dark }`) and `useState(true)`. No change needed.

### 2. New category: AI
Add an `"ai"` category to the type, labels, styles, and chip config. Color: purple (`280 70% 60%`). Include commands for:
- OpenAI CLI, Ollama, Hugging Face CLI, LangChain, vLLM, llama.cpp
- Common prompt patterns, model management, fine-tuning
- Python AI tooling (pip install torch, transformers, etc.)
- ~40+ AI-related commands

### 3. New feature: "Workflows" section
A new data file `src/data/workflows.ts` with chained command sequences for common multi-step tasks. Each workflow has a title, description, category, and an ordered array of commands.

Example workflows:
- **Git**: First-time repo setup, feature branch workflow, resolve merge conflicts, squash commits, release tagging
- **Docker**: Build & push image, full compose deploy, multi-stage build, clean up everything
- **npm**: New project setup, publish a package, audit & fix, migrate to pnpm
- **Shell**: Server setup, deploy via SSH, backup & compress, log analysis
- **AI**: Set up local LLM, fine-tune a model, deploy model API

### 4. UI: Workflow section
Add a new `WorkflowCard` component — collapsible card showing the workflow title, description, and numbered steps with copy-all button. Displayed in a separate section below the command grid (or toggled via a tab/section header). Workflows are also searchable and filterable by category.

### 5. Updated files
- `src/data/commands.ts` — add `"ai"` category, ~40 AI commands
- `src/data/workflows.ts` — new file, ~20 workflows
- `src/components/WorkflowCard.tsx` — new collapsible card component
- `src/components/CommandCard.tsx` — add AI category style
- `src/pages/Index.tsx` — add AI to categories/chips, add Workflows section with toggle
- `src/index.css` — add `--cmd-ai` color variable
- `tailwind.config.ts` — add `cmd.ai` color

