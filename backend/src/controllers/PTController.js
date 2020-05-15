const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        const pontosturisticos = await connection('pontosturisticos').select('*');

        console.log(pontosturisticos);

        return response.json(pontosturisticos);
    },

    async getPTporLocal(request, response){

        const {local} = request.headers;

        const pontosturisticos = await connection('pontosturisticos')
        .where({'local': local})
        .select('*');

        console.log(pontosturisticos);

        return response.json(pontosturisticos);
    },

    async getPTporId(request, response){

        const {id} = request.body;

        const pontosturisticos = await connection('pontosturisticos')
        .where({'id': id})
        .select('*')
        .first();

        console.log(pontosturisticos);

        return response.json(pontosturisticos);
    },

    async create(request, response){
        const {nome, local, abertura, fechamento} = request.body;

        await connection('pontosturisticos').insert({
            nome, local, abertura, fechamento
        });

        return response.json({nome});
    }
}