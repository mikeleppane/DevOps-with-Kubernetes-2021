import express from "express";
import { create } from "apisauce";

const indexRouter = express.Router();

const api = create({
  baseURL: "http://pingpong-service.log-output",
  timeout: 5000,
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
indexRouter.get("/", (_req, res) => {
  res.status(200).send("ok");
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
indexRouter.get("/front-healthz", async (_req, res) => {
  const response = await api.get("/");
  if (response.ok) {
    return res.status(200).send("pingpong app up");
  }
  return res.status(500).json({ error: "cannot access pingpong app" });
});

export default indexRouter;
