import express from "express";
import objection from "objection";
import { Team } from "../../../models/index.js";
import RapidApi from "../../../apiClient/RapidApi.js";

const worldCupTeamsRouter = new express.Router();

worldCupTeamsRouter.get("/", async (req, res) => {
  try {
    const rapidApiResponse = await RapidApi.getWorldCupTeams();
    const teamsData = JSON.parse(rapidApiResponse);
    return res.set({ "Content-Type": "application/json" }).status(200).json(teamsData);
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

worldCupTeamsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const pageNumber = req.query.pageNumber;
  try {
    const players = await RapidApi.getWorldCupPlayers({ teamId: id, pageNumber });
    const playersData = JSON.parse(players);
    return res.set({ "Content-Type": "application/json" }).status(200).json(playersData.response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

export default worldCupTeamsRouter;
