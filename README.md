# 📅 Daily Routine Tracker

A beautiful and interactive web application for tracking your daily habits and routines. Built with React and featuring stunning animations, customizable habit tracking, progress visualization, and PDF export capabilities.

**🔗 [Live Demo](https://akashprofessionalcoder.github.io/routine_tracker_template_creator/)** | **💻 [GitHub Repository](https://github.com/AkashProfessionalCoder/routine_tracker_template_creator)**

![Version](https://img.shields.io/badge/version-0.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff.svg)

## ✨ Features

### 🎨 Beautiful Landing Page
- **Interactive Particle Background** - Dynamic, animated particle effects powered by HTML5 Canvas
- **Parallax Effects** - Smooth scrolling animations with gradient blobs
- **Modern UI Design** - Glassmorphism effects and responsive design
- **Feature Showcase** - Highlighting all key capabilities

### 📊 Monthly Habit Tracking
- **Table View** - Track up to 17+ default habits across entire months
- **Interactive Checkboxes** - Click to toggle completion status for any day
- **Visual Feedback** - Color-coded checkmarks with smooth animations
- **Sticky Headers** - Routine items stay visible while scrolling horizontally

### 🎯 Custom Habits Management
- **Add Custom Items** - Create unlimited personalized routine items
- **Drag & Drop Reordering** - Organize habits using @dnd-kit/sortable
- **Edit & Delete** - Full CRUD operations for habit management
- **Persistent Storage** - All data saved to localStorage

### 📈 Progress Visualization
- **Interactive Charts** - Beautiful graphs powered by Recharts
- **Daily Statistics** - View completion rates across the month
- **Visual Analytics** - Track your consistency and progress

### 📄 PDF Export
- **One-Click Export** - Generate professional PDF reports
- **Monthly Reports** - Export tracker and graphs together
- **High Quality** - Powered by jsPDF and html2canvas

### 👤 Profile Section
- **User Information** - Add name, age, and other details
- **Month-Specific** - Different profiles for each month

## 🚀 Tech Stack

### Core
- **React 19.2.0** - Latest React with modern features
- **Vite 7.2.4** - Lightning-fast build tool and dev server
- **React Router DOM 7.9.6** - Client-side routing

### UI & Styling
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Lucide React 0.554.0** - Beautiful icon library
- **Custom Animations** - Keyframe animations and transitions

### Functionality
- **@dnd-kit** - Drag and drop functionality
  - `@dnd-kit/core` 6.3.1
  - `@dnd-kit/sortable` 10.0.0
  - `@dnd-kit/utilities` 3.2.2
- **date-fns 4.1.0** - Modern date utility library
- **Recharts 3.5.0** - Composable charting library

### Export & Rendering
- **jsPDF 3.0.4** - PDF generation
- **html2canvas 1.4.1** - HTML to canvas rendering
- **html-to-image 1.11.13** - DOM to image conversion

### Development
- **ESLint** - Code linting and quality
- **PostCSS & Autoprefixer** - CSS processing
- **gh-pages** - GitHub Pages deployment

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd daily-routine-tracker
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 🎮 Usage

### Getting Started
1. Visit the landing page and click **"Get Started"**
2. You'll be taken to the monthly tracker view

### Adding Profile Information
- Click the profile section at the top
- Enter your name, age, and other details
- Information is saved automatically

### Tracking Habits
- Click any checkbox to mark a habit as complete for that day
- Green checkmarks indicate completed items
- Click again to unmark

### Managing Custom Habits
1. Click the **Settings** icon in the navigation
2. Add new habits using the input field
3. Drag and drop to reorder habits
4. Edit or delete existing habits

### Viewing Progress
- Scroll down to see the progress graph
- View daily completion statistics
- Analyze your consistency over time

### Exporting Reports
- Click the **Export PDF** button in the navigation
- Your monthly report will be generated and downloaded
- Includes both the tracker table and progress graph

## 📁 Project Structure

```
daily-routine-tracker/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── LandingPage.jsx        # Home page with animations
│   │   ├── Layout.jsx             # Main layout wrapper
│   │   ├── MonthView.jsx          # Monthly tracker table
│   │   ├── ParticleBackground.jsx # Canvas particle animation
│   │   ├── ProfileSection.jsx     # User profile component
│   │   ├── ProgressGraph.jsx      # Charts and statistics
│   │   └── SettingsPage.jsx       # Habit management
│   ├── hooks/
│   │   └── useRoutineData.js      # Custom hook for data management
│   ├── utils/
│   │   └── pdfExport.js           # PDF export functionality
│   ├── App.jsx          # Main app component with routing
│   ├── App.css          # App-specific styles
│   ├── index.css        # Global styles
│   └── main.jsx         # React entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── eslint.config.js     # ESLint configuration
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 🌐 Deployment

This project is configured for GitHub Pages deployment:

```bash
npm run deploy
```

The app will be deployed to: `https://akashprocoder.github.io/routine_tracker_template_creator`

## 💾 Data Storage

All data is stored in the browser's localStorage:
- Routine items (default and custom)
- Monthly tracking data
- Profile information per month

## 🎨 Key Features Implementation

### Particle Background
Uses HTML5 Canvas API to render animated particles with:
- Mouse interaction (particles attracted to cursor)
- Responsive sizing
- Performance optimization with RequestAnimationFrame

### Drag & Drop
Implements @dnd-kit for smooth drag-and-drop:
- Touch-friendly
- Keyboard accessible
- Smooth animations

### PDF Export
Multi-step export process:
1. Captures DOM elements as images using html2canvas
2. Converts to PDF using jsPDF
3. Combines multiple sections into one report

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ using Antigravity AI

---

**Development Time:** ~2.5 hours  
**Default Habits:** 17+  
**Custom Habits:** Unlimited
