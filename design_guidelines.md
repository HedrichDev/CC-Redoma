# CCredoma Design Guidelines

## Design Approach

**Hybrid Strategy**: 
- **Public Pages** (Landing, Catalog): Reference-based approach inspired by **Airbnb** and **Zillow** - emphasizing visual storytelling, property showcase, and conversion optimization
- **Admin Dashboards**: **Material Design System** - optimized for data density, efficiency, and task completion

## Typography

**Font Families**:
- **Headings & UI Elements**: Inter (weights: 400, 500, 600, 700)
- **Body Text**: Work Sans (weights: 400, 500, 600)

**Hierarchy**:
- Hero Headlines: text-5xl to text-6xl, font-bold
- Section Headers: text-3xl to text-4xl, font-semibold
- Card Titles: text-xl, font-semibold
- Body: text-base, font-normal
- Metadata/Labels: text-sm, font-medium

## Layout System

**Spacing Primitives**: Use Tailwind units of **4, 6, 8, 12, 16, 20** for consistent rhythm
- Component padding: p-6, p-8
- Section spacing: py-12, py-16, py-20
- Grid gaps: gap-6, gap-8
- Card spacing: p-6

**Container Strategy**:
- Full-width sections: max-w-7xl mx-auto
- Content sections: max-w-6xl
- Forms & focused content: max-w-2xl

## Color System

**Pre-defined Palette** (via CSS variables):

**Light Mode**:
- Background: `hsl(0 0% 100%)`
- Foreground: `hsl(0 0% 9%)`
- Primary: `hsl(210 85% 35%)` (deep blue)
- Secondary: `hsl(210 6% 90%)` (light gray)
- Destructive: `hsl(0 75% 35%)` (red)

**Dark Mode**:
- Background: `hsl(0 0% 8%)`
- Foreground: `hsl(0 0% 96%)`
- Primary: `hsl(210 85% 35%)`
- Secondary: `hsl(210 6% 18%)`
- Destructive: `hsl(0 75% 32%)`

## Component Library

### Public Pages (Airbnb/Zillow Style)

**Hero Section**:
- Full-width hero with large background image showcasing the commercial center
- Overlay with blurred button backgrounds for CTAs
- Prominent headline (text-5xl) + subheadline (text-xl)
- Primary CTA: "Explorar Locales Disponibles"
- Trust indicators below CTAs (e.g., "50+ locales comerciales")

**Property Catalog Grid**:
- 3-column grid (lg:grid-cols-3, md:grid-cols-2, grid-cols-1)
- Cards with large property images (aspect-ratio-4/3)
- Overlay badges for status ("Disponible", "Ocupado")
- Card info: Local name, size (m²), price, location
- Hover effect: subtle scale and shadow

**Property Detail Cards**:
- Large image gallery with thumbnails
- Specifications grid (2-column): Size, Type, Floor, Amenities
- Pricing section with prominent monthly rate
- Contact button with blurred background when over images

### Admin Dashboard (Material Design)

**Navigation**:
- Persistent sidebar (left) with icon + label navigation
- Grouped menu items by function (Gestión, Finanzas, Comunicación)
- Active state: filled background with primary color
- Top bar: User profile, notifications, breadcrumbs

**Dashboard Cards**:
- Metric cards in 4-column grid (lg:grid-cols-4)
- Large number display (text-3xl) with icon
- Trend indicators (arrows, percentage change)
- Subtle border, no heavy shadows

**Data Tables**:
- Dense table layout with alternating row backgrounds
- Sticky headers
- Action buttons (icon buttons) in last column
- Pagination controls at bottom
- Filter/search bar above table

**Forms**:
- Two-column layout for efficiency (lg:grid-cols-2)
- Grouped sections with section headers
- Input fields with floating labels
- Clear validation states (border color changes)
- Action buttons aligned right

### Tenant Portal

**Personal Dashboard**:
- Card-based layout with relevant information
- Contract summary card (prominent)
- Payment history table (compact)
- Quick actions sidebar
- Notification/alert cards for upcoming payments

## Images Strategy

**Required Images**:

1. **Hero Image**: Wide-angle shot of the commercial center interior or exterior (modern, well-lit, bustling atmosphere)
2. **Local Catalog**: Individual high-quality photos of each commercial space (interior views, storefront shots)
3. **Gallery Images**: Multiple angles of properties (3-5 images per local)
4. **Logo**: Use provided `redoma.jpg` in header (max-height: 48px)
5. **Favicon**: Use provided `Favicon.png`

**Image Treatment**:
- Hero: Full-width, minimum height 70vh, subtle overlay gradient
- Property cards: Rounded corners (rounded-lg), aspect-ratio-4/3
- Gallery: Thumbnail strip below main image
- Buttons over images: Use backdrop-blur-md with semi-transparent backgrounds

## Accessibility

- Maintain WCAG AA contrast ratios across all text
- Keyboard navigation for all interactive elements
- ARIA labels for icon-only buttons
- Focus indicators (ring-2 ring-primary ring-offset-2)
- Semantic HTML throughout

## Responsive Breakpoints

- Mobile: < 768px (single column, stacked navigation)
- Tablet: 768px - 1024px (2-column grids, simplified layouts)
- Desktop: > 1024px (full multi-column layouts, sidebar navigation)

## Key Differentiators

- **Public Pages**: Emphasis on visual appeal, large imagery, emotional connection to spaces
- **Dashboards**: Data density, quick scanning, task efficiency, minimal decoration
- **Tenant Portal**: Balance between information access and simplicity