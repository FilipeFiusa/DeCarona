const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        const {data} = request.headers;

        console.log(request.headers);
        console.log(data);

        const viagens = await connection('viagens').
        where('viagens.data', '=', data).
        join('transportes', 'viagens.transporte', '=', 'transportes.id').
        select('viagens.*', 'transportes.valor', 'transportes.tipo', 'transportes.placa');

        console.log(viagens);

        return response.json(viagens);
    },

    async PesquisarPorLocal(request, response){
        const {nome, data} = request.headers

        const viagens = await connection('viagens').
        where('viagens.local', '=', nome).
        where('viagens.data', '=', data).
        join('transportes', 'viagens.transporte', '=', 'transportes.id').
        select('viagens.*', 'transportes.valor', 'transportes.tipo', 'transportes.placa');

        console.log(viagens);

        return response.json(viagens);
    },

    async create(request, response){
        const {data, saida, localsaida, retorno, localretorno} = request.body;  

        const {transporte, local} = request.headers;
        const quantAtual = 0;

        const cap = await connection('transportes').
        where('id', '=', transporte).
        select('capacidade');

        var capacidade = `${cap[0].capacidade}`;
        
        console.log(capacidade);

        const id = await connection('viagens').insert({
            data,
            transporte, 
            local, 
            saida, 
            localsaida, 
            retorno, 
            localretorno, 
            capacidade,
            quantAtual
        });


        return response.json({resp: "Viagem Cadastrada !", id});
    },

    async registroCaronista(request, response){
        const {id_car, id} = request.body;

        console.log(id_car, id);

        const [viagem] = await connection('viagens').
        where('id', '=', id).
        select('*');

        console.log(viagem);

        const [jaexiste] = await connection('registroEmViagens').
        where({'id_car': id_car, 'id': id}).
        select('*');
        
        console.log(jaexiste);
        if(jaexiste)
            return response.json({resp:"Existe"});


        console.log(viagem);

        let quantAtual = `${viagem['quantAtual']}`;
        let capacidade = `${viagem['capacidade']}`;

        console.log(typeof(quantAtual) + ' ' + typeof(capacidade));
        console.log(quantAtual + ' ' + capacidade);

        quantAtual = parseInt(quantAtual);
        capacidade = parseInt(capacidade);

        console.log(typeof(quantAtual) + ' ' + typeof(capacidade));
        console.log(quantAtual + ' ' + capacidade);


        if(quantAtual === capacidade){
            return response.json({resp: 'Não tem mais vagas nessa viagem'})
        }

        await connection('registroEmViagens').insert({
            id_car,
            id
        });

        await connection('viagens').where('id', '=', id).increment('quantAtual', 1);

        return response.json({resp: `Viagem no id ${id} registrada com sucesso `})
    },
    

    async listagemCaronistaNaViagem(request, response){
        const { id } = request.headers;

        const caronistas = await connection('registroEmViagens')
        .where('registroEmViagens.id', '=', id)
        .join('caronistas', 'registroEmViagens.id_car', '=', 'caronistas.id')
        .select('caronistas.name');

        console.log(caronistas);

        return response.json(caronistas);
    }
}