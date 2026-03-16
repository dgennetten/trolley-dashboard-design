# Typography Configuration

## Google Fonts Import

Add to your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@300..700&display=swap" rel="stylesheet">
```

## Font Usage

- **Headings:** DM Sans — Used for page titles, section headings, card titles, navigation items. Applied via `font-['DM_Sans']` class or CSS `font-family: 'DM Sans', sans-serif`.
- **Body text:** Inter — Used for paragraphs, form labels, table content, descriptions, and general UI text. Applied as the default body font.
- **Code/technical:** IBM Plex Mono — Used for code snippets, technical identifiers, and monospaced content. Applied via `font-mono` or CSS `font-family: 'IBM Plex Mono', monospace`.

## Weight Usage

- **DM Sans:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Inter:** 300 (light), 400 (normal), 500 (medium), 600 (semibold)
- **IBM Plex Mono:** 400 (normal), 500 (medium)
