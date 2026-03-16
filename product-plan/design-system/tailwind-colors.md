# Tailwind Color Configuration

## Color Choices

- **Primary:** `emerald` — Used for buttons, links, key accents, active navigation states
- **Secondary:** `amber` — Used for tags, highlights, secondary elements, warning states, hover accents
- **Neutral:** `stone` — Used for backgrounds, text, borders, cards, and all neutral surfaces

## Usage Examples

```
Primary button:      bg-emerald-600 hover:bg-emerald-500 text-white
Primary link:        text-emerald-600 hover:text-emerald-700 dark:text-emerald-400
Primary badge:       bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400

Secondary badge:     bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400
Secondary accent:    text-amber-600 dark:text-amber-400
Warning state:       bg-amber-50 border-amber-200 text-amber-700

Neutral background:  bg-stone-50 dark:bg-stone-950
Card surface:        bg-white dark:bg-stone-900
Border:              border-stone-200 dark:border-stone-700
Primary text:        text-stone-900 dark:text-stone-100
Secondary text:      text-stone-500 dark:text-stone-400
Muted text:          text-stone-400 dark:text-stone-500

Error/destructive:   bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400
Success/delivered:   bg-emerald-100 text-emerald-700 (same as primary badge)
```

## Dark Mode

All components use Tailwind's `dark:` variants. The design assumes a class-based dark mode toggle (`dark` class on `<html>`).
