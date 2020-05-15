
exports.up = function(knex) {
    return knex.schema.createTable('transportes', function (table) {
        table.increments();
        table.string('placa').notNullable();
        table.string('tipo').notNullable();
        table.float('valor').notNullable();
        table.integer('capacidade').notNullable();

        table.string('dono_id').notNullable();
        
        table.foreign('dono_id').references('id').inTable('caronistas');
    }); 
};

exports.down = function(knex) {
    return knex.schema.dropTable('transportes');
};
