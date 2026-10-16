import { ObjectId } from "mongodb";

export const ALLOWED_CATEGORIES = [
  "Renovation",
  "Building Plan & Design",
  "Building Approval Plans",
  "Elevation Design",
  "FMB Marking",
  "Construction Survey",
  "Layout Marking",
  "Construction Execution",
  "General",
] as const;

export type CategoryName = (typeof ALLOWED_CATEGORIES)[number];

export interface ProductDocument {
  _id?: ObjectId;
  id: string;
  name: string;
  slug: string;
  brand?: string;
  brandLogo?: string;
  category: CategoryName | string;
  categoryId: string;
  shortDescription: string;
  description: string;
  image: string;
  imageAlt?: string;
  gallery?: string[];
  specifications?: Record<string, string>;
  isActive: boolean;
  isPopular?: boolean;
  isPlaceholder?: boolean;
  verificationNote?: string;
  createdAt: Date;
  updatedAt: Date;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function categoryToSlug(category: string): string {
  return slugify(category);
}
