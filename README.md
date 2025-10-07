# Frontend Project Overview

![Project Banner](https://github.com/user-attachments/assets/9754d095-acc8-491f-a201-cc9e0286c043)

This project is the **frontend** built with **Next.js**.  
It provides the UI for the study, learning, and progress features of our application.

---

## Project Overview

Cognidy is a student helper app that helps users create, organize, and learn notes. Promotes critical thinking so a user can actually learn and retain what they are studying.

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

In case you get an error while installing, try the following:

```
npm install --legacy-peer-deps
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
- The rest of the team will **test it before merging** into `dev`.
- Once we have a solid version working we might consider updating `master` by a PR from `dev`

> [!IMPORTANT]
> Do not push or create PRs to master, since it will trigger a Vercel deploy and might break the current working version.

---

## UI Theme

Our project uses a custom UI theme with Tailwind CSS v4, which includes specific colors and fonts to maintain consistency throughout the application. Below is an overview of the main theme settings and examples on how to use them.

## Colors

We have defined the following main colors in Tailwind:

- brand: #1e4dd8
- cyan: #0086eb
- white: #f2f3f9
- dark: #020712
- red: #c60024
- green: #00af7f
- yellow: #ffbf52

### Opacity Variants

- brand-84: rgba(30, 77, 216, 0.84)
- dark-08: rgba(2, 7, 18, 0.08)
- dark-16: rgba(2, 7, 18, 0.16)
- dark-88: rgba(2, 7, 18, 0.88)

### Example Usage in Tailwind

```html
<button class="bg-brand text-white">Primary Button</button>
<div class="bg-red text-white p-4">Error Alert</div>
<div class="bg-brand-84 p-2">Overlay Example</div>
```

> If you need a specific opacity variant that is not included in the `global.css` file, then add it there.

## Fonts

We are using two primary fonts in the project:

- Poppins (mainly for headings)
- Nunito (mainly for body text)

### Example Usage in Tailwind

```html
<h1 class="font-poppins text-2xl">Heading Example</h1>
<p class="font-nunito text-base">Body text example</p>
```

## Storybook

We are using **Storybook** to document and maintain reusable components. Storybook allows us to visually test components in isolation and provides an interactive way to explore the UI elements.

This ensures that all components adhere to the UI theme and can be reused consistently across the project.

To run the storybook run:

```bash
npm run storybook
```

> If you add a new reusable component, make sure to add that to the story book

### Custom Gradients

Theme colors are already in tailwind, so you can use them to create our two custom gradients.

- Gradient 1 (simplified to 3 stops/colors): `bg-linear-to-br from-brand via-cyan to-green`
- Gradient 2 (blue to black): `bg-linear-to-br from-brand to-dark`

## ✅ Contribution Guidelines

1. Always create a **new branch** for each task.
2. Follow the branch naming convention (`feature/*`, `fix/*`).
3. Push your changes and create a **Pull Request**.
4. Wait for teammates to test your PR before merging.
5. Keep commits **clear and descriptive**.
6. Keep `.env.local` and sensitive files out of version control.

---

👥 _Happy coding! Keep branches small and PRs clear for easier review._
