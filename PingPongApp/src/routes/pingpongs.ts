import express from "express";
import { Pingpong } from "../database/models/pingpong";

const pingpongRouter = express.Router();

pingpongRouter.get("/", (_req, res) => {
  Pingpong.findByPk(1)
    .then((pingpong) => {
      if (pingpong) {
        const data = "Ping / Pong: " + pingpong.count + "\n";
        res.status(200).send(data);
      }
    })
    .catch((error) => console.error(error));
});

export default pingpongRouter;
