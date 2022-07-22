import express from "express";
import objection from "objection";
// import cleanUserInput from "../../../services/cleanUserInput.js";
import { ValidationError } from "objection";
import RapidApi from "../../../apiClient/RapidApi.js";
// import { Assignment } from "../../../models/index.js";

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

assignmentsRouter.delete("/:id", async (req, res) => {
  try {
    const assignmentToDelete = await Assignment.query().findById(req.params.id);
    if (req.user && assignmentToDelete.userId === req.user.id) {
      await assignmentToDelete.$query().delete();
      res.status(200).json({ message: "This assignment was successfully deleted" });
    } else {
      res.status(401).json({ "AuthorizationError:": "User not authorized to delete assignment" });
    }
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});

assignmentsRouter.patch("/:id", async (req, res) => {
  const { position } = req.body;

  try {
    if (!position) {
      return res.status(422).json({ "Error:": "Position must have value" });
    }
    const assignmentToEdit = await Assignment.query().findById(req.params.id);
    if (assignmentToEdit.userId === req.user.id) {
      const updatedAssignment = await Assignment.query().patchAndFetchById(req.params.id, {
        position,
      });
      res.status(200).json({ assignment: updatedAssignment });
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error });
    } else {
      return res.status(500).json({ errors: error });
    }
  }
});

export default assignmentsRouter;
