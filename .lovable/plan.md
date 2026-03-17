

# Remove Light Mode — Dark Only

The issue: `html { @apply dark }` is in CSS but may not apply reliably. The theme toggle and light mode CSS variables are unnecessary.

## Changes

1. **`src/index.css`**: Remove all `:root` (light mode) CSS variables. Keep only `.dark` variables. Move dark variables to `:root` directly (no `.dark` class needed). Remove `html { @apply dark }`.

2. **`src/pages/Index.tsx`**: Remove the `dark` state, `toggleTheme` function, Sun/Moon import, and the theme toggle button. Always use the dark logo (`logoDark`). Remove the `logo` import.

3. **`index.html`**: Add `class="dark"` to the `<html>` tag as a fallback.

4. **`tailwind.config.ts`**: Remove `darkMode: ["class"]` since we're always dark.

This eliminates all light mode code and ensures dark mode from first paint.

