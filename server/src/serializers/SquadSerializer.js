import AssignmentSerializer from "./AssignmentSerializer.js";

class SquadSerializer {
  static async getSummary(squad) {
    const allowedAttributes = ["id", "name", "image"];
    let serializedSquad = {};
    for (const attribute of allowedAttributes) {
      serializedSquad[attribute] = squad[attribute];
    }
    serializedSquad.user = await squad.$relatedQuery("user").email;
    return serializedSquad;
  }

  static async getDetails(squad) {
    const allowedAttributes = ["name", "assignments", "image", "userId"];
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
