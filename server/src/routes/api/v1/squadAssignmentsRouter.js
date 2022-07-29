import express from "express";
import cleanUserInput from "../../../services/cleanUserInput.js";
import { ValidationError } from "objection";
import { Assignment } from "../../../models/index.js";
import AssignmentSerializer from "../../../serializers/AssignmentSerializer.js";

const squadAssignmentsRouter = new express.Router({ mergeParams: true });

squadAssignmentsRouter.post("/", async (req, res) => {
  const { name, position, playerId } = cleanUserInput(req.body);
  const { squadId } = req.params;
  const userId = req.user.id;

  try {
    const newAssignment = await Assignment.query().insertAndFetch({
      name,
      position,
      playerId,
      squadId,
      userId,
    });
    const serializedAssignment = await AssignmentSerializer.getSummary(newAssignment);
    return res.status(201).json({ assignment: serializedAssignment });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default squadAssignmentsRouter;
