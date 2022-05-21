import express from "express";
import { ValidationError } from "objection";
import cleanUserInput from "../../../services/cleanUserInput.js";
import { Squad } from "../../../models/index.js";
import SquadSerializer from "../../../serializers/SquadSerializer.js";
import squadPositionsRouter from "./squadPositionsRouter.js";

const squadsRouter = new express.Router();

squadsRouter.use("/:squadId/positions", squadPositionsRouter);

squadsRouter.get("/", async (req, res) => {
  try {
    const squads = await Squad.query();
    const serializedSquads = await Promise.all(
      squads.map(async (squad) => await SquadSerializer.getSummary(squad))
    );
    return res.status(200).json({ squads: serializedSquads });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

squadsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const squad = await Squad.query().findById(id);
    const serializedSquad = await SquadSerializer.getSummary(squad);
    return res.status(200).json({ squad: serializedSquad });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

squadsRouter.post("/", async (req, res) => {
  const { name, positions } = cleanUserInput(req.body);
  try {
    const newSquad = await Squad.query().insertAndFetch({ name, positions });
    return res.status(201).json({ squad: newSquad });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.date });
    }
    return res.status(500).json({ errors: error });
  }
});

export default squadsRouter;
