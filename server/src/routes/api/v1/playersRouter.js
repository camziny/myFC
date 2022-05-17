import express from "express";
import objection from "objection";
import { Player } from "../../../models";
import PlayerSerializer from "../../../serializers/PlayerSerializer";

const playersRouter = new express.Router();

playersRouter.get("/", async (req, res) => {
  try {
    const players = await Player.query();
    const serializedPlayers = players.map(player => PlayerSerializer.getSummary(player))
    return res.status(200).json({ players: serializedPlayers });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

playersRouter.get("/:id", async (req, res) => {
  try {
    const player = await Player.query().findById(req.params.id);
    const serializedPlayer = await PlayerSerializer.getSummary(player);
    return res.status(200).json({ player: serializedPlayer });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default playersRouter;
