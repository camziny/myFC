class AssignmentSerializer {
  static async getSummary(assignment) {
    const allowedAttributes = [
      "id",
      "st",
      "lw",
      "rw",
      "cm",
      "lm",
      "rm",
      "lcb",
      "rcb",
      "lb",
      "rb",
      "gk",
      "userId",
    ];
    let serializedAssignment = {};
    for (const attribute of allowedAttributes) {
      serializedAssignment[attribute] = assignment[attribute];
    }
    serializedAssignment.user = await assignment.$relatedQuery("user").email;
    return serializedAssignment;
  }
}

export default AssignmentSerializer;
