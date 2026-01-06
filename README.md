# Xeluxe Website

A modern, professional corporate website for Xeluxe - a fire and life safety engineering consultancy firm specializing in complex, high-performance environments.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Documentation](#documentation)

## ✨ Features

- **Dynamic Content Management** - Services, projects, sectors, blog, and careers
- **SEO Optimized** - Dynamic meta tags, Open Graph, and structured data
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Rich Animations** - Framer Motion and GSAP scroll-triggered animations
- **Type-Safe** - Full TypeScript implementation with strict type checking
- **Fast Performance** - Vite build system with code splitting and optimization
- **Context API** - Global state management for settings and menus

## 🛠 Tech Stack

- **React 18.2.0** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 7.0.4** - Build tool and dev server
- **React Router 7.8.0** - Client-side routing
- **Framer Motion 12.23.12** - Animation library
- **GSAP 3.13.0** - Advanced animations with ScrollTrigger
- **Lucide React 0.525.0** - Icon library
- **CSS Modules** - Scoped component styling
- **Tailwind CSS** - Utility-first CSS framework

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (for cloning the repository)

Check your versions:
```bash
node --version
npm --version
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/jipinm/xeluxe.git
cd xeluxe
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

This will install all required dependencies including:
- React and React DOM
- TypeScript and type definitions
- Vite and its plugins
- Animation libraries (Framer Motion, GSAP)
- Routing (React Router DOM)
- Icon library (Lucide React)
- Development tools (ESLint, TypeScript ESLint)

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Windows PowerShell
New-Item .env

# macOS/Linux
touch .env
```

Add the following configuration:

```env
# API Base URL (Backend PHP API)
VITE_API_BASE_URL=http://xeluxe-admin.local

# Or for production
# VITE_API_BASE_URL=https://api.xeluxe.com
```

**Important:** Replace `http://xeluxe-admin.local` with your actual backend API URL.

## ⚙️ Configuration

### Backend API Setup

The application requires a PHP backend API. Ensure the following endpoints are available:

- `/public-api/settings.php` - Global settings
- `/public-api/service-categories.php` - Services data
- `/public-api/featured-projects.php` - Featured projects
- `/public-api/featured-sectors.php` - Featured sectors
- `/public-api/blog.php` - Blog posts
- `/public-api/careers.php` - Career listings
- `/public-api/seo.php` - SEO meta data

### CORS Configuration

If your API is on a different domain, configure CORS headers on your backend:

```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
```

## 🔧 Development

### Start Development Server

```bash
npm run dev
```

The application will be available at:
```
http://localhost:5173
```

The dev server features:
- **Hot Module Replacement (HMR)** - Instant updates without full page reload
- **Fast Refresh** - Preserves React component state during updates
- **TypeScript Checking** - Real-time type error detection
- **ESLint Integration** - Code quality checks

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks |

### Development Workflow

1. **Start the dev server**: `npm run dev`
2. **Make changes** to components in `src/`
3. **View updates** instantly in the browser
4. **Check console** for TypeScript or linting errors
5. **Test thoroughly** before building for production

## 📦 Building for Production

### 1. Run Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory with:
- Minified JavaScript and CSS
- Tree-shaken code (unused code removed)
- Optimized assets and images
- Source maps for debugging

### 2. Preview Production Build

Test the production build locally:

```bash
npm run preview
```

Access at `http://localhost:4173`

### 3. Build Output

```
dist/
├── index.html              # Entry HTML file
├── assets/
│   ├── index-[hash].js     # Bundled JavaScript (~540KB)
│   ├── index-[hash].css    # Bundled CSS (~147KB)
│   └── [images]            # Optimized images
└── public/                 # Static assets
```

### 4. Deploy to Production

#### Option A: Static Hosting (Netlify, Vercel, etc.)

1. Build the project: `npm run build`
2. Deploy the `dist/` folder
3. Configure redirects for SPA routing:

**Netlify** - Create `public/_redirects`:
```
/*    /index.html   200
```

**Vercel** - Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### Option B: Traditional Web Server

**Apache** - Create `.htaccess` in `dist/`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx** - Add to server block:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## 📁 Project Structure

```
xeluxe/
├── public/                 # Static assets
│   └── images/            # Image assets (certificates, clients, projects, team)
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Hero/
│   │   ├── Services/
│   │   ├── Projects/
│   │   └── ...
│   ├── pages/             # Page-level components
│   │   ├── HomePage.tsx
│   │   ├── AboutUs.tsx
│   │   ├── Services.tsx
│   │   └── ...
│   ├── contexts/          # React Context providers
│   │   ├── SettingsContext.tsx
│   │   ├── ServiceMenuContext.tsx
│   │   └── ProjectMenuContext.tsx
│   ├── services/          # API service layer
│   │   └── api.ts
│   ├── hooks/             # Custom React hooks
│   │   └── useSEO.ts
│   ├── data/              # Static data files
│   ├── assets/            # Application assets
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── .env                   # Environment variables
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── eslint.config.js       # ESLint configuration
└── README.md              # This file
```

## 📚 Documentation

For comprehensive technical documentation, see:
- **[TECHNICAL-DOCUMENTATION.md](./TECHNICAL-DOCUMENTATION.md)** - Complete architecture, API integration, component patterns, and development guidelines

## 🐛 Troubleshooting

### Common Issues

**Issue:** `npm install` fails
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Issue:** Port 5173 already in use
```bash
# Kill process using the port (Windows PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process

# Or specify a different port
npm run dev -- --port 3000
```

**Issue:** API requests failing
- Verify `VITE_API_BASE_URL` in `.env` is correct
- Check backend API is running and accessible
- Verify CORS headers are configured on backend

**Issue:** TypeScript errors
```bash
# Run type check
npx tsc --noEmit
```

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://xeluxe-admin.local` |

**Note:** All environment variables must be prefixed with `VITE_` to be exposed to the client-side code.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Contact

**Repository:** [https://github.com/jipinm/xeluxe](https://github.com/jipinm/xeluxe)  
**Issues:** [https://github.com/jipinm/xeluxe/issues](https://github.com/jipinm/xeluxe/issues)

---

Built with ❤️ using React + TypeScript + Vite
