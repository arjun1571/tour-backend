import { Server } from "http";

import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("Connected to DB");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server Running on Port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();
  await seedSuperAdmin();
})();

// unhandled rejection error
process.on("unhandledRejection", () => {
  console.log("Unhandled Rejection Detected server off");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// uncaught rejection error
process.on("uncaughtException", () => {
  console.log("Uncaught Exception Detected server off");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
// signal termination sigterm
process.on("SIGTERM", () => {
  console.log("SIGTERM Signal Detected server off");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

/*
unhandled rejection error
uncaught rejection error
signal termination sigterm 
*/
