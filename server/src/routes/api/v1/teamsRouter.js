import express from "express";
import objection from "objection";
import { Team } from "../../../models/index.js";
import RapidApi from "../../../apiClient/RapidApi.js";


const teamsRouter = new express.Router();

teamsRouter.get("/", async (req, res) => {
  try {
    const rapidApiResponse = await RapidApi.getTeams()
    const teamsData = JSON.parse(rapidApiResponse)
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json(teamsData)
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

teamsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {;
    const players = await RapidApi.getPlayers({ teamId: id })
    const playersData = JSON.parse(players)
    return res
    .set({ "Content-Type": "application/json" })
    .status(200)
    .json(playersData.response);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error });
  }
});

export default teamsRouter;
