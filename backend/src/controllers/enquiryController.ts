import type { Request, Response } from "express";
import { getDatabase } from "../db/mongo.js";

const SERVICES = [
  "Renovation",
  "Building Plan & Design",
  "Building Approval Plans",
  "Elevation Design",
  "FMB Marking",
  "Construction Survey",
  "Layout Marking",
  "Construction Execution",
  "General Enquiry",
] as const;

type EnquiryBody = {
  fullName?: string;
  phone?: string;
  email?: string;
  serviceRequired?: string;
  projectLocation?: string;
  message?: string;
};

function clean(value: unknown, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

export async function createEnquiry(request: Request, response: Response): Promise<void> {
  const body = request.body as EnquiryBody;
  const fullName = clean(body.fullName, 120);
  const phone = clean(body.phone, 30);
  const email = clean(body.email, 160);
  const serviceRequired = clean(body.serviceRequired, 80);
  const projectLocation = clean(body.projectLocation, 160);
  const message = clean(body.message, 2000);
  const phoneDigits = phone.replace(/[^0-9]/g, "");

  if (fullName.length < 2) {
    response.status(400).json({ error: "Please enter your full name." });
    return;
  }
  if (phoneDigits.length < 10) {
    response.status(400).json({ error: "Please enter a valid 10-digit mobile number." });
    return;
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    response.status(400).json({ error: "Please enter a valid email address." });
    return;
  }
  if (!SERVICES.includes(serviceRequired as (typeof SERVICES)[number])) {
    response.status(400).json({ error: "Please choose a service." });
    return;
  }
  if (!projectLocation) {
    response.status(400).json({ error: "Please provide the project location." });
    return;
  }
  if (message.length < 10) {
    response.status(400).json({ error: "Please add a few details about the requirement." });
    return;
  }

  const enquiry = {
    fullName,
    phone,
    email,
    serviceRequired,
    projectLocation,
    message,
    createdAt: new Date(),
  };

  const result = await getDatabase().collection("enquiries").insertOne(enquiry);
  response.status(201).json({ id: result.insertedId, message: "Enquiry received." });
}
