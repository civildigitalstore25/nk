# NK Constructions backend

TypeScript Node.js API backed by MongoDB. Handles contact enquiries plus
admin CMS for products and blog posts.

## Setup

1. Install dependencies:

   ```powershell
   npm install
   ```

2. Create `.env.local` (only env file used):

   ```
   PORT=4001
   MONGODB_URI=mongodb://127.0.0.1:27017/nk_construction
   MONGODB_DB=nk_construction
   JWT_SECRET=change-me
   SUPERADMIN_EMAIL=superadmin@nkconstructions.com
   SUPERADMIN_PASSWORD=SuperAdmin@123
   FRONTEND_ORIGIN=http://localhost:5173
   NODE_ENV=development
   ```

3. Start MongoDB, then:

   ```powershell
   npm run dev
   ```

API: `http://localhost:4001` — health: `http://localhost:4001/api/health`

Admin login uses the seeded superadmin credentials from `.env.local`.
