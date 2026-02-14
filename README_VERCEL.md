# Academia Platform (LMS)

A professional university platform built with **Next.js 14**, **PostgreSQL**, and **Prisma**.

## 🚀 Deployment (Vercel)

This project is optimized for deployment on Vercel.

1.  **Push to GitHub**:
    Initialize this folder as a git repository and push to GitHub.
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/academia-platform.git
    git push -u origin main
    ```

2.  **Import to Vercel**:
    -   Go to [Vercel Dashboard](https://vercel.com/new).
    -   Import your `academia-platform` repository.
    -   **Framework Preset**: Next.js
    -   **Root Directory**: `client` (IMPORTANT: creating a monorepo structure where the root app is in `client`)
    
3.  **Environment Variables**:
    Add the following variables in Vercel settings:
    -   `DATABASE_URL`: Your PostgreSQL connection string (Supabase, Neon, or Vercel Postgres).
    -   `JWT_SECRET`: A random secret string for authentication.

4.  **Deploy**: Click "Deploy".

## 🛠️ Local Development

1.  **Navigate to Client**:
    ```bash
    cd client
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Database Setup**:
    -   Create a `.env` file in `client/` with:
        ```env
        DATABASE_URL="postgresql://user:password@localhost:5432/platform_db"
        JWT_SECRET="supersecret"
        ```
    -   Run migrations:
        ```bash
        npx prisma migrate dev --name init
        ```

4.  **Run Dev Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure

-   `app/api/...`: Next.js Route Handlers (Backend Logic).
-   `app/dashboard/...`: Application Views (Protected).
-   `prisma/`: Database Schema.
-   `lib/`: Shared utilities (Auth, DB connection).
