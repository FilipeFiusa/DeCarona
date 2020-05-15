
exports.up = function(knex) {
    return knex.schema.createTable('registroEmViagens', function (table) {
        table.string('id_car').notNullable();
        table.string('id').notNullable();

        table.foreign('id_car').references('cpf').inTable('caronistas');
        table.foreign('id').references('id').inTable('viagens');
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('registroEmViagens');
};
