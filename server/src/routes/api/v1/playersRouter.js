import express from "express";
import objection from "objection";
import { Player } from "../../../models/index.js";
import RapidApi from "../../../apiClient/RapidApi.js";

const playersRouter = new express.Router();

playersRouter.get("/", async (req, res) => {
    const players = req.query.players
    try {
      const rapidApiResponse = await RapidApi.getPlayers(players)
      const playersData = JSON.parse(rapidApiResponse)
      return res
        .set({ "Content-Type": "application/json" })
        .status(200)
        .json(playersData)
    } catch (error) {
      return res.status(500).json({ errors: error });
    }
  });

playersRouter.get("/:id", async (req, res) => {
  try {
    const player = await Player.query().findById(req.params.id);
    return res.status(200).json({ player: player });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default playersRouter;
