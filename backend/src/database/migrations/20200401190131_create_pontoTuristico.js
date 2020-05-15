
exports.up = function(knex) {
    return knex.schema.createTable('pontosturisticos', function (table) {
        table.increments();
        table.string('nome').notNullable();
        table.string('local').notNullable();
        table.integer('abertura').notNullable();
        table.integer('fechamento').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('pontosturisticos');
};
