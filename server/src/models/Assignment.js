const Model = require("./Model");

class Assignment extends Model {
  static get tableName() {
    return "assignments";
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "position", "squadId", "userId"],
      properties: {
        name: { type: "string" },
        position: { enum: ["st", "lw", "rw", "cm", "lm", "rm", "lcb", "rcb", "lb", "rb", "gk"] },
        squadId: { type: ["string", "integer"] },
        userId: { type: ["string", "integer"] },
      },
    };
  }

  static get relationMappings() {
    const { Squad, User } = require("./index.js");

    return {
      squad: {
        relation: Model.BelongsToOneRelation,
        modelClass: Squad,
        join: {
          from: "assignments.squadId",
          to: "squads.id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "assignments.userId",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Assignment;
