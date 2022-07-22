import express from "express";
import { Player } from "../../../models/index.js";
import PlayerSerializer from "../../../serializers/PlayerSerializer.js";

const playersRouter = new express.Router();

playersRouter.get("/", async (req, res) => {
    try {
      const players = await Player.query()
      const serializedPlayers = players.map(player => PlayerSerializer.getSummary(player))
      return res.status(200).json({ players: serializedPlayers })
    } catch (error) {
      return res.status(500).json({ errors: error });
    }
  });

export default playersRouter;
