const Model = require("./Model");

class Player extends Model {
  static get tableName() {
    return "players";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Assignment } = require("./index.js");

    return {
      assignments: {
        relation: Model.ManyToManyRelation,
        modelClass: Assignment,
        join: {
          from: "players.assignmentId",
          to: "assignments.id",
        },
      },
    };
  }
}

module.exports = Player;
