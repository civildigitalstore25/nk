import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const backendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(backendRoot, ".env.local") });

const portValue = process.env.PORT?.trim() || "4001";
const parsedPort = Number(portValue);
const port = Number.isInteger(parsedPort) && parsedPort >= 1 && parsedPort <= 65535 ? parsedPort : 4001;

export const config = {
  port,
  mongodbUri: process.env.MONGODB_URI?.trim() || "mongodb://127.0.0.1:27017/nk_construction",
  mongodbDb: process.env.MONGODB_DB?.trim() || "nk_construction",
  jwtSecret: process.env.JWT_SECRET?.trim() || "nk_constructions_admin_secret_change_in_production",
  superadminEmail: process.env.SUPERADMIN_EMAIL?.trim() || "superadmin@nkconstructions.com",
  superadminPassword: process.env.SUPERADMIN_PASSWORD?.trim() || "SuperAdmin@123",
  frontendOrigin: process.env.FRONTEND_ORIGIN?.trim() || process.env.FRONTEND_URL?.trim() || "http://localhost:5173",
  nodeEnv: process.env.NODE_ENV?.trim() || "development",
} as const;
