# 📝 Task Manager App

A modern, responsive task management application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Redux Toolkit**. Includes API proxying with **SWR + Axios**, optimistic updates, dark mode, filtering, accessibility features, testing, and more.

## 🚀 Live Demo

👉 [View App on Vercel](https://menatasks.vercel.app/)

---

## 📦 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) + [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper)
- **Networking**: [Axios](https://axios-http.com/) + [SWR](https://swr.vercel.app/)
- **Testing**: [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/en-US)

---

## 📁 Folder Structure

```
/app                # App router-based routing
/components         # Reusable UI components
/services           # Axios instance & API logic
/store              # Redux slices, store setup

```

---

## 🛠️ Installation

```bash
git clone https://github.com/Olu-Tobi/menatasks.git
cd task-manager
npm install
npm run dev
```

---

## 🛠️ TypeScript Configuration

This project uses a strict and modern TypeScript setup tailored for Next.js (App Router) and React 17+:

````jsonc
// tsconfig.json
{
  "compilerOptions": {
    ...
    "jsx": "react-jsx" // Enables the new JSX transform (React 17+)
  }
}

---

## ✅ Development Timeline

### DAY 1 – Setup & UI Layout

- ✅ Initialized with `create-next-app` using TypeScript
- ✅ Installed: Tailwind CSS, Redux Toolkit, Axios, SWR
- ✅ Configured Tailwind (`tailwind.config.ts`) with dark mode support
- ✅ Set up folder structure
- ✅ Created base layout (header, task board, footer)
- ✅ Built components:
  - `TaskCard.tsx`
  - `TaskList.tsx`
  - `CreateTaskForm.tsx`
  - `FilterControls.tsx`
  - `SearchBar.tsx`
  - `ThemeToggle.tsx`

### DAY 2 – Functionality & Logic

- ✅ Created API routes to proxy `https://jsonplaceholder.typicode.com/todos`
  - `GET /api/tasks`
  - `POST /api/tasks`
  - `PATCH /api/tasks/:id`
  - `DELETE /api/tasks/:id`
- ✅ Integrated SWR for fetching and caching
- ✅ CRUD:
  - Optimistic Create, Update, Delete
  - Real-time filtering and search
- ✅ Redux:
  - `taskSlice` for task state
  - `uiSlice` for theme and filter state
  - Thunks for API actions

### DAY 3 – Polish, Testing & Deployment

- ✅ Performance:
  - `useMemo`, `useCallback` to minimize re-renders
  - Lazy-load task cards using `IntersectionObserver`
- ✅ Accessibility:
  - ARIA attributes
  - Keyboard navigation
- ✅ Testing:
  - Unit test: `TaskCard.test.tsx`
  - Integration: thunk dispatches using mocked Axios with `msw`
- ✅ Bonus Features:
  - Pie chart for task status using Recharts
  - Dark mode persisted in `localStorage`
  - Framer Motion transitions
- ✅ Deployed to Vercel

---

## 🧪 Running Tests

```bash
npm test
````

Uses:

- Jest
- React Testing Library
- MSW for API mocking

---

## ⚙️ Available Scripts

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run start     # Start production server
npm run test      # Run tests
```

---

## 🧠 Design Decisions

- **Next.js App Router** was chosen for modern routing flexibility and future-proofing.
- **SWR + Axios** enables clean data fetching with built-in caching and retry.
- **Redux Toolkit** handles global state, especially for UI state and task list control.
- **Tailwind CSS** provides utility-first responsive design.
- **MSW** enables testable, isolated async logic without depending on external APIs.

---

## 📄 License

MIT License

---

## 🙌 Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- [Tailwind UI](https://tailwindui.com/)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [SWR Docs](https://swr.vercel.app/)
