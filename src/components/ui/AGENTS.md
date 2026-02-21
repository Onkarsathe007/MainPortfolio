# UI COMPONENTS

**39% of project codebase - 17 files, 1,255 lines**

## OVERVIEW
Custom UI library mixing shadcn/ui primitives, Framer Motion animations, and page section components.

## STRUCTURE
```
ui/
├── Blog/
│   ├── BlogCards.jsx        # Blog8 card component
│   └── Blog1.jsx            # Unused blog component
├── [shadcn/ui base]
│   ├── button.jsx           # Radix Slot + CVA variants
│   ├── button-variants.js   # Variant definitions
│   ├── input.jsx
│   ├── checkbox.jsx
│   └── label.jsx
├── [animated components]
│   ├── moving-border.jsx    # Framer Motion border animation
│   ├── spotlight.jsx        # Spotlight effect
│   ├── tubelight-navbar.jsx # Animated navbar
│   └── tilt.jsx             # 3D tilt effect
├── [page sections]
│   ├── hero.jsx
│   ├── About.jsx
│   ├── Technical-Skills.jsx
│   ├── Projects.jsx
│   ├── TiltShowcase.jsx
│   ├── GitHubCalendar.jsx
│   └── stacked-circular-footer.jsx
└── icons.jsx                # Icon components
```

## COMPONENT CATEGORIES

**shadcn/ui Base** (button, input, checkbox, label)
- Pattern: Radix UI primitive + `cn()` + variants
- `Button` uses `Slot` for polymorphism (`asChild` prop)
- Variants extracted to separate file (`button-variants.js`)

**Animated Components** (moving-border, spotlight, tubelight-navbar, tilt)
- Built with Framer Motion
- Use `motion.*` components
- Custom physics/spring configs

**Page Sections** (Hero, About, Projects, etc.)
- Direct imports in `HomePage.jsx`
- Large, non-reusable components
- Mix of static content and API data

## CONVENTIONS

**Import Path**: Use `@/lib/utils` for `cn()` helper

**Variant System**: 
```js
// Separate variants file pattern
import { buttonVariants } from "./button-variants"
const Button = ({ variant, size, ...props }) => (
  <Comp className={cn(buttonVariants({ variant, size }))} {...props} />
)
```

**Framer Motion**:
- Import: `import { motion } from "framer-motion"`
- Disabled ESLint unused var warning via `varsIgnorePattern: 'motion'`

**Styling**:
- All Tailwind classes
- Design tokens: `bg-primary`, `text-foreground`, etc.
- No inline styles

## WHERE TO ADD

| Component Type | Location | Pattern |
|---------------|----------|---------|
| New primitive | `ui/{name}.jsx` | shadcn/ui pattern (Radix + CVA) |
| New animation | `ui/{name}.jsx` | Framer Motion + Tailwind |
| New page section | `ui/{Name}.jsx` | Capital case, import in HomePage |
| Blog component | `ui/Blog/{Name}.jsx` | Subfolder pattern |

## NOTES

**Mixed Abstractions**: Primitives (Button) coexist with page sections (Hero) - no separation

**No Storybook/Docs**: Component props/usage not documented

**Blog1.jsx Unused**: Exists but not imported anywhere - can be removed
