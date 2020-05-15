
exports.up = function(knex) {
    return knex.schema.createTable('caronistas', function (table) {

        table.increments();

        table.string('login').notNullable();
        table.string('senha').notNullable();

        table.string('cpf').notNullable();
        table.string('rg').notNullable();
        table.string('name').notNullable();
        table.integer('age').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('caronistas');
};
