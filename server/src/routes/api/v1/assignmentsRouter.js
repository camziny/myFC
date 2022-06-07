import express from "express";
import objection from "objection";
import RapidApi from "../../../apiClient/RapidApi.js";

const assignmentsRouter = new express.Router();

assignmentsRouter.get("/", async (req, res) => {
  const { id } = req.params;
  try {
    const assignments = await RapidApi.getAssignments({ assignmentId: id });
    const assignmentsData = JSON.parse(assignments);
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json(assignmentsData.response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

assignmentsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const assignments = await RapidApi.getAssignments({ assignmentId: id });
    const assignmentsData = JSON.parse(assignments);
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json(assignmentsData.response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

export default assignmentsRouter;

