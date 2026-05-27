// ==========================================================
// IMPORTAÇÃO DAS DEPENDÊNCIAS PRINCIPAIS DA API - TESTANDO MEUS COMMIT
// ==========================================================

// Importa o framework Express para criação da API
const express = require('express')

// Importa o CORS para liberar acesso externo à API
const cors = require('cors')

// Importa o body-parser para manipular JSON enviado no body
const bodyParser = require('body-parser')


// ==========================================================
// IMPORTAÇÃO DAS CONTROLLERS
// ==========================================================

// Controller responsável pelas operações de Filme
const controllerFilme = require('./controller/filme/controller_filme.js')

// Controller responsável pelas operações de Personagem
const controllerPersonagem = require('./controller/personagem/controller_personagem.js')

// Controller responsável pelas operações de Sexo
const controllerSexo = require('./controller/Sexo/controller_sexo.js')

// Controller responsável pelas operações de Classificação
const controllerClassificacao = require('./controller/classificacao/controller_classificacao.js')

// Controller responsável pelas operações de Atividade
const controllerAtividade = require('./controller/Atividade/controller.atividade.js')

// Controller responsável pelas operações de Gênero
const controllerGenero = require('./controller/genero/controller_genero.js')


// ==========================================================
// CONFIGURAÇÕES INICIAIS DA API
// ==========================================================

// Cria um objeto para converter o body da requisição em JSON
const bodyParserJSON = bodyParser.json()

// Cria a aplicação Express
const app = express()

// Define a porta da aplicação
const PORT = process.env.PORT || 8080


// ==========================================================
// CONFIGURAÇÕES DE CORS
// ==========================================================

// Define permissões de acesso da API
const corsOptions = {
    origin: '*', // Permite acesso de qualquer origem
    methods: 'GET, POST, PUT, DELETE, OPTIONS', // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}

// Aplica as configurações do CORS na API
app.use(cors(corsOptions))


// ==========================================================
// ENDPOINTS - FILME
// ==========================================================

// Endpoint para inserir um novo filme
app.post('/v1/senai/locadora/filme', bodyParserJSON, async function(request, response) {

    // Recebe os dados enviados no body
    let dados = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a controller para inserir o filme
    let result = await controllerFilme.inserirNovoFilme(dados, contentType)

    // Retorna o status e os dados
    response.status(result.status_code)
    response.json(result)
})


// Endpoint para listar todos os filmes
app.get('/v1/senai/locadora/filme', async function(request, response) {

    // Chama a controller para listar os filmes
    let result = await controllerFilme.listarFilme()

    // Retorna os dados
    response.status(result.status_code)
    response.json(result)
})


// Endpoint para buscar um filme pelo ID
app.get('/v1/senai/locadora/filme/:id', async function(request, response) {

    // Recebe o ID via parâmetro
    let id = request.params.id

    // Busca o filme
    let result = await controllerFilme.buscarFilme(id)

    // Retorna o resultado
    response.status(result.status_code)
    response.json(result)
})


// Endpoint para atualizar um filme pelo ID
app.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async function(request, response) {

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe o ID do filme
    let id = request.params.id

    // Recebe os dados enviados
    let dados = request.body

    // Atualiza o filme
    let result = await controllerFilme.atualizarFilme(dados, id, contentType)

    // Retorna o resultado
    response.status(result.status_code)
    response.json(result)
})


// Endpoint para deletar um filme pelo ID
app.delete('/v1/senai/locadora/filme/:id', async function(request, response) {

    // Recebe o ID
    let id = request.params.id

    // Exclui o filme
    let result = await controllerFilme.excluirFilme(id)

    // Retorna o resultado
    response.status(result.status_code)
    response.json(result)
})


// ==========================================================
// ENDPOINTS - PERSONAGEM
// ==========================================================

// Endpoint para inserir um personagem
app.post('/v1/senai/filme/personagem', bodyParserJSON, async function(request, response) {

    // Recebe os dados do body
    let dados = request.body

    // Recebe o content-type
    let contentType = request.headers['content-type']

    // Insere o personagem
    let result = await controllerPersonagem.inserirNovoPersonagem(dados, contentType)

    // Retorna o resultado
    response.status(result.status_code)
    response.json(result)
})


// Endpoint para listar personagens
app.get('/v1/senai/filme/personagem', async function(request, response) {

    // Lista os personagens
    let result = await controllerPersonagem.listarPersonagens()

    // Retorna os dados
    response.status(result.status_code)
    response.json(result)
})


// Endpoint para buscar personagem por ID
app.get('/v1/senai/filme/personagem/:id', async function(request, response) {

    // Recebe o ID
    let id = request.params.id

    // Busca o personagem
    let result = await controllerPersonagem.buscarPersonagem(id)

    // Retorna o resultado
    response.status(result.status_code)
    response.json(result)
})


// Endpoint para atualizar personagem
app.put('/v1/senai/filme/personagem/:id', bodyParserJSON, async function(request, response) {

    // Recebe o content-type
    let contentType = request.headers['content-type']

    // Recebe o ID
    let id = request.params.id

    // Recebe os dados
    let dados = request.body

    // Atualiza o personagem
    let result = await controllerPersonagem.atualizarPersonagem(dados, id, contentType)

    // Retorna o resultado
    response.status(result.status_code)
    response.json(result)
})


