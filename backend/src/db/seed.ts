import bcrypt from "bcryptjs";
import { getDatabase } from "./mongo.js";
import { config } from "../config.js";
import { User } from "../models/user.js";
import { ProductDocument } from "../models/product.js";

/**
 * Idempotent admin seed from SUPERADMIN_EMAIL / SUPERADMIN_PASSWORD
 * (loaded from .env.local locally, or Vercel env vars in production).
 * Creates the superadmin only when that email is missing.
 */
export async function seedDatabase(): Promise<void> {
  const db = getDatabase();

  const usersCollection = db.collection<User>("users");
  await usersCollection.createIndex({ email: 1 }, { unique: true });

  const email = config.superadminEmail.trim().toLowerCase();
  const password = config.superadminPassword;

  if (!email || !password) {
    console.warn(
      "[Seed] SUPERADMIN_EMAIL or SUPERADMIN_PASSWORD is missing; skipping admin seed."
    );
  } else {
    const existingAdmin = await usersCollection.findOne({ email });

    if (existingAdmin) {
      console.log(`[Seed] Superadmin already exists (${email}); skipping.`);
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      await usersCollection.insertOne({
        email,
        passwordHash,
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`[Seed] Superadmin created from env (${email})`);
    }
  }

  const productsCollection = db.collection<ProductDocument>("products");
  await productsCollection.createIndex({ slug: 1 }, { unique: true });
  await productsCollection.createIndex({ id: 1 }, { unique: true });
}
