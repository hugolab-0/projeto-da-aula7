// ======================== IMPORTS ========================

// Importa o framework Express, utilizado para criar a API (rotas, servidor, etc.)
const express       = require('express')

// Importa o CORS, que permite controlar quais origens podem acessar a API
const cors          = require('cors')

// Importa o body-parser, utilizado para interpretar dados enviados no corpo da requisição (body)
const bodyParser    = require('body-parser')


// ======================== CONTROLLER ========================

// Importa a controller de filmes, que contém as regras de negócio (validação, lógica, etc.)
const controllerFilme = require('./controller/filme/controller_filmes.js')
const controllerPersonagem = require('./controller/personagem/controller_personagem.js')
const controllerSexo = require('./controller/sexo/controller_sexo.js')
const controllerGenero = require('./controller/genero/controller_genero.js')
const controllerAtividade = require('./controller/atividade/controller_atividade.js')
const controllerNacionalidade = require('./controller/nacionalidade/controller_nacionalidade.js')


// ======================== CONFIG BODY ========================

// Cria um middleware para permitir que a API receba e interprete JSON no body das requisições
const bodyParserJSON = bodyParser.json()


// ======================== APP ========================

// Cria a instância do Express (objeto principal da API)
const app =  express()


// ======================== CONFIG CORS ========================

// Define as regras de acesso da API (quem pode acessar e como)
const corsOptions = {
    origin: ['*'], // Permite acesso de qualquer origem ("*" = todos)
    methods: 'GET, POST, PUT, DELETE, OPTIONS', // Define quais métodos HTTP são permitidos
    allowedHeaders: ['content-type', 'autorization'] // Define quais headers são permitidos (OBS: "authorization" está com erro de digitação)
}

// Aplica as configurações de CORS na aplicação
app.use(cors(corsOptions))


// ======================== ENDPOINTS - FILMES ========================

// INSERT FILME
app.post('/v1/senai/locadora/filme', bodyParserJSON, async function(req, res){
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await controllerFilme.inserirNovoFilme(dados, contentType)

    res.status(result.status_code)
    res.json(result)
})

// SELECT ALL FILMES
app.get('/v1/senai/locadora/lista/filme', async function(req, res) {
    let result = await controllerFilme.listaFilme()

    res.status(result.status_code)
    res.json(result)
})


// SELECT FILME BY ID
app.get('/v1/senai/locadora/filme/:id', async function(req, res) {
    let id = req.params.id
    
    let result = await controllerFilme.buscarFilme(id)

    res.status(result.status_code)
    res.json(result)
})


// UPDATE FILME
app.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async function(req, res) {
    let contentType = req.headers['content-type']
    let id = req.params.id
    let dados = req.body

    let result = await controllerFilme.atualizarFilme(dados, id, contentType)

    res.status(result.status_code)
    res.json(result)
})


// DELETE FILME
app.delete('/v1/senai/locadora/lista/filme/:id', async function(req, res) {
    let id = req.params.id

    let result = await controllerFilme.deletarFilme(id)

    res.status(result.status_code)
    res.json(result)
})



// ======================== ENDPOINTS - PERSONAGENS ========================

// INSERT PERSONAGEM
app.post('/v1/senai/locadora/filme/personagem', bodyParserJSON, async function(req, res){
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await controllerPersonagem.inserirNovoPersonagem(dados, contentType)

    res.status(result.status_code)
    res.json(result)
})

app.put('/v1/senai/locadora/filme/personagem/atualizar/:id', bodyParserJSON, async function(req, res) {
    let contentType = req.headers['content-type']
    let id = req.params.id
    let dados = req.body

    let result = await controllerPersonagem.atualizarPersonagem(dados, id, contentType)

    res.status(result.status_code)
    res.json(result)
})


// SELECT PERSONAGEM BY ID
app.get('/v1/senai/locadora/filme/personagem/:id', async function(req, res) {
    let id = req.params.id
    
    let result = await controllerPersonagem.buscarPersonagem(id)

    res.status(result.status_code)
    res.json(result)
})


// DELETE PERSONAGEM
app.delete('/v1/senai/locadora/lista/filme/personagem/deletar/:id', async function(req, res) {
    let id = req.params.id

    let result = await controllerPersonagem.excluirPersonagem(id)

    res.status(result.status_code)
    res.json(result)
})


// SELECT ALL PERSONAGENS
app.get('/v1/senai/locadora/lista/filme/personagem', async function(req, res) {
    let result = await controllerPersonagem.listarPersonagens()

    res.status(result.status_code)
    res.json(result)
})

// ======================== ENDPOINTS - SEXO ========================

// INSERT SEXO
app.post('/v1/senai/locadora/sexo', bodyParserJSON, async function(req, res){
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await controllerSexo.inserirNovosexo(dados, contentType)

    res.status(result.status_code)
    res.json(result)
})


// SELECT ALL SEXO
app.get('/v1/senai/locadora/lista/sexo', async function(req, res) {
    let result = await controllerSexo.listarPersonagens()

    res.status(result.status_code)
    res.json(result)
})


