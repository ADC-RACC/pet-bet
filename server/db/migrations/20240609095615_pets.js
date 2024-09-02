/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('pets', (table) => {
    table.integer('id').primary()
    table.string('owner_id')
    table.string('name')
    table.text('bio')
    table.integer('wins')
    table.integer('losses')
    table.text('img_url')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('pets')
}
