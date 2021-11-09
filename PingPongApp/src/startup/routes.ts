import express = require("express");
import cors = require("cors");
import { morganMiddleware } from "../middleware/httpLogging";
import counterRouter from "../routes/counter";

export const setupRoutes = (app: express.Express) => {
  app.use(cors());
  app.use(express.json());
  app.use(morganMiddleware);
  app.use("/pingpong", counterRouter);
};
