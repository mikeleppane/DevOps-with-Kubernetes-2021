import express from "express";
import { getImage } from "../services/imageFetcher";

const indexRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
indexRouter.get("/", async (_req, res) => {
  await getImage();
  return res.status(200).send("<h1>Hi There!</h1>");
});

export default indexRouter;
