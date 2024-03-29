import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

const clientRoutes = [
  "/",
  "/user-sessions/new",
  "/users/new",
  "/teams",
  "/teams/:id",
  "/players",
  "/players/:id",
  "/squads",
  "/squads/:id",
  "/assignments/:id",
  "/worldCupTeams",
  "/worldCupTeams/:id",
  "/worldCupPlayers",
  "/worldCupPlayers/:id",
  "/worldCupStandings",
];
router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

export default router;
