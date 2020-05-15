
exports.up = function(knex) {
    return knex.schema.createTable('viagens', function (table) {
        table.increments();
        
        table.string('data').notNullable();

        table.string('transporte').notNullable();
        table.string('local').notNullable();
   
        table.float('saida').notNullable();
        table.string('localsaida').notNullable();
        table.float('retorno').notNullable();
        table.string('localretorno').notNullable();
        
        table.integer('capacidade').notNullable();
        table.integer('quantAtual').notNullable();

        table.foreign('transporte').references('id').inTable('transportes');
        table.foreign('local').references('nome').inTable('pontosturisticos');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('viagens');
};
