# 🌐 Social Media Platform

## 🚀 Introduction
Welcome to **Social Media Platform**, where users can share posts, connect with friends, and engage in meaningful conversations! Built using **React**, **TypeScript**, and **Vite**, this modern social media experience offers seamless interaction and a sleek interface.

## ✨ Features
- **User Profiles** 🧑‍💻: Personalized accounts with profile pictures and bios.
- **Post Creation** 📝: Share thoughts, images, and videos.
- **Like & Comment System** ❤️💬: Engage with content effortlessly.
- **Optimized Performance** ⚡: Powered by Vite for fast and efficient rendering.

## 🛠️ Technologies Used
- **React** ⚛️: For dynamic UI components.
- **TypeScript** 🛠️: Ensuring type safety and scalability.
- **Vite** 🚀: Lightning-fast build and development.
- **Tailwind CSS** 🎨: For clean and responsive design.
- **JSON-Server** 🔗: Backend support for authentication and data storage.

## 🏗️ Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/SocialMediaPlatform.git
cd SocialMediaPlatform
npm install
```

## 📸 Screenshots
<img src="Screenshots/Screenshot%202025-05-01%20163352.png" />
<img src="Screenshots/Screenshot%202025-05-01%20164531.png" />

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

