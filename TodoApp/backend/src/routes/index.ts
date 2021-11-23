import express from "express";

const indexRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
indexRouter.get("/", (_req, res) => {
  return res.status(200).send("<h1>Hi There!</h1>");
});

export default indexRouter;
