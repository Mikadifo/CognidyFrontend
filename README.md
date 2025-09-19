# Frontend Project Overview

![Project Banner](https://github.com/user-attachments/assets/9754d095-acc8-491f-a201-cc9e0286c043)

This project is the **frontend** built with **Next.js**.  
It provides the UI for the study, learning, and progress features of our application.

---

## 🛠 Tech Stack

- **Frontend Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** React context
- **API Requests:** Fetch API

---

## 🌐 Available Routes

| Route                         | Description           |
| ----------------------------- | --------------------- |
| `/`                           | Landing / Home page   |
| `/dashboard/study`            | Study section page    |
| `/dashboard/study/flashcard`  | Flashcard page        |
| `/dashboard/learning`         | Learning section page |
| `/dashboard/learning/puzzles` | Puzzles page          |
| `/dashboard/progress`         | Progress section page |
| `/dashboard/progress/roadmap` | Roadmap page          |
| `/dashboard/notes`            | Notes section page    |
| `/dashboard/settings`         | User settings page    |
| `/login`                      | Login screen          |
| `/signup`                     | Sign up screen        |

---

## ⚙️ Environment Setup

### 1. Clone the repository

```bash
git clone https://github.com/Mikadifo/CognidyFrontend.git
cd CognidyFrontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env.local` file at the root of the project. Example:

```ini
NEXT_PUBLIC_API_URL=http://localhost:5000
```

_(Ask a team member for the correct API URL and any secret keys.)_

---

## ▶️ Running the Project

```bash
# Run development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  
The page will reload if you make edits.

### 📦 Build & Start for Production

```bash
# Build the project
npm run build
# or
yarn build

# Start the production server
npm start
# or
yarn start
```

---

## 🌱 Development Workflow

- Each task should be developed in a **new branch** based off the `dev` branch using naming conventions:

  - Features → `feature/<name>`  
    Example: `feature/flashcard-ui`

  - Bug fixes → `fix/<name>`  
    Example: `fix/login-validation`

- Once a task is completed, create a **Pull Request (PR)**.
  - The rest of the team will **test it before merging** into `main`.

---

## ✅ Contribution Guidelines

1. Always create a **new branch** for each task.
2. Follow the branch naming convention (`feature/*`, `fix/*`).
3. Push your changes and create a **Pull Request**.
4. Wait for teammates to test your PR before merging.
5. Keep commits **clear and descriptive**.
6. Keep `.env.local` and sensitive files out of version control.

---

👥 _Happy coding! Keep branches small and PRs clear for easier review._
