# CCredoma - Commercial Center Management Platform

## Overview

CCredoma is a comprehensive web application designed for managing commercial shopping centers. The platform provides role-based access for four distinct user types:

- **CentroComercialAdmin**: Full administrative control over the shopping center, including management of commercial spaces, contracts, payments, and tenant requests
- **LocalOwner**: Tenant portal for viewing contracts, payment history, and submitting support requests
- **VisitanteExterno**: Public-facing catalog for prospective tenants to browse available commercial spaces and submit inquiries
- **Developer**: Developer tools panel with system information, API documentation, and test credentials

The application emphasizes visual storytelling for public pages (inspired by Airbnb/Zillow) while providing efficient, data-dense dashboards for administrative tasks (Material Design principles).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Stack

**Framework**: React 18 with TypeScript using Vite as the build tool

**Routing**: Wouter for lightweight client-side routing

**UI Component Library**: 
- Shadcn/ui (New York style) with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Class Variance Authority (CVA) for component variants

**State Management**:
- TanStack React Query (v5) for server state management
- React Context for authentication and theme state
- Local storage for JWT token persistence

**Form Handling**: React Hook Form with Zod validation resolvers

**Design System**:
- Typography: Inter (UI/headings) and Work Sans (body text)
- Color scheme: HSL-based with light/dark mode support
- Spacing: Tailwind units (4, 6, 8, 12, 16, 20)
- Hybrid design approach: Visual storytelling for public pages, Material Design for admin dashboards

### Backend Stack

**Runtime**: Node.js with Express.js

**Language**: TypeScript with ES Modules

**API Architecture**: RESTful endpoints with role-based authorization

**Authentication**: 
- JWT tokens with bcryptjs password hashing
- Token stored in localStorage on client
- Custom middleware for authentication and role-based authorization
- 7-day token expiration

**Database ORM**: Drizzle ORM configured for PostgreSQL

**Session Management**: Express sessions with connect-pg-simple for PostgreSQL-backed session storage

### Database Schema

**Core Entities**:
- **users**: User accounts with roles (CentroComercialAdmin, LocalOwner, VisitanteExterno, Developer)
- **locals**: Commercial spaces with type, status, pricing, images, and amenities
- **contracts**: Rental agreements linking tenants to commercial spaces
- **payments**: Payment records associated with contracts
- **requests**: Support/inquiry tickets from tenants and visitors

**Status Enums**:
- Local statuses: Disponible, Ocupado, Mantenimiento, Reservado
- Local types: Comercio, Restaurante, Servicios, Entretenimiento, Oficina
- Contract statuses: Activo, Vencido, Renovacion, Cancelado
- Payment statuses: Pendiente, Pagado, Atrasado, Cancelado
- Request statuses: Pendiente, EnProceso, Respondida, Cerrada

### API Structure

**Authentication Routes** (`/api/auth/*`):
- POST `/register` - User registration
- POST `/login` - User authentication
- GET `/me` - Current user profile
- POST `/logout` - Session termination

**Resource Routes** (all under `/api/*`):
- `/locals` - Commercial space CRUD operations
- `/contracts` - Contract management (admin and tenant views)
- `/payments` - Payment tracking and history
- `/requests` - Support ticket system

**Authorization Levels**:
- Public routes: Login, register, catalog browsing, local details
- Authenticated routes: User profile, request submission
- Admin-only routes: Creating/editing locals, managing contracts and payments
- Tenant-only routes: Viewing own contracts and payments

### Storage Layer

**Current Implementation**: In-memory storage (MemStorage class) implementing IStorage interface

**Production Ready**: Configured for PostgreSQL via Drizzle ORM with Neon serverless driver

**Data Access Patterns**:
- User lookups by ID, username, and email
- Filtered queries for contracts and payments by tenant
- Join operations for enriched data (ContractWithDetails, PaymentWithContract)

### Build & Deployment

**Development**:
- `npm run dev` - Vite dev server with HMR
- Development-specific index uses tsx with hot reload

**Production**:
- `npm run build` - Vite builds client, esbuild bundles server
- `npm start` - Serves static files from dist/public
- Server bundle uses ES modules format

**Type Safety**: 
- Shared schema types between client and server via `@shared/*` path alias
- Strict TypeScript configuration with ESNext modules

## External Dependencies

### Database
- **Neon Serverless PostgreSQL**: Cloud-hosted PostgreSQL database
- **Drizzle ORM**: Type-safe ORM with schema-first approach
- **connect-pg-simple**: PostgreSQL session store for Express

### Authentication & Security
- **jsonwebtoken**: JWT token generation and verification
- **bcryptjs**: Password hashing

### UI Component Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible components (accordion, dialog, dropdown, navigation, tooltip, etc.)
- **Tailwind CSS**: Utility-first CSS framework
- **cmdk**: Command palette component
- **date-fns**: Date manipulation library
- **lucide-react**: Icon library

### Development Tools
- **Vite**: Frontend build tool with HMR
- **@replit/vite-plugin-***: Replit-specific development plugins (runtime error overlay, cartographer, dev banner)
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast JavaScript bundler for production builds

### Fonts
- **Google Fonts**: Inter and Work Sans loaded via CDN

### Image Assets
Generated commercial space images stored in `attached_assets/generated_images/`:
- Retail commercial space
- Restaurant commercial space
- Office commercial space
- Services commercial space
- Entertainment commercial space

## Test Credentials

### Admin User (CentroComercialAdmin)
- Username: `admin`
- Password: `password`
- Email: admin@ccredoma.com
- Access: Full administrative dashboard with metrics, local management, contracts, payments, and requests

### Tenant User (LocalOwner)
- Username: `inquilino1`
- Password: `password`
- Email: inquilino@example.com
- Access: Tenant portal with active contract (Local B-205), payment history, and contract details

### External Visitor (VisitanteExterno)
- Username: `visitante`
- Password: `password`
- Email: visitante@example.com
- Access: Public catalog browsing and contact request submission

### Developer User (Developer)
- Username: `HedrichDev`
- Password: `Coralito*10`
- Email: hedrich@ccredoma.dev
- Access: Developer panel with system information, API documentation, test credentials, and development tools

See `TEST_CREDENTIALS.md` for complete verification guide and test scenarios.