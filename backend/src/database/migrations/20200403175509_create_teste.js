
exports.up = function(knex) {
    return knex.schema.createTable('teste', function (table) {
        table.string('id1').notNullable();
        table.integer('id2').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('registroEmViagens');
};
