# Academia Platform (LMS)

A professional academic platform built with Next.js and Node.js.

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL (ensure it is running)

### Installation

1.  **Clone the repository** (if not already done).
2.  **Install dependencies**:
    ```bash
    # Backend
    cd server
    npm install

    # Frontend
    cd ../client
    npm install
    ```
3.  **Setup Database**:
    -   Ensure PostgreSQL is running.
    -   Update `DATABASE_URL` in `server/.env`.
    -   Run migrations:
        ```bash
        cd server
        npx prisma migrate dev --name init
        ```

### Running the Application

You need to run the backend and frontend in separate terminals.

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```
Server runs on [http://localhost:5000](http://localhost:5000).

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```
Frontend runs on [http://localhost:3000](http://localhost:3000).

## Project Structure

-   `/client`: Next.js Frontend
-   `/server`: Express Backend
