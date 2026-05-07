# Restro - Smart Restaurant Management & Ordering System

Restro is a comprehensive, full-stack SaaS platform designed to modernize restaurant operations. It features a powerful admin dashboard for restaurant owners and a seamless, real-time ordering experience for customers via QR codes.

## 🚀 Overview

The project is divided into three main components:
1.  **Admin Dashboard (`/client`)**: A robust Next.js application for restaurant owners to manage menus, categories, orders, and view analytics.
2.  **Customer App (`/restaurant`)**: A mobile-first Next.js application where customers can scan QR codes, browse menus, and place orders in real-time.
3.  **Backend API (`/server`)**: A TypeScript-powered Express server with Prisma ORM, handling authentication, data management, and real-time WebSocket notifications.

---

## 🛠️ Technology Stack

### Frontend (Admin & Customer)
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & RTK Query
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Real-time**: [Socket.io-client](https://socket.io/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Communication**: [Socket.io](https://socket.io/) & [Web Push Notifications](https://web-push-libs.org/)
- **Cloud Storage**: [Cloudinary](https://cloudinary.com/) (for images)

---

## 📦 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (Recommended)
- OR Node.js v18+ and PostgreSQL installed locally.

### Installation via Docker (Recommended)

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd pro
   ```

2. **Set up Environment Variables**:
   Ensure each subdirectory (`/client`, `/server`, `/restaurant`) has its own `.env` file based on the provided configuration.

3. **Start the containers**:
   ```bash
   docker compose up -d
   ```
   This will spin up:
   - PostgreSQL (Port 5432)
   - Backend Server (Port 8000)
   - Admin Dashboard (Port 3001)
   - Customer App (Port 3000)

### Manual Setup (Local Development)

#### Backend
```bash
cd server
npm install
npx prisma generate
npm run dev
```

#### Admin Dashboard
```bash
cd client
npm install
npm run dev
```

#### Customer App
```bash
cd restaurant
npm install
npm run dev
```

---

## ✨ Features

- **Dynamic Menu Management**: Create, update, and delete categories and products.
- **QR Code Generation**: Branded QR codes for each restaurant to enable instant ordering.
- **Real-time Order Tracking**: Instant notifications for new orders via WebSockets and Web Push.
- **Analytics Dashboard**: Comprehensive charts and stats for sales and order performance.
- **Mobile-Responsive Design**: Optimized for both desktop management and mobile ordering.
- **Secure Authentication**: Role-based access control for restaurant owners and staff.

---

## 📂 Directory Structure

```text
Restro/
├── client/          # Next.js Admin Dashboard
├── restaurant/      # Next.js Customer Ordering App
├── server/          # Express API & Prisma Schema
└── docker-compose.yml # Container orchestration
```

---

## 📄 License
This project is licensed under the ISC License.
