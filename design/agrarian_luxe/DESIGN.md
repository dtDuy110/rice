---
name: Agrarian Luxe
colors:
  surface: '#fdf9f0'
  surface-dim: '#dddad1'
  surface-bright: '#fdf9f0'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3ea'
  surface-container: '#f1eee5'
  surface-container-high: '#ece8df'
  surface-container-highest: '#e6e2d9'
  on-surface: '#1c1c16'
  on-surface-variant: '#404945'
  inverse-surface: '#31302b'
  inverse-on-surface: '#f4f0e7'
  outline: '#717975'
  outline-variant: '#c0c8c4'
  surface-tint: '#396759'
  primary: '#154539'
  on-primary: '#ffffff'
  primary-container: '#2f5d50'
  on-primary-container: '#a3d4c3'
  inverse-primary: '#a0d1c0'
  secondary: '#7a5900'
  on-secondary: '#ffffff'
  secondary-container: '#feca5a'
  on-secondary-container: '#745500'
  tertiary: '#5a3516'
  on-tertiary: '#ffffff'
  tertiary-container: '#754b2b'
  on-tertiary-container: '#f7be95'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bceddc'
  primary-fixed-dim: '#a0d1c0'
  on-primary-fixed: '#002019'
  on-primary-fixed-variant: '#204f42'
  secondary-fixed: '#ffdea1'
  secondary-fixed-dim: '#f2bf50'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5c4300'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#f4bb92'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#653d1e'
  background: '#fdf9f0'
  on-background: '#1c1c16'
  surface-variant: '#e6e2d9'
typography:
  display-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Be Vietnam Pro
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  section-gap: 80px
---

## Brand & Style
This design system embodies "Agrarian Luxury"—a fusion of high-end editorial commerce and the functional precision of a modern SaaS dashboard. The aesthetic prioritizes farm-to-table transparency through a lens of professional reliability. 

The visual direction follows a **Corporate / Modern** framework infused with **Minimalism**. It uses expansive white space and a "warm-tech" approach to evoke trust, quality, and organic origins. The UI should feel as organized as a financial tool but as tactile and inviting as a premium boutique. Key emotional drivers are "Purity," "Provenance," and "Efficiency."

## Colors
The palette is grounded in the lifecycle of rice: from the deep chlorophyll of the paddy fields to the golden hue of the harvest. 

- **Primary (Deep Natural Green):** Used for primary actions, navigation headers, and brand-heavy moments. It represents growth and sustainability.
- **Secondary (Rice Gold):** Reserved for accents, badges, and "Premium" callouts. Use sparingly to maintain its value.
- **Background Tones:** We use a dual-tone background strategy. `#F5F1E8` (Warm Beige) serves as the canvas for the main page layout, while `#FFFDF8` (Soft Cream) is used for cards and containers to create soft, legible "islands" of content.
- **Status Colors:** These are intentionally de-saturated to prevent them from breaking the organic harmony of the interface, ensuring they feel like part of the brand family rather than generic system alerts.

## Typography
We employ a tiered typographic system to balance heritage and utility. 

**Be Vietnam Pro** is utilized for headlines to subtly nod to the product's origin while maintaining a contemporary, geometric feel. It should be set with tight tracking in display sizes to create a "locked-in" professional look.

**Inter** serves as the workhorse for all body copy, data, and UI labels. To achieve the "generous leading" requested, body text uses a 1.5x to 1.6x line-height ratio, ensuring that product descriptions and shipping details are easy to digest. Use `label-md` for secondary navigation and utility headers to introduce a rhythmic "SaaS" structure to the page.

## Layout & Spacing
The layout uses a **Fixed Grid** model for desktop to ensure a curated, "catalog" feel, transitioning to a fluid model for mobile.

- **Desktop (1280px+):** A 12-column grid with generous 24px gutters. Sections are separated by large 80px gaps to provide "breathing room" for premium product photography.
- **Content Alignment:** Information-heavy dashboard views (like order history or subscription management) should utilize a sidebar-and-main-panel layout typical of modern SaaS tools.
- **Rhythm:** All vertical spacing must be a multiple of 8px. Use larger padding (48px+) inside product cards to reinforce the sense of luxury.

## Elevation & Depth
This design system uses **Tonal Layers** combined with **Ambient Shadows** to create a structured, professional hierarchy.

1.  **Canvas (Level 0):** The `neutral_color_hex` (Warm Beige) acts as the base floor.
2.  **Surface (Level 1):** Cards, inputs, and content containers use the `background_surface` (Soft Cream). These should have a very soft, diffused shadow: `0px 4px 20px rgba(47, 93, 80, 0.05)`. Note the subtle green tint in the shadow to keep it organic.
3.  **Raised (Level 2):** Hover states and active dropdowns increase shadow spread and opacity: `0px 8px 30px rgba(47, 93, 80, 0.1)`.
4.  **Flat Interaction:** For a "Stripe-inspired" feel, use a 1px solid border in a slightly darker shade of the neutral color for elements that need clear definition without the weight of a shadow.

## Shapes
The shape language is consistently "Soft-Modern." 

A base radius of **12px (`rounded-lg`)** is the standard for buttons, input fields, and small UI components. Large containers, such as product image cards and modal windows, should scale up to **16px (`rounded-xl`)**. 

This roundedness level removes the "sharpness" of traditional enterprise software, making the interface feel more approachable and organic, while remaining structured enough for an e-commerce platform. Avoid completely circular "pill" shapes for buttons to maintain the professional, SaaS-inspired aesthetic—stick to the defined 12px radii.

## Components
- **Buttons:** Primary buttons use a solid `primary_color_hex` with white text. Secondary buttons use a transparent background with a 1.5px border of the primary color. All buttons feature the 12px corner radius and a subtle lift on hover.
- **Input Fields:** Use the Soft Cream background with a subtle 1px border. On focus, the border thickens and changes to the Primary Green.
- **Product Cards:** These are the hero of the system. They feature a full-bleed image at the top with 16px top-rounded corners, and a content area below with 24px-32px of internal padding.
- **Chips/Badges:** Use for "Organic," "In Stock," or "Fair Trade" labels. These use the Secondary Gold or Earth Brown in a low-opacity "tint" background with high-contrast text.
- **Progressive Disclosure:** For the dashboard elements (subscription tracking), use thin dividers and "Ghost" buttons to keep the focus on the data while maintaining a clean, minimal UI.
- **Inventory/Stock Indicators:** Use a horizontal bar (rounded) to show stock levels, utilizing the muted Success/Warning palette.