// Endpoint para deletar personagem
app.delete('/v1/senai/filme/personagem/:id', async function(request, response) {

    // Recebe o ID
    let id = request.params.id

    // Exclui o personagem
    let result = await controllerPersonagem.excluirPersonagem(id)

    // Retorna o resultado
    response.status(result.status_code)
    response.json(result)
})


// ==========================================================
// ENDPOINTS - SEXO
// ==========================================================

// Endpoint para inserir sexo
app.post('/v1/senai/filme/sexo', bodyParserJSON, async function(request, response) {

    // Recebe os dados
    let dados = request.body

    // Recebe o content-type
    let contentType = request.headers['content-type']

    // Insere o sexo
    let result = await controllerSexo.inserirNovoSexo(dados, contentType)

    // Retorna o resultado
    response.status(result.status_code)
    response.json(result)
})


// Endpoint para listar sexos
app.get('/v1/senai/filme/sexo', async function(request, response) {

    // Lista os sexos
    let result = await controllerSexo.listarSexo()

    // Retorna o resultado
    response.status(result.status_code)
    response.json(result)
})


// Endpoint para buscar sexo por ID
app.get('/v1/senai/filme/sexo/:id', async function(request, response) {

    // Recebe o ID
    let id = request.params.id

    // Busca o sexo
    let result = await controllerSexo.buscarSexo(id)

    // Retorna o resultado
    response.status(result.status_code)
    response.json(result)
})


// Endpoint para atualizar sexo
app.put('/v1/senai/filme/sexo/:id', bodyParserJSON, async function(request, response) {

    // Recebe o content-type
    let contentType = request.headers['content-type']

    // Recebe o ID
    let id = request.params.id

    // Recebe os dados
    let dados = request.body

    // Atualiza o sexo
    let result = await controllerSexo.atualizarSexo(dados, id, contentType)

    // Retorna o resultado
    response.status(result.status_code)
    response.json(result)
})


// Endpoint para deletar sexo
app.delete('/v1/senai/filme/sexo/:id', async function(request, response) {

    // Recebe o ID
    let id = request.params.id

    // Exclui o sexo
    let result = await controllerSexo.excluirSexo(id)

    // Retorna o resultado
    response.status(result.status_code)
    response.json(result)
})


// ==========================================================
// ENDPOINTS - CLASSIFICAÇÃO
// ==========================================================

// Endpoint para inserir classificação
app.post('/v1/senai/filme/classificacao', bodyParserJSON, async function(request, response) {

    let dados = request.body
    let contentType = request.headers['content-type']

    // Insere a classificação
    let result = await controllerClassificacao.inserirNovaClassificacao(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para listar classificações
app.get('/v1/senai/filme/classificacao', async function(request, response) {

    let result = await controllerClassificacao.listarClassificacoes()

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para buscar classificação por ID
app.get('/v1/senai/filme/classificacao/:id', async function(request, response) {

    let id = request.params.id

    let result = await controllerClassificacao.buscarClassificacao(id)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para atualizar classificação
app.put('/v1/senai/filme/classificacao/:id', bodyParserJSON, async function(request, response) {

    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerClassificacao.atualizarClassificacao(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para deletar classificação
app.delete('/v1/senai/filme/classificacao/:id', async function(request, response) {

    let id = request.params.id

    let result = await controllerClassificacao.excluirClassificacao(id)

    response.status(result.status_code)
    response.json(result)
})


// ==========================================================
// ENDPOINTS - ATIVIDADE
// ==========================================================

// Endpoint para inserir atividade
app.post('/v1/senai/filme/atividade', bodyParserJSON, async function(request, response) {

    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerAtividade.inserirNovaAtividade(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para listar atividades
app.get('/v1/senai/filme/atividade', async function(request, response) {

    let result = await controllerAtividade.listarAtividades()

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para buscar atividade por ID
app.get('/v1/senai/filme/atividade/:id', async function(request, response) {

    let id = request.params.id

    let result = await controllerAtividade.buscarAtividade(id)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para atualizar atividade
app.put('/v1/senai/filme/atividade/:id', bodyParserJSON, async function(request, response) {

    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerAtividade.atualizarAtividade(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para deletar atividade
app.delete('/v1/senai/filme/atividade/:id', async function(request, response) {

    let id = request.params.id

    let result = await controllerAtividade.excluirAtividade(id)

    response.status(result.status_code)
    response.json(result)
})


// ==========================================================
// ENDPOINTS - GÊNERO
// ==========================================================

// Endpoint para inserir gênero
app.post('/v1/senai/filme/genero', bodyParserJSON, async function(request, response) {

    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerGenero.inserirGenero(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para listar gêneros
app.get('/v1/senai/filme/genero', async function(request, response) {

    let result = await controllerGenero.listarGenero()

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para buscar gênero por ID
app.get('/v1/senai/filme/genero/:id', async function(request, response) {

    let id = request.params.id

    let result = await controllerGenero.buscarGenero(id)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para atualizar gênero
app.put('/v1/senai/filme/genero/:id', bodyParserJSON, async function(request, response) {

    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerGenero.atualizarGenero(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para deletar gênero
app.delete('/v1/senai/filme/genero/:id', async function(request, response) {

    let id = request.params.id

    let result = await controllerGenero.excluirGenero(id)

    response.status(result.status_code)
    response.json(result)
})


// ==========================================================
// INICIALIZAÇÃO DO SERVIDOR
// ==========================================================

// Inicia o servidor da API
app.listen(PORT, function() {

    // Exibe mensagem no terminal
    console.log(`API pronta para uso`)
})