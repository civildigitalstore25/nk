import { app } from "./app.js";
import { config } from "./config.js";
import { closeDatabase, connectToDatabase } from "./db/mongo.js";

async function start(): Promise<void> {
  try {
    await connectToDatabase();
    console.log(`[Database] Connected to MongoDB: ${config.mongodbDb}`);
  } catch (error) {
    console.warn("[Database] MongoDB is not connected yet. Check MONGODB_URI in .env.local.", error);
  }

  const server = app.listen(config.port, () => {
    console.log(`[Server] NK Constructions API listening on http://localhost:${config.port}`);
  });

  const shutdown = async (signal: string): Promise<void> => {
    console.log(`Received ${signal}; shutting down gracefully`);
    server.close(async (error) => {
      if (error) {
        console.error("HTTP server shutdown error:", error);
        process.exitCode = 1;
      }
      await closeDatabase();
    });
  };

  process.once("SIGINT", () => void shutdown("SIGINT"));
  process.once("SIGTERM", () => void shutdown("SIGTERM"));
}

start().catch((error: unknown) => {
  console.error("Fatal startup error:", error);
  process.exitCode = 1;
});
