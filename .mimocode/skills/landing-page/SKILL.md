---
name: landing-page
description: Create a modern SaaS landing page with hero, features, pricing, and CTA sections. Supports HTML/CSS/JS, NextJS, or Sass variants.
---

# Landing Page Creation Skill

Create a professional SaaS landing page with consistent structure across different tech stacks.

## When to Use

- User asks to create a "landing page", "saas page", or "hero page"
- User specifies a tech stack (HTML/CSS/JS, NextJS, Sass)
- User provides a brand name or product description

## Inputs

- **Tech stack**: `html` (default), `nextjs`, or `sass`
- **Brand name**: Optional, defaults to a generated name
- **Product description**: Optional, for generating relevant copy

## Output Structure

All variants produce a landing page with these sections:

1. **Hero** - Headline, subheadline, CTA button, hero image/illustration
2. **Features** - 3-4 feature cards with icons and descriptions
3. **Social proof** - Testimonials or logos
4. **Pricing** - 2-3 pricing tiers
5. **CTA** - Final call-to-action section
6. **Footer** - Links, copyright

## Workflow

### HTML/CSS/JS Variant

1. Create `index.html` with semantic HTML structure
2. Create `styles.css` with CSS variables for theming
3. Create `script.js` for interactions (mobile menu, smooth scroll)
4. Use modern CSS (grid, flexbox, clamp(), custom properties)

### NextJS Variant

1. Initialize NextJS project if not present
2. Create `app/page.tsx` with client components
3. Create `app/globals.css` with Tailwind theme
4. Use `"use client"` for interactive components
5. Install dependencies: `npm install lucide-react`

### Sass Variant

1. Create `index.html` with linked stylesheets
2. Create `styles.scss` with nesting and variables
3. Create `script.js` for interactions
4. Compile Sass to CSS

## Design Guidelines

- **Colors**: Use CSS custom properties for easy theming
- **Typography**: System font stack or Google Fonts (Inter, Montserrat)
- **Spacing**: Consistent 8px grid system
- **Responsive**: Mobile-first, breakpoints at 640px, 768px, 1024px
- **Accessibility**: Semantic HTML, proper contrast ratios, focus states

## Example Prompt Patterns

```
User: "create landing page with HTML, CSS, JS"
User: "tạo landing page Sass"
User: "create saas landing page NextJS"
User: "landing page for [brand name]"
```

## Validation

After creation:
1. Verify all files exist
2. Check HTML validity
3. Test responsive behavior
4. Ensure all sections render correctly
