import express from "express";
import objection from "objection";
import { Team } from "../../../models/index.js";
import TeamSerializer from "../../../serializers/TeamSerializer.js";


const teamsRouter = new express.Router();

teamsRouter.get("/", async (req, res) => {
  try {
    const teams = await Team.query();
    const serializedTeams = await Promise.all(
      teams.map(async (team) => await TeamSerializer.getSummary(team))
    );
    return res.status(200).json({ teams: serializedTeams });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

teamsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const team = await Team.query().findById(id);
    const serializedTeam = await serializedTeam.getDetails(team);
    return res.status(200).json({ team: serializedTeam });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default teamsRouter;
