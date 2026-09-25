import { env } from "./config/env.js";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(env.port, () => {
    console.log(
      `Server running on http://localhost:${env.port}`
    );
  });
};

startServer();