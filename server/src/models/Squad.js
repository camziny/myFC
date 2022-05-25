const Model = require("./Model");

class Squad extends Model {
  static get tableName() {
    return "squads";
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "assignments"],
      properties: {
        name: { type: "string", minLength: 1 },
        assignments: { type: "string" },
        image: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Assignment } = require("./index.js");
    return {
      positions: {
        relation: Model.HasManyRelation,
        modelClass: Position,
        join: {
          from: "squads.id",
          to: "positions.squadId",
        },
      },
    };
  }
}

module.exports = Squad;
