const Model = require("./Model");

class Position extends Model {
  static get tableName() {
    return "positions";
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "squadId"],
      properties: {
        name: { type: "string" },
        squadId: { type: ["string", "integer"] },
      },
    };
  }
  static get relationMappings() {
    const { Squad, Player } = require("./index.js");
    return {
      players: {
        relation: Model.BelongsToOneRelation,
        modelClass: Player,
        join: {
          from: "positions.id",
          to: "players.positionId",
        },
      },
      squad: {
        relation: Model.BelongsToOneRelation,
        modelClass: Squad,
        join: {
          from: "positions.squadId",
          to: "squads.id",
        },
      },
    };
  }
}

module.exports = Position;
