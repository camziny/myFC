import AssignmentSerializer from "./AssignmentSerializer.js";

class SquadSerializer {
  static async getSummary(squad) {
    const allowedAttributes = ["id", "name", "image"];
    let serializedSquad = {};
    for (const attribute of allowedAttributes) {
      serializedSquad[attribute] = squad[attribute];
    }
    return serializedSquad;
  }

  static async getDetails(squad) {
    const allowedAttributes = ["name", "image", "assignments"];
    let serializedSquad = {};
    for (const attribute of allowedAttributes) {
      serializedSquad[attribute] = squad[attribute];
    }
    const assignments = await squad.$relatedQuery("assignments");
    serializedSquad.assignments = await Promise.all(
      assignments.map(async (assignment) => await AssignmentSerializer.getSummary(assignment))
      );
    return serializedSquad;
  }
}

export default SquadSerializer;
