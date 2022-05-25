const Model = require("./Model");

class Assignment extends Model {
  static get tableName() {
    return "assignments";
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["squadId", "playerId", "position"],
      properties: {
        squadId: { type: ["string", "integer"] },
        playerId: { type: ["string", "integer"] },
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
      players: {
        relation: Model.BelongsToOneRelation,
        modelClass: Player,
        join: {
          from: "assignments.id",
          to: "players.assignmentId",
        },
      },
      squad: {
        relation: Model.BelongsToOneRelation,
        modelClass: Squad,
        join: {
          from: "assignments.squadId",
          to: "squads.id",
        },
      },
    };
  }
}

module.exports = Assignment;
