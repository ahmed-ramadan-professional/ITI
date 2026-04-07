# React ToDo App

> A modern, fully-featured task management app with authentication, built using **React + Vite + Tailwind CSS**

<p >
  <a href="https://github.com/ahmed-ramadan-professional/ITI/tree/main/React/Lab-3">
    <img src="https://img.shields.io/badge/Repo-GitHub-181717?logo=github" />
  </a>
  <a href="https://ahmed-ramadan-professional.github.io/ITI/React/Lab-3/dist/">
    <img src="https://img.shields.io/badge/Live-Demo-brightgreen?logo=vercel" />
  </a>
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" />
  <img src="https://img.shields.io/badge/Vite-fast-purple?logo=vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-styling-38B2AC?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Formik-forms-orange" />
  <img src="https://img.shields.io/badge/Yup-validation-yellow" />
</p>

---

## Preview

<p>
  <img src="./image.png" width="80%" />
  <img src="./image-2.png" width="80%" />
  <img src="./image-3.png" width="80%" />
  <img src="./image-4.png" width="80%" />
  <img src="./image-5.png" width="80%" />
</p>

---

## Features

### Authentication

- Login & Signup system
- Form validation with **Formik + Yup**
- Error handling with inline messages
- Redirect after login/signup
- Protected & guest routes
- Persistent sessions using `localStorage`

---

### Task Management

- Add / delete tasks
- Mark tasks as completed
- Filter tasks (All / Completed)
- View detailed task page
- Tasks are **user-specific** (isolated per account)

---

### UI & UX

- Modern UI with **Tailwind CSS**
- Glassmorphism design
- Smooth hover animations
- Responsive layout (mobile-first)
- Toast notifications via **React Toastify**

---

### Routing

- React Router v6
- Protected routes:
    - `/`
    - `/profile`
    - `/task/:id`

- Guest-only routes:
    - `/login`
    - `/signup`

- Custom **404 page**

---

## Tech Stack

| Category      | Tech           |
| ------------- | -------------- |
| Frontend      | React + Vite   |
| Styling       | Tailwind CSS   |
| Routing       | React Router   |
| Forms         | Formik         |
| Validation    | Yup            |
| Icons         | Lucide React   |
| Notifications | React Toastify |
| Storage       | localStorage   |

---

## Project Structure

```bash
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── Card.jsx
│   ├── ProtectedRoute.jsx
│   └── GuestRoute.jsx
│
├── routes/
│   ├── Home.jsx
│   ├── Profile.jsx
│   ├── ViewTask.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   └── NotFound.jsx
│
├── App.jsx
└── main.jsx
```

---

## Installation

```bash
git clone https://github.com/ahmed-ramadan-professional/ITI.git
cd ITI/React/Lab-3
npm install
npm run dev
```

---

## Authentication Flow

```mermaid
graph TD
A[User visits app] --> B{Logged in?}
B -- No --> C[Redirect to Login]
B -- Yes --> D[Access Home]

C --> E[Login / Signup]
E --> F[Store user in localStorage]
F --> D

D --> G[User creates tasks]
G --> H[Tasks saved per user]
```

---

## How Tasks Are Stored

Each user has isolated data:

```js
tasks_user@email.com
```

---

## ⚠️ Disclaimer

> This project uses **localStorage-based authentication**.

✔️ Great for learning and demos
❌ Not secure for production

---

## Future Improvements

- 🔐 Real authentication (JWT)
- ☁️ Database (MongoDB / Firebase)
- ✏️ Edit tasks
- 🌓 Dark mode toggle
- 📊 Dashboard analytics
- 👥 Multi-user collaboration

---

## 👨‍💻 Author

**Ahmed Ramadan**
Full Stack Developer

---

## ⭐ Support

If you like this project:

- ⭐ Star the repo
- 🍴 Fork it
- 🧠 Learn from it
