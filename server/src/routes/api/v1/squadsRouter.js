import express from "express";
import objection from "objection";
import { ValidationError } from "objection";
import cleanUserInput from "../../../services/cleanUserInput.js";
import { Squad } from "../../../models/index.js";
import uploadImage from "../../../services/UploadImage.js";
import SquadSerializer from "../../../serializers/SquadSerializer.js";
import squadAssignmentsRouter from "./squadAssignmentsRouter.js";

const squadsRouter = new express.Router({ mergeParams: true });

squadsRouter.use("/:squadId/assignments", squadAssignmentsRouter)

squadsRouter.get("/", async (req, res) => {
  try {
    const squads = await Squad.query();
    const serializedSquads = await Promise.all(
      squads.map(async squad => await SquadSerializer.getSummary(squad))
    );
    return res.status(200).json({ squads: serializedSquads });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

squadsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const squad = await Squad.query().findById(id).throwIfNotFound();
    const serializedSquad = await SquadSerializer.getDetails(squad);
    console.log(serializedSquad)
    return res.status(200).json({ squad: serializedSquad });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error });
  }
});

squadsRouter.post("/", uploadImage.single("image"), async (req, res) => {
  const cleanedFormInput = cleanUserInput(req.body);
  const { name } = cleanedFormInput;
  try {
    const newSquad = await Squad.query().insertAndFetch({
      name,
      image: req.file.location,
    });
    return res.status(201).json({ squad: newSquad });
  } catch (error) {
    console.log(error);
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.date });
    }
    return res.status(500).json({ errors: error });
  }
});

export default squadsRouter;
