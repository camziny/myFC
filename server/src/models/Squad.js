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
        assignments: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Assignment, User } = require("./index.js");
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "squads.userId",
          to: "users.id",
        },
      },
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
