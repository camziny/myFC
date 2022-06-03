
class AssignmentSerializer {
  static async getSummary(assignment) {
    const allowedAttributes = ["id", "position", "playerId"];
    let serializedAssignment = {};
    for (const attribute of allowedAttributes) {
      serializedAssignment[attribute] = assignment[attribute];
    }
    return serializedAssignment;
  }
}

export default AssignmentSerializer;
