# Portfolio Theme Design System

---

# Theme Philosophy

The portfolio should feel:

Minimal

Elegant

Premium

Modern

Clean

Comfortable

Technology focused

Dark Mode is NOT an inverted Light Mode.

Both themes share exactly the same visual identity.

---

# Theme Architecture

ThemeProvider

↓

Theme Context

↓

CSS Variables

↓

Components

↓

ReactBits

↓

Markdown Renderer

↓

EmailJS

Every visual element must consume semantic tokens.

Never hardcode colors.

---

# Theme List

Current

✓ Light

✓ Dark

Reserved

AMOLED

Midnight Blue

---

# Light Theme

Background

#FFFFFF

Secondary Background

#F8FAFC

Surface

#FFFFFF

Elevated Surface

#FFFFFF

Glass

rgba(255,255,255,.65)

Primary

#4CCBFF

Primary Hover

#69D7FF

Gradient

#4CCBFF → #2F6BFF

Text Primary

#0F172A

Text Secondary

#475569

Text Muted

#94A3B8

Border

rgba(15,23,42,.08)

Hover Border

rgba(76,203,255,.25)

---

# Dark Theme

Background

#0F1117

Secondary Background

#151922

Surface

#1B2230

Elevated Surface

#232C3D

Glass

rgba(35,44,61,.65)

Primary

#4CCBFF

Primary Hover

#69D7FF

Gradient

#4CCBFF → #2F6BFF

Text Primary

#F4F7FB

Text Secondary

#CBD5E1

Text Muted

#94A3B8

Border

rgba(255,255,255,.08)

Hover Border

rgba(76,203,255,.25)

---

# Reserved AMOLED

Background

#000000

Surface

#090909

Border

rgba(255,255,255,.05)

---

# Reserved Midnight

Background

#09111D

Surface

#101827

Border

rgba(255,255,255,.08)

---

# Border Radius

Cards

24px

Buttons

999px

Inputs

16px

Badge

999px

---

# Shadows

Small

0 4px 12px rgba(0,0,0,.10)

Medium

0 12px 32px rgba(0,0,0,.18)

Large

0 24px 64px rgba(0,0,0,.25)

Dark shadows should never feel heavy.

---

# Motion

Theme Transition

250ms

Hover

200ms

Click

120ms

Spring animations remain unchanged.

---

# ReactBits

Never redesign.

Only inherit semantic colors.

---

# Markdown

Automatically support both themes.

Syntax highlighting follows active theme.

Tables adapt automatically.

Images remain unchanged.

---

# Forms

EmailJS form automatically inherits theme.

Validation colors:

Success

#22C55E

Warning

#FACC15

Error

#EF4444

---

# Accessibility

WCAG AA

Keyboard Navigation

Visible Focus Ring

Reduced Motion

Screen Reader Friendly

---

# Performance Rules

Use CSS Variables.

Avoid inline styles.

Avoid duplicated colors.

Avoid unnecessary React re-renders.

Never hardcode color values inside components.

Every component must inherit colors from semantic tokens only.

This theme system should scale to unlimited future themes without requiring component rewrites.