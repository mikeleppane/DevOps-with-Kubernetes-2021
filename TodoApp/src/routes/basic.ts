import express from "express";

const basicRouter = express.Router();

basicRouter.get("/", (_req, res) => {
  return res.status(200).send("<h1>Hi There!</h1>");
});

export default basicRouter;
