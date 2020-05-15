const express = require('express');

const CaronistasController = require('./controllers/CaronistasController')
const TransportesController = require('./controllers/TransportesController')
const PontoTuriscoController = require('./controllers/PTController')
const ViagensController = require('./controllers/ViagensControlller')
const SessionController = require('./controllers/SessionController')

const routes = express.Router();

routes.get('/cindex', CaronistasController.index);
routes.get('/caronista', CaronistasController.getCaronistaPorCpf);
routes.post('/caronistas', CaronistasController.create);

routes.post('/login', SessionController.create);

routes.get('/tindex', TransportesController.index);
routes.get('/tindexId', TransportesController.indexPorId);
routes.post('/transportes', TransportesController.create);

routes.get('/ptindex', PontoTuriscoController.index);
routes.get('/pontoturistico', PontoTuriscoController.getPTporId);
routes.get('/pontosturisticos', PontoTuriscoController.getPTporLocal);
routes.post('/pontosturisticos', PontoTuriscoController.create);

routes.get('/vindex', ViagensController.index);
routes.get('/vindexpl', ViagensController.PesquisarPorLocal);
routes.post('/viagens',ViagensController.create);
routes.post('/viagens/registo', ViagensController.registroCaronista)
routes.get('/viagens/listagem', ViagensController.listagemCaronistaNaViagem)

module.exports = routes;