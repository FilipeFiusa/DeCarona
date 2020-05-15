const connection = require('../database/connection')

module.exports = {

    async create(request, response) {
        const {login, senha} = request.body;

        const [caronista] = await connection('caronistas').
        where({'login': login, 'senha':senha}).
        select('id');

        console.log(caronista);

        if(caronista){
            return response.json({
                caronista,
                resp: "Entrou"
            })
        }else{
            return response.json({
                resp: "Nao Entrou"
            })
        }
    }
}