// SELECT SEXO BY ID
app.get('/v1/senai/locadora/sexo/:id', async function(req, res) {
    let id = req.params.id
    
    let result = await controllerSexo.buscarsexo(id)

    res.status(result.status_code)
    res.json(result)
})


// UPDATE SEXO
app.put('/v1/senai/locadora/sexo/:id', bodyParserJSON, async function(req, res) {
    let contentType = req.headers['content-type']
    let id = req.params.id
    let dados = req.body

    let result = await controllerSexo.atualizarsexo(dados, id, contentType)

    res.status(result.status_code)
    res.json(result)
})


// DELETE SEXO
app.delete('/v1/senai/locadora/lista/sexo/:id', async function(req, res) {
    let id = req.params.id

    let result = await controllerSexo.excluirsexo(id)

    res.status(result.status_code)
    res.json(result)
})


// ======================== ENDPOINTS - CLASSIFICACAO ========================

// INSERT CLASSIFICACAO
app.post('/v1/senai/locadora/classificacao', bodyParserJSON, async function(req, res){
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await controllerClassificacao.inserirNovaClassificacao(dados, contentType)

    res.status(result.status_code)
    res.json(result)
})


// SELECT ALL CLASSIFICACAO
app.get('/v1/senai/locadora/lista/classificacao', async function(req, res) {
    let result = await controllerClassificacao.listarClassificacao()

    res.status(result.status_code)
    res.json(result)
})


// SELECT CLASSIFICACAO BY ID
app.get('/v1/senai/locadora/classificacao/:id', async function(req, res) {
    let id = req.params.id
    
    let result = await controllerClassificacao.buscarClassificacao(id)

    res.status(result.status_code)
    res.json(result)
})


// UPDATE CLASSIFICACAO
app.put('/v1/senai/locadora/classificacao/:id', bodyParserJSON, async function(req, res) {
    let contentType = req.headers['content-type']
    let id = req.params.id
    let dados = req.body

    let result = await controllerClassificacao.atualizarClassificacao(dados, id, contentType)

    res.status(result.status_code)
    res.json(result)
})


// DELETE CLASSIFICACAO
app.delete('/v1/senai/locadora/lista/classificacao/:id', async function(req, res) {
    let id = req.params.id

    let result = await controllerClassificacao.excluirClassificacao(id)

    res.status(result.status_code)
    res.json(result)
})

// ======================== ENDPOINTS - GENERO ========================

app.post('/v1/senai/locadora/filme/genero', bodyParserJSON, async function(req, res){
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await controllerGenero.inserirNovoGenero(dados, contentType)

    res.status(result.status_code)
    res.json(result)
})

app.get('/v1/senai/locadora/filme/listar/genero', async function(req, res) {
    let result = await controllerGenero.listarGeneros()

    res.status(result.status_code)
    res.json(result)
    
})

app.get('/v1/senai/locadora/filme/buscar/genero', async function(req, res) {
   let id = req.params.id
    let result = await controllerGenero.buscarGenero(id)

    res.status(result.status_code)
    res.json(result)
})

// UPDATE CLASSIFICACAO
app.put('/v1/senai/locadora/atualizar/genero/:id', bodyParserJSON, async function(req, res) {
    let contentType = req.headers['content-type']
    let id = req.params.id
    let dados = req.body

    let result = await controllerGenero.atualizarGenero(dados, id, contentType)

    res.status(result.status_code)
    res.json(result)
})


// DELETE CLASSIFICACAO
app.delete('/v1/senai/locadora/deletar/genero/:id', async function(req, res) {
    let id = req.params.id

    let result = await controllerGenero.excluirGenero(id)

    res.status(result.status_code)
    res.json(result)
})

// ======================== ATIVIDADE ========================


app.post('/v1/senai/locadora/filme/ator/atividade', bodyParserJSON, async function(req, res){
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await controllerAtividade.inserirNovaAtividade(dados, contentType)

    res.status(result.status_code)
    res.json(result)
})

app.get('/v1/senai/locadora/filme/listar/atividade', async function(req, res) {
    let result = await controllerAtividade.listarAtividades()

    res.status(result.status_code)
    res.json(result)
    
})

app.get('/v1/senai/locadora/filme/buscar/atividade', async function(req, res) {
   let id = req.params.id
    let result = await controllerAtividade.buscarAtividade(id)

    res.status(result.status_code)
    res.json(result)
})

// UPDATE CLASSIFICACAO
app.put('/v1/senai/locadora/atualizar/atividade/:id', bodyParserJSON, async function(req, res) {
    let contentType = req.headers['content-type']
    let id = req.params.id
    let dados = req.body

    let result = await controllerAtividade.atualizarAtividade(dados, id, contentType)

    res.status(result.status_code)
    res.json(result)
})


// DELETE CLASSIFICACAO
app.delete('/v1/senai/locadora/deletar/atividade/:id', async function(req, res) {
    let id = req.params.id

    let result = await controllerAtividade.excluirAtividade(id)

    res.status(result.status_code)
    res.json(result)
})


// ======================== SERVER ========================

// Inicializa o servidor na porta 8080
// A API ficará disponível em: http://localhost:8080
app.listen(8080, function(){

    // Mensagem exibida no console quando o servidor inicia
    console.log('arquivo pronto')
})