const Model = require("./Model");

class Team extends Model {
  static get tableName() {
    return "teams";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "city"],
      properties: {
        name: { type: "string", minLength: 1 },
        city: { type: "string", minLength: 1 },
      },
    };
  }

  static get relationMappings() {
    const { Player } = require("./index.js");

    return {
      players: {
        relation: Model.HasManyRelation,
        modelClass: Player,
        join: {
          from: "teams.id",
          to: "players.teamId",
        },
      },
    };
  }
}

module.exports = Team;
