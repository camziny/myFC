const Model = require("./Model");

class Squad extends Model {
  static get tableName() {
    return "squads";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", minLength: 1 },
        image: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Assignment } = require("./index.js");
    return {
      assignments: {
        relation: Model.HasManyRelation,
        modelClass: Assignment,
        join: {
          from: "squads.id",
          to: "assignments.squadId",
        },
      },
    };
  }
}

module.exports = Squad;
