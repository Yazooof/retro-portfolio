# Yusuf's Retro Portfolio

A personal portfolio website with a retro SNES/16-bit gaming aesthetic, built with modern web technologies.

## Technologies Used

### Core Framework

- **React 19** - The latest version of React for building the user interface
  - Component-based architecture for reusable UI elements
  - Hooks (useState, useEffect) for state management and side effects
  - Fast rendering with React's virtual DOM

- **Vite** - Next-generation frontend build tool
  - Lightning-fast hot module replacement (HMR) during development
  - Optimized production builds with code splitting
  - Native ES modules support for faster dev server startup

### Styling

- **Tailwind CSS** - Utility-first CSS framework
  - Responsive design with mobile-first breakpoints (sm, md, lg)
  - Rapid UI development with utility classes
  - Consistent spacing, colors, and typography

- **Custom CSS** - For the unique SNES retro theme
  - CSS variables for theming (SNES color palette)
  - CRT scanline effects and pixel-perfect shadows
  - Custom animations and hover effects

### Animation

- **Framer Motion** - Production-ready animation library for React
  - Smooth page transitions and scroll animations
  - Interactive hover and tap effects
  - AnimatePresence for enter/exit animations

### Fonts

- **Press Start 2P** - Retro pixel font for headings
- **VT323** - Monospace terminal font for body text

### Development Tools

- **ESLint** - Code linting for consistent code quality
- **PostCSS + Autoprefixer** - CSS processing and browser compatibility

## Project Structure

```
src/
├── main.jsx              # Application entry point
├── App.jsx               # Main app component
├── App.css               # Custom SNES theme styles
├── index.css             # Base styles and Tailwind imports
├── assets/               # Static assets
└── components/           # React components
    ├── index.js          # Barrel export file
    ├── Nav.jsx           # Navigation bar
    ├── Hero.jsx          # Hero/landing section
    ├── About.jsx         # About me section
    ├── Projects.jsx      # Projects showcase
    ├── Contact.jsx       # Contact form & social links
    ├── Footer.jsx        # Footer component
    └── FloatingSprite.jsx # Animated background sprites
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

- Responsive design (mobile, tablet, desktop)
- Animated floating game sprites background
- Interactive navigation with scroll tracking
- Contact form ready for EmailJS integration
- Retro CRT scanline effect overlay
- SNES controller-style buttons

## License

MIT
