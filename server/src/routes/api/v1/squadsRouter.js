import express from "express";
import objection from "objection"
import { ValidationError } from "objection";
import cleanUserInput from "../../../services/cleanUserInput.js";
import { Squad } from "../../../models/index.js";
import squadAssignmentsRouter from "./squadAssignmentsRouter.js";
import uploadImage from "../../../services/UploadImage.js";
import SquadSerializer from "../../../serializers/SquadSerializer.js";


const squadsRouter = new express.Router({ mergeParams: true });

squadsRouter.use("/:squadId/positions", squadAssignmentsRouter);

squadsRouter.get("/", async (req, res) => {
  try {
    const squads = await Squad.query();
    const serializedSquads = squads.map(squad => SquadSerializer.getSummary(squad))
    return res.status(200).json({ squads: serializedSquads });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

squadsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const squad = await Squad.query().findById(id);
    const serializedSquad = await SquadSerializer.getSquadSummaryWithAssignments(squad)
    return res.status(200).json({ squad: serializedSquad });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

squadsRouter.post("/", uploadImage.single("image"), async (req, res) => {
  const { name, positions } = cleanUserInput(req.body);
  try {
    const newSquad = await Squad.query().insertAndFetch({
      name,
      positions,
      image: req.file.location,
    });
    return res.status(201).json({ squad: newSquad });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.date });
    }
    return res.status(500).json({ errors: error });
  }
});

export default squadsRouter;
