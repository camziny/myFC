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
    const { Assignment, Squad } = require("./index.js");

    return {
      assignments: {
        relation: Model.HasManyRelation,
        modelClass: Assignment,
        join: {
          from: "players.id",
          to: "assignments.playerId",
        },
      },
      squads: {
        relation: Model.ManyToManyRelation,
        modelClass: Squad,
        join: {
          from: "players.id",
          through: {
            from: "assignments.playerId",
            to: "assignments.squadId",
          },
          to: "squads.id",
        },
      },
    };
  }
}

module.exports = Player;
