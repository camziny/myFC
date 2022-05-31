const Model = require("./Model");

class Assignment extends Model {
  static get tableName() {
    return "assignments";
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["position"],
      properties: {
        position: {
          enum: [
            "striker",
            "leftWing",
            "rightWing",
            "centerMidfielder",
            "leftMidfielder",
            "rightMidfielder",
            "leftCenterBack",
            "rightCenterBack",
            "leftBack",
            "rightBack",
            "goalKeeper",
          ],
        },
      },
    };
  }

  static get relationMappings() {
    const { Squad, Player } = require("./index.js");

    return {
      player: {
        relation: Model.BelongsToOneRelation,
        modelClass: Player,
        join: {
          from: "assignments.playerId",
          to: "players.id",
        },
      },
      squad: {
        relation: Model.BelongsToOneRelation,
        modelClass: Squad,
        join: {
          from: "assignments.playerId",
          to: "squads.id",
        },
      },
    };
  }
}

module.exports = Assignment;
