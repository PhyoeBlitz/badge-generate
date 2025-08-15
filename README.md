# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# 🎯 Hexagon Skill Icons Generator

A React TypeScript application that generates hexagon-shaped skill badges from SkillIcons URLs and downloads them as individual PNG files in a ZIP archive.

## ✨ Features

- **Hexagon Badge Generation**: Creates beautiful hexagon-shaped badges with technology colors
- **PNG Zip Download**: Downloads all badges as individual PNG files in a ZIP archive
- **Technology Colors**: Supports 50+ technologies with authentic brand colors
- **Responsive Design**: Works on desktop and mobile devices
- **TypeScript**: Built with type safety and modern React patterns

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd badge-generate
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📖 Usage

1. **Enter a SkillIcons URL** in the input field (e.g., `https://skillicons.dev/icons?i=ts,react,python,aws`)
2. **Click "Generate Hexagon Badges"** to create the badges
3. **Click "Save All as PNG Zip"** to download all badges as individual PNG files in a ZIP archive

### Example URLs

- Single Icon: `https://skillicons.dev/icons?i=ts`
- Frontend Stack: `https://skillicons.dev/icons?i=js,ts,react,vue`
- Python Stack: `https://skillicons.dev/icons?i=python,django,flask,fastapi`
- DevOps Stack: `https://skillicons.dev/icons?i=aws,docker,kubernetes,jenkins`
- Full Stack: `https://skillicons.dev/icons?i=html,css,js,php,mysql`

## 🛠️ Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **JSZip** - ZIP file creation
- **CSS3** - Styling with hexagon shapes

## 📦 Supported Technologies

The app supports 50+ technologies including:

- **Frontend**: TypeScript, JavaScript, React, Vue, Angular
- **Backend**: Python, Java, PHP, Go, Rust, Node.js
- **Cloud**: AWS, Docker, Kubernetes, Jenkins
- **Databases**: MySQL, PostgreSQL, MongoDB, Redis
- **Tools**: Git, GitHub, GitLab, VS Code, Figma

## 🎨 Features

- **Authentic Colors**: Each technology badge uses official brand colors
- **High Resolution**: 2x scale PNG output for crisp quality
- **Hexagon Shapes**: Perfect hexagon clipping with CSS
- **Hover Effects**: Interactive animations and scaling
- **Mobile Responsive**: Adapts to different screen sizes

## 📄 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
