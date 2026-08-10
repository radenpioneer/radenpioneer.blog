# Component conventions

Rules the author set by hand while the base components were written. They are settled — apply
them, don't relitigate them.

This is **not** the full conventions document. The complete extraction — every rule, whether it
is hard or a default, and what the base components failed to exercise — is its own piece of
work. What is written here is only the part the author decided directly.

## Components are React

Site components are `.tsx`, not `.astro`.

This overrides the earlier working assumption that `.astro` was the house style and React existed
only for the Keystatic admin UI. The author decided otherwise; a component being React is the
default now and needs no justification.

Layouts stay `.astro`. They are not components — they own `<head>`, the document shell, and the
assembly, all of which are Astro-only.

## Nothing hydrates

No component carries a `client:*` directive. Components render to plain HTML at build time and
the site ships no JavaScript.

An island is an exception that has to earn itself — a control that cannot work without a client
runtime, such as the portfolio index's dynamic sorting. Adding one is a decision, not a
convenience.

## One directory per component, two files

```
src/components/<component>/<component>.tsx     the component
src/components/<component>/<component>.astro   the wrapper
```

Both files carry the component's name; the directory is not a barrel and holds no `index` file.

**Pages and layouts import the `.astro`, never the `.tsx`.** A `.tsx` may import another `.tsx`
directly — both halves are already React and routing through the wrapper would re-cross the
boundary for nothing.

## The wrapper resolves everything Astro-only

The `.tsx` never knows it is running inside Astro. The wrapper's job is to turn Astro-only
things into plain props and children:

| Astro-only thing | What the wrapper does |
|---|---|
| `class` | passes it down as `className` |
| default slot | passes it down as `children` |
| named slot | passes it down as a prop holding rendered markup (see `card/card.astro`) |
| `Astro.slots.has(…)` | resolves it to a boolean prop — a slot always arrives renderable, so the React half cannot ask this question itself |
| `Astro.url`, `Astro.site`, … | reads the value and passes it as a plain prop |
| `astro:assets` `<Image>` | renders the image and hands it over as children (see `cover/cover.astro`) |
| scoped `<style>` | nothing — see below |

The props type is declared once, in the `.tsx`, and the wrapper imports it and reshapes it with
`Omit`. It is never retyped by hand in both files.

A wrapper that adds nothing is still written. Uniform imports are worth more than the four lines
saved.

## Arrow functions

Components are `const Name = (props) => …`, never `function Name(props) {}`.

## Styling

- Tailwind utilities on the element that needs them.
- Design tokens live in one `@theme` block in `src/layout/global.css`. A component never
  hard-codes a colour, a face, or an assembly measure.
- `class:list` does not exist in a `.tsx`. Use `cx()` from `src/lib/cx.ts`.
- **An Astro scoped `<style>` does not reach the output of a framework component.** Styles that
  would have been scoped go in `global.css` under `@layer components`, keyed off a class the
  component sets (see `.prose-column`).
- Some of DESIGN.md's named rules are enforced by *deleting* their token namespaces in `@theme`,
  so the `rounded-*`, `shadow-*` and `animate-*` scales are not utilities that exist. Breaking
  those rules takes a deliberate edit to that block, which is the point. The enforcement is not
  total: Tailwind defines a few of these without a token, and `rounded-full` in particular still
  works. Treat it as a rule with a lock on the front door, not a wall.
- Tailwind scans `src/` only, pinned by `source(none)` plus an explicit `@source`. Its automatic
  detection otherwise walks `.agents/` and mines class names out of the skill scripts.

## Configuration

`src/config/` is the home for values that only take effect after a code edit — nav, footer,
socials, `lang`. Never inlined per page. Anything the author should be able to change without a
code edit belongs in the CMS instead (`CONTEXT.md`, *Site Settings*).
