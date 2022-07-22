const Model = require("./Model");

class Assignment extends Model {
  static get tableName() {
    return "assignments";
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "st",
        "lw",
        "rw",
        "cm",
        "lm",
        "rm",
        "lcb",
        "rcb",
        "lb",
        "rb",
        "gk",
        "squadId",
        "userId",
      ],
      properties: {
        st: { type: ["string",  "integer"], },
        lw: { type: ["string",  "integer"], },
        rw: { type: ["string",  "integer"], },
        cm: { type: ["string",  "integer"], },
        lm: { type: ["string",  "integer"], },
        rm: { type: ["string",  "integer"], },
        lcb: { type: ["string",  "integer"], },
        rcb: { type: ["string",  "integer"], },
        lb: { type: ["string",  "integer"], },
        rb: { type: ["string",  "integer"], },
        gk: { type: ["string",  "integer"], },
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
