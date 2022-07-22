/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("assignments", (table) => {
    table.bigIncrements("id");
    table.integer("st").notNullable()
    table.integer("lw").notNullable()
    table.integer("rw").notNullable()
    table.integer("cm").notNullable()
    table.integer("lm").notNullable()
    table.integer("rm").notNullable()
    table.integer("lcb").notNullable()
    table.integer("rcb").notNullable()
    table.integer("lb").notNullable()
    table.integer("rb").notNullable()
    table.integer("gk").notNullable()
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
