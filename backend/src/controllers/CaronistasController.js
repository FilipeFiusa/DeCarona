const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        const caronistas = await connection('caronistas').select('*');

        console.log(caronistas);

        return response.json(caronistas)
    },

    async getCaronistaPorCpf(request, response){
        const {id} = request.headers;

        const [name] = await connection('caronistas').where({'id': id}).select('name');

        console.log(name);

        return response.json(name)
    },

    async create(request, response) {
        const {login, senha, cpf, rg, name, age} = request.body;

        await connection('caronistas').insert({
            login,
            senha,
            cpf,
            rg,
            name,
            age
        });

        console.log(login, senha, cpf, rg, name, age);

        return response.json({name})
    }
}