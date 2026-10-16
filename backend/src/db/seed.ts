import bcrypt from "bcryptjs";
import { getDatabase } from "./mongo.js";
import { config } from "../config.js";
import { User } from "../models/user.js";
import { ProductDocument } from "../models/product.js";

export async function seedDatabase(): Promise<void> {
  const db = getDatabase();

  const usersCollection = db.collection<User>("users");
  await usersCollection.createIndex({ email: 1 }, { unique: true });

  const existingAdmin = await usersCollection.findOne({
    email: config.superadminEmail.toLowerCase(),
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(config.superadminPassword, 10);
    await usersCollection.insertOne({
      email: config.superadminEmail.toLowerCase(),
      passwordHash,
      role: "superadmin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(`[Seed] Superadmin account initialized (${config.superadminEmail})`);
  }

  const productsCollection = db.collection<ProductDocument>("products");
  await productsCollection.createIndex({ slug: 1 }, { unique: true });
  await productsCollection.createIndex({ id: 1 }, { unique: true });
}
