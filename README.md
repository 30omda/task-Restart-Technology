# 🛠️ Admin Dashboard — Next.js Technical Task

> **Live Demo:** [https://task-restart-technology.vercel.app/](https://task-restart-technology.vercel.app/)  
> **Login Credentials:**  
> 📧 Email: `dev.aert@gmail.com`  
> 🔐 Password: `helloworld`

---

## 📌 Project Description

This project is a **simple admin dashboard** built using **Next.js (App Router)**, **Tailwind CSS**, and **Redux Toolkit**. It demonstrates modern frontend best practices such as:

### 🔐 Authentication & Route Protection

- Implements a **static login system** with email and password validation.
- On successful login, a **mock token** is saved in browser cookies (`js-cookie`).
- Middleware is used to protect routes:
  - If no token is found, users are redirected to the login page.
  - If a logged-in user tries to access `/login`, they’re redirected to `/dashboard`.

### 🧭 Layout & Navigation

- A **responsive sidebar layout** is used for all authenticated pages.
- Sidebar links:
  - `/dashboard`: Shows a welcome message.
  - `/products`: Product listing with CRUD features.
  - `/settings`: An empty placeholder for future expansion.
- Top bar and sidebar components are cleanly separated and reusable (`app-sidebar`, `site-header`, `nav-user`, etc.).

### 🛒 Products CRUD System

- Fetches products from a **mock REST API**:
  [https://62fb62afe4bcaf5351837ac1.mockapi.io/product](https://62fb62afe4bcaf5351837ac1.mockapi.io/product)
- Displays a **products table** with:
  - Image
  - Name
  - Description
  - Category
  - Price
- Supports:
  - `Add` product via modal form (`react-hook-form` + `Yup` + `resolvers`)
  - `Edit` product
  - `Delete` product
- Data is managed via Redux Toolkit and API calls are abstracted through `axiosInstance` & `axiosCroud.js`.

### ⚙️ Tools & Libraries Used

| Feature                     | Library / Tool                          |
|----------------------------|------------------------------------------|
| Framework                  | Next.js (v15 — App Router)              |
| Styling                    | Tailwind CSS v4                         |
| UI Components              | Shadcn UI (Radix primitives)            |
| State Management           | Redux Toolkit + React Redux             |
| Forms                      | React Hook Form + Yup                   |
| HTTP Requests              | Axios                                   |
| Cookies Handling           | js-cookie                               |
| Notifications              | react-hot-toast                |
| Table UI                   | @tanstack/react-table                   |
| Icons                      | lucide-react + @tabler/icons-react      |
| Middleware                 | next middleware.ts                      |

---

## 📁 Project Folder Structure (Simplified)

```bash
src/
├── app/
│   ├── login/                  # Public login page
│   ├── (protected)/            # All routes protected by middleware
│   │   ├── dashboard/          # Admin welcome page
│   │   ├── products/           # Product CRUD page
│   │   ├── product-details/[id]/  # Single product details (optional)
│   │   ├── settings/           # Placeholder settings page
│   │   └── layout.js           # Sidebar layout for all protected routes
│   └── layout.js               # Global layout (theme, fonts, etc.)
│
├── components/
│   ├── Products/               # Product management components
│   └── ui/                     # Shared UI (Sidebar, Header, Navs, etc.)
│
├── hooks/                     # Custom React hooks (e.g. use-mobile)
│
├── lib/                       # Utility functions
│
├── services/                  # Axios config + API methods (CRUD)
│
├── store/                     # Redux store, slices, state logic
│
├── utils/
│   ├── Cookies/               # Token helpers for login/logout
│   └── localStorage/          # Extra storage utilities
│
├── assets/                    # Static files (icons, images)
├── middleware.js              # Auth middleware
├── globals.css                # Tailwind base styles



# Clone the repo
git clone https://github.com/your-username/stask.git && cd stask

# Install dependencies
npm install

# Start development server
npm run dev

# Open your browser
http://localhost:3000
