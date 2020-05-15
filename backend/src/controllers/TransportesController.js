const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        const transportes = await connection('transportes').select('*');

        console.log(transportes);

        return response.json(transportes);
    },

    async indexPorId(request, response){
        const {id} = request.headers;

        const transportes = await connection('transportes').
        where('dono_id', '=', id).
        select('*');

        console.log(transportes);

        return response.json(transportes);
    },

    async create(request, response){
        const {placa, tipo, valor, capacidade} = request.body;
        const {dono_id} = request.headers;

        await connection('transportes').insert({
            placa,
            tipo, 
            valor,
            dono_id, 
            capacidade
        });

        return response.json({placa, resp: "Entrou"});
    }
}