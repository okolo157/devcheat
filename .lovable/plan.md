

# Dev Command Cheatsheet — Dark Minimalist Site

## Design
- **Dark theme** by default using the existing dark mode CSS variables
- Clean, minimal layout with a monospace/code feel
- Subtle card-based command display with syntax-highlighted code blocks

## Layout
- **Header**: Site title "DevCheat" (or similar) + search bar prominently centered
- **Filter chips**: Row of category pills (Git, Terminal/Shell, npm/yarn, Docker) to filter commands
- **Command grid**: Responsive grid of command cards below

## Search & Filter
- Real-time search bar filters commands by title, description, or command text
- Category filter chips (toggleable, multi-select) to narrow by type
- Combined filtering: search + category work together

## Command Cards
Each card shows:
- **Title** (e.g., "Create a new branch")
- **Category badge** (color-coded: Git=orange, Shell=green, npm=red, Docker=blue)
- **Command** in a monospace code block
- **Copy button** — one click copies to clipboard, shows a toast "Copied!"
- Optional short description below the command

## Commands Included
~40-50 common commands across 4 categories:
- **Git**: clone, branch, checkout, merge, rebase, stash, log, reset, cherry-pick, etc.
- **Terminal/Shell**: ls, cd, chmod, curl, ssh, scp, grep, find, tar, kill, etc.
- **npm/yarn**: init, install, update, run, build, publish, npx, etc.
- **Docker**: build, run, ps, stop, rm, exec, compose up/down, images, logs, etc.

## Pages
- Single page app — everything on the home page
- Clean 404 page (already exists)

