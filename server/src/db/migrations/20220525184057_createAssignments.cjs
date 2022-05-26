/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("assignments", (table) => {
    table.bigIncrements("id");
    table
      .enu("position", [
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
      ])
      .notNullable();
    table.integer("playerId").notNullable();
    table.bigInteger("squadId").unsigned().index().references("squads.id").notNullable();
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("assignments");
};
