# 💰 FinTrack - Personal Finance Management Frontend

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://fintrack-fe-blue.vercel.app/)
[![React](https://img.shields.io/badge/Built%20with-React-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Powered%20by-Vite-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![CSS Modules](https://img.shields.io/badge/Styled%20with-CSS%20Modules-1572B6?style=for-the-badge&logo=css3)](https://github.com/css-modules/css-modules)

> **Take Control of Your Financial Future** 📈  
> A comprehensive React application for managing personal finances, tracking expenses, and achieving your savings goals. Experience financial planning made simple with our intuitive, responsive interface.

## 📖 Table of Contents

- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [🎨 Design System](#-design-system)
- [🏗 Project Structure](#-project-structure)
- [📱 Screenshots](#-screenshots)
- [🌐 Live Demo](#-live-demo)

## ✨ Features

### 🎯 Core Functionality
- **💼 Project Management**: Create and manage multiple financial projects (savings, investments, hybrid plans)
- **📊 Category Organization**: Organize expenses into customizable categories for better tracking
- **💳 Expense Tracking**: Record and monitor all your expenses with detailed information
- **📈 Visual Analytics**: Interactive pie charts and data visualization with Recharts
- **🔐 User Authentication**: Secure sign-up/sign-in with JWT token management
- **📋 Dashboard**: Comprehensive overview of all your financial projects and progress

### 🎨 Design Features
- **🌟 Modern UI**: Clean, professional design with emerald green theme
- **📱 Fully Responsive**: Mobile-first design that works perfectly on all devices
- **🎪 CSS Modules**: Component-scoped styling for maintainable and scalable code
- **🎭 Design Tokens**: Consistent color palette, typography, and spacing system
- **♿ Accessibility**: WCAG compliant with proper semantic HTML and ARIA attributes
- **🚀 Smooth Interactions**: Hover effects, transitions, and loading states

### 🔧 Technical Features
- **⚡ Lightning Fast**: Vite-powered development with hot module replacement
- **🔄 Real-time Updates**: Optimistic UI updates with backend synchronization
- **🛡️ Error Handling**: Comprehensive error boundaries and user feedback
- **🧮 Financial Calculations**: Built-in calculation services for budgets and expenses
- **🗂️ State Management**: Efficient React state management with hooks
- **🧩 Modular Architecture**: Reusable, maintainable component structure

## 🛠 Tech Stack

### Frontend Framework
```
⚛️ React 19           - Latest UI framework with concurrent features
⚡ Vite               - Next-generation build tool and dev server
🧭 React Router DOM   - Client-side routing with v7
🎯 React Hooks        - Modern state and lifecycle management
```

### Data Visualization
```
📊 Recharts           - Powerful charting library for financial data
📈 Pie Charts         - Visual expense breakdown by category
📉 Data Analytics     - Interactive financial insights
```

### Styling & Design
```
🎨 CSS Modules        - Component-scoped styling
🎭 CSS Variables      - Comprehensive design token system
📱 Media Queries      - Responsive design across all devices
🎪 Flexbox/Grid       - Modern layout systems
♿ ARIA Attributes     - Accessibility support
```

### Development Tools
```
📦 npm               - Package manager
🔧 ESLint            - Code linting and quality assurance
🌐 Fetch API         - HTTP requests to backend API
🔑 JWT Handling      - Secure authentication token management
🐍 Python Backend    - FastAPI backend integration
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+ recommended)
- npm
- Access to FinTrack Backend API (Python FastAPI)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AM-973/fintrack-fe.git
   cd fintrack-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   # Create .env file
   touch .env
   ```
   
   Add the following variables:
   ```env
   VITE_BACK_END_SERVER_URL=http://localhost:8000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

🎉 **Application running at** `http://localhost:5173`

## 🎨 Design System

### 🎭 Color Palette
```css
/* Financial Theme Colors */
--color-primary: #10b981;         /* Emerald Green */
--color-primary-light: #34d399;   /* Light Emerald */
--color-primary-dark: #059669;    /* Dark Emerald */
--color-secondary: #6366f1;       /* Indigo Accent */
--color-accent: #f59e0b;          /* Amber Highlight */
--color-success: #10b981;         /* Success Green */
--color-warning: #f59e0b;         /* Warning Amber */
--color-error: #ef4444;           /* Error Red */
```

### 📏 Typography Scale
```css
/* Font Sizes */
--font-size-xs: 0.75rem;          /* 12px */
--font-size-sm: 0.875rem;         /* 14px */
--font-size-base: 1rem;           /* 16px */
--font-size-lg: 1.125rem;         /* 18px */
--font-size-xl: 1.25rem;          /* 20px */
--font-size-2xl: 1.5rem;          /* 24px */
--font-size-3xl: 1.875rem;        /* 30px */
--font-size-4xl: 2.25rem;         /* 36px */
--font-size-5xl: 3rem;            /* 48px */
```

### 🎪 Component Library
- **Cards**: Project and category cards with hover effects
- **Forms**: Styled inputs, selects, and validation states
- **Buttons**: Primary, secondary, and ghost button variants
- **Navigation**: Fixed header with responsive menu
- **Charts**: Interactive pie charts for expense visualization
- **Modals**: Loading states and confirmation dialogs

## 🏗 Project Structure

```
fintrack-frontend/
├── 📁 public/                     # Static assets
│   ├── 🖼️ vite.svg               # Favicon
│   └── 📁 assets/                 # Public assets
│       └── 🔗 githubicon.svg      # GitHub icon
├── 📁 src/                        # Source code
│   ├── 📁 components/             # Reusable components
│   │   ├── 🧮 Calculation/        # Financial calculations
│   │   ├── 📊 CategoryDetails/    # Category management
│   │   ├── 📝 CategoryForm/       # Add/edit categories
│   │   ├── 📈 Chart/              # Data visualization
│   │   ├── 📋 Dashboard/          # Main dashboard
│   │   ├── 💳 ExpenseForm/        # Expense tracking
│   │   ├── 🦶 Footer/             # Site footer
│   │   ├── 🏠 Landing/            # Homepage
│   │   ├── ⏳ Loading/            # Loading states
│   │   ├── 🧭 NavBar/             # Navigation
│   │   ├── 💼 ProjectDetails/     # Project overview
│   │   ├── 📝 ProjectForm/        # Add/edit projects
│   │   ├── 📋 ProjectList/        # Project gallery
│   │   ├── 🔐 SignIn/             # Authentication
│   │   └── 📝 SignUp/             # User registration
│   ├── 📁 services/               # API services
│   │   ├── 🔐 authService.js      # Authentication API
│   │   ├── 📊 categoryService.js  # Category operations
│   │   ├── 💳 expenseService.js   # Expense operations
│   │   └── 💼 projectService.js   # Project operations
│   ├── 📁 styles/                 # Global styles
│   │   ├── 🎭 tokens.css          # Design tokens
│   │   └── 🌐 global.css          # Global styles
│   ├── ⚛️ App.jsx                 # Main application
│   ├── 🚀 main.jsx                # Application entry
│   └── 🎨 index.css               # Base styles
├── 📦 package.json                # Dependencies
├── ⚡ vite.config.js              # Vite configuration
└── 📝 README.md                   # Project documentation
```


## 🔧 API Integration

### Backend Services
- **Authentication**: JWT-based user authentication
- **Projects**: CRUD operations for financial projects
- **Categories**: Expense category management
- **Expenses**: Detailed expense tracking
- **Analytics**: Financial calculations and reporting

### Service Architecture
```javascript
// Example API call structure
const projectService = {
  index: () => GET /api/projects,
  show: (id) => GET /api/projects/:id,
  create: (data) => POST /api/projects,
  update: (data, id) => PUT /api/projects/:id,
  delete: (id) => DELETE /api/projects/:id
}
```

---

<div align="center">

### 💰 Built for Financial Freedom

**[📊 Frontend Repo](https://github.com/AM-973/fintract-fe)** • **[⚡ Backend Repo](https://github.com/AM-973/fintrack-be)** • **[🌟 Star this repo](https://github.com/AM-973/fintrack-fe)** 

Made By the fintrack team | © 2025 FinTrack  

</div>

