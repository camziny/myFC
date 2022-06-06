import express from "express";
import cleanUserInput from "../../../services/cleanUserInput.js";
import { ValidationError } from "objection";
import { Assignment } from "../../../models/index.js";

const squadAssignmentsRouter = new express.Router({ mergeParams: true });

squadAssignmentsRouter.post("/", async (req, res) => {
  const { position } = cleanUserInput(req.body);
  const { playerId, squadId } = req.query.params;
  const userId = req.user.id;
  try {
    const newAssignment = await Assignment.query().insertAndFetch({ position, playerId, squadId });
    return res.status(201).json({ squad: newAssignment });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default squadAssignmentsRouter;
