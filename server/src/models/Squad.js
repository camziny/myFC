const Model = require("./Model");

class Squad extends Model {
  static get tableName() {
    return "squads";
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "players"],
      properties: {
        name: { type: "string", minLength: 1 },
        players: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Position, User } = require("./index.js");
    return {
      positions: {
        relation: Model.HasManyRelation,
        modelClass: Position,
        join: {
          from: "squads.id",
          to: "positions.squadId",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "squads.userId",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Squad;
