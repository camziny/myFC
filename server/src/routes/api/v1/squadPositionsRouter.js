import express from "express";
import cleanUserInput from "../../../services/cleanUserInput.js";
import { ValidationError } from "objection";
import { Position } from "../../../models.index.js";

const squadPositionsRouter = express.Router({ mergeParams: true });

squadPositionsRouter.post("/", async (req, res) => {
  const { name, position } = cleanUserInput(req.body);
  const { squadId } = req.params;
  const userId = req.user.id;
  try {
    const newPlayer = await Position.query().insertAndFetch({ name, position, squadId, userId });
    return res.status(201).json({ squad: newPlayer });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default squadPositionsRouter;
