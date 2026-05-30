# StreamVibe

[English](./README.md) | [Русский](./README.ru.md)

A responsive streaming platform frontend built with React, TypeScript, and scalable frontend architecture principles.

---

## Preview

> Add screenshots or demo link here

---

## Features

### Core Features

- Responsive adaptive layout
- Reusable UI component architecture
- Typed routing system
- Internationalization (i18n)
- Accessibility-first approach
- Reusable slider abstraction
- Config-driven navigation
- Scalable layout structure

---

## Advanced Features

### Real-Time Currency Conversion

The project integrates a real exchange rates API and dynamically converts subscription prices based on the selected locale and currency.

Currency conversion works together with the i18n system to provide a more realistic and localized user experience.

Features include:

- Real API integration
- Dynamic currency conversion
- Locale-aware formatting
- Async data loading
- Error handling and loading states
- Reusable exchange rate hook architecture

---

### Typed Data Layer Simulation

The project emulates a real backend-driven catalog architecture.

Instead of hardcoded UI-only data, the application uses structured typed entities and reusable data models for:

- Movies
- Shows
- Categories
- Genres
- Navigation sections
- Subscriptions

This approach makes the frontend architecture closer to a production-ready application.

---

### Reusable Slider System

The project includes a reusable abstraction over Swiper.

The slider system supports:

- Shared default configuration
- Flexible per-instance overrides
- Custom pagination
- Custom scrollbar
- Navigation controls
- Responsive breakpoints
- Overflow handling

This allows scalable slider reuse across multiple sections without configuration duplication.

---

### Strict TypeScript Architecture

The application heavily relies on TypeScript to improve maintainability and scalability.

Examples include:

- Typed routes
- Typed navigation config
- Strongly typed entities
- Component prop contracts
- Utility typing
- Reusable interfaces and types
- Safer refactoring

The routing system itself is fully typed and helps avoid invalid route usage across the application.

---

### Accessibility

The project follows accessibility-oriented development practices.

Implemented features include:

- Semantic HTML structure
- ARIA attributes
- Keyboard navigation support
- Accessible interactive elements
- Proper heading hierarchy
- Improved screen reader compatibility

---

### Responsive Design Strategy

The project uses a scalable responsive system based on reusable SCSS utilities and fluid adaptive sizing.

Features include:

- Mobile-first approach
- Fluid typography
- Adaptive spacing
- Responsive utility mixins
- Reusable layout containers
- Flexible component behavior

---

### Skeleton Loading System

The project implements skeleton loading states for asynchronous UI sections that receive data from APIs.

Instead of using traditional spinners, the interface displays adaptive skeleton placeholders that preserve layout stability and improve perceived performance.

Features include:

- Reusable skeleton components
- Layout-preserving loading states
- Async API integration
- Improved UX during data fetching
- Responsive skeleton layouts
- Section-specific loading placeholders

This approach makes the application feel more responsive and closer to production-grade user experience standards.

---

## Tech Stack

- React
- TypeScript
- React Router
- SCSS
- Swiper
- Vite

---

## Project Architecture

The project is structured around reusable scalable frontend architecture principles.

### Architecture Highlights

- Shared layouts
- Reusable content shells
- Config-driven navigation
- Typed routing
- Shared UI components
- Modular SCSS structure
- Reusable hooks
- Localization-ready architecture

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build project

```bash
npm run build
```

---

## Future Improvements

Planned improvements include:

- Backend integration
- Authentication system
- Favorites/watchlist
- Search functionality
- Theme switching
- Lazy loading optimization
- Unit and integration tests
- API caching
- Performance optimizations

---

## Key Engineering Decisions

### Why Typed Routing?

Typed routing helps avoid invalid route usage and improves navigation maintainability during refactoring.

---

### Why a Slider Abstraction?

Instead of duplicating Swiper configuration across the project, the application uses a reusable slider wrapper with centralized defaults and scalable customization.

---

### Why Config-Driven Navigation?

Navigation sections are fully configurable and separated from UI logic, making the system easier to scale and maintain.

---

### Why a Simulated Data Layer?

The project intentionally imitates a real backend-driven architecture to better reflect production frontend development practices.

---

## License

This project is created for educational and portfolio purposes.
