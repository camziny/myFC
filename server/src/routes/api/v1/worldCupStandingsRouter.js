import express from "express";
import objection from "objection";
import { Team } from "../../../models/index.js";
import RapidApi from "../../../apiClient/RapidApi.js";

const worldCupStandingsRouter = new express.Router();

worldCupStandingsRouter.get("/", async (req, res) => {
  try {
    const rapidApiResponse = await RapidApi.getWorldCupStandings();
    const teamsData = JSON.parse(rapidApiResponse);
    return res.set({ "Content-Type": "application/json" }).status(200).json(teamsData);
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default worldCupStandingsRouter;
