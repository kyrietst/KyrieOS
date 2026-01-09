# Kyrie OS - Style Guide & UI Standards

## 1. Visual Identity

- **Theme**: Premium Dark Mode.
- **Palette**: Dominant use of Zinc/Slate (900/950) with high-contrast white
  text.
- **Effect**: Extensive use of **Glassmorphism** (blur filters, semi-transparent
  backgrounds) for cards and overlays to create depth.

## 2. Tooling

- **Tailwind CSS**: Utility-first styling.
- **Shadcn UI**: Base component library. Do not build generic inputs/buttons
  from scratch; wrap Shadcn components.
- **Lucide Icons**: Standard icon set. Clean and consistent.
- **Framer Motion**: Standard for UI interactions (modals, list transitions).

## 3. UI Rules & Best Practices

### The Magic Rule

- **Complex UI**: Prioritize using the **Magic MCP** to scaffold complex
  components or animations.
- **Refinement**: Always refactor "Magic" generated code to fit our specific
  needs (e.g., removing demo text).

### Composition Pattern (Critical)

- **Animated Backgrounds**: Components like `RevolutionHero` must be pure visual
  wrappers.
- **Segregation**: Never mix page logic (forms, state) inside the background
  component.
- **Structure**:
  ```tsx
  // Good Pattern
  <BackgroundWrapper>
      <ContentOverlay>
          <LogicComponent />
      </ContentOverlay>
  </BackgroundWrapper>;
  ```

## 4. Typography

- **Font**: Inter (default Next.js font).
- **Scale**: Use standard Tailwind spacing and font sizes.
- **Readability**: Ensure high contrast for accessibility, especially on dark
  backgrounds.
