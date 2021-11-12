import express = require("express");
import cors = require("cors");
import { morganMiddleware } from "../middleware/httpLogging";
import indexRouter from "../routes";
import pingpongRouter from "../routes/pingpongs";

export const setupRoutes = (app: express.Express) => {
  app.use(cors());
  app.use(express.json());
  app.use(morganMiddleware);
  app.use("/pingpong", indexRouter);
  app.use("/pingpongs", pingpongRouter);
};
