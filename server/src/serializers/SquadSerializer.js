import AssignmentSerializer from "./AssignmentSerializer.js";

class SquadSerializer {
  static getSummary(squad) {
    const allowedAttributes = ["id", "name", "image", "assignments"];
    let serializedSquad = {};
    for (const attribute of allowedAttributes) {
      serializedSquad[attribute] = squad[attribute];
    }
    return serializedSquad;
  }

  static async getSquadSummaryWithPlayers(squad) {
    const allowedAttributes = ["id", "name", "image", "assignments"];
    let serializedSquad = {};
    for (const attribute of allowedAttributes) {
      serializedSquad[attribute] = squad[attribute];
    }
    const assignments = await squad.$relatedQuery("assignments");
    const serializedAssignments = await Promise.all(
      assignments.map(async (assignment) => await AssignmentSerializer.getSummary(assignment))
    );
    serializedSquad.assignments = serializedAssignments;

    return serializedSquad;
  }
}

export default SquadSerializer;
