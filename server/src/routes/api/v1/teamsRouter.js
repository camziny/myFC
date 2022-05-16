import express from "express";
import objection from "objection";

import { Team } from "../../../models/index.js";

const teamsRouter = new express.Router();

teamsRouter.get("/", async (req, res) => {
  try {
    const teams = await Team.query();
    return res.status(200).json({ teams: teams });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

teamsRouter.get("/:id", async (req, res) => {
  try {
    const team = await Team.query().findById(req.params.id);
    team.players = await team.$relatedQuery("players");
    return res.status(200).json({ team: team });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default teamsRouter;
