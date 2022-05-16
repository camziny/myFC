const Model = require("./Model");

class Player extends Model {
  static get tableName() {
    return "players";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["firstName", "lastName", "position", "teamId"],
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        position: { type: "string" },
        teamId: { type: ["string", "integer"] },
      },
    };
  }

  static get relationMappings() {
    const { Team } = require("./index.js");

    return {
      team: {
        relation: Model.BelongsToOneRelation,
        modelClass: Team,
        join: {
          from: "players.teamId",
          to: "teams.id",
        },
      },
    };
  }
}

module.exports = Player;
