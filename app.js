//Import das dependências para criar a API
const express   = require('express')
const cors      = require('cors')
const bodyParser = require('body-parser')

//Import das controllers do projeto
const controllerFilme = require('./controller/filme/controller_filme.js')

//Import das controllers do projeto
const controllerPersonagem = require('./controller/personagem/controller_personagem.js')

const controllerSexo = require('./controller/Sexo/controller_sexo.js')

const controllerClassificacao = require('./controller/classificacao/controller_classificacao.js')

const controllerAtividade = require('./controller/Atividade/controller.atividade.js')

const controllerGenero = require('./controller/genero/controller_genero.js')

const controllerNacionalidade = require('./controller/nacionalidade/controller_nacionalidade.js')

//Criando um objeto para manipular dados do body da API em formato JSON
const bodyParserJSON = bodyParser.json()

//Criando um objeto para manipular o express
const app = express()

//Definindo a porta
const PORT = process.env.PORT || 8080

//Conjuntos permissões a serem aplicadas no CORS da API
const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders:['Content-Type', 'Authorization'], // corrigi aqui também
}

//Configura as permissões da API através do CORS
app.use(cors(corsOptions))

//ENDPOINTS
app.post('/v1/senai/locadora/filme', bodyParserJSON, async function(request, response){
    
    let dados = request.body

    //Recebe o content type da requisição, para vaidar se é m JSON
    let contentType = request.headers['content-type']
    

    let result = await controllerFilme.inserirNovoFilme(dados, contentType)

    

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme', async function(request, response) {
    
    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
    
})

app.get('/v1/senai/locadora/filme/:id', async function(request, response) {
    //Recebe o id via parametro
    let id = request.params.id

    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
    
})

//Endpoint para atualizar um filme pelo ID
app.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async function(request, response){
    //Recebe o content-type da resuisição
    let contentType = request.headers['content-type']

    //Recebe o ID do registro a ser atualizado
    let id = request.params.id

    //Recebe os dados no corpo da requisição
    let dados = request.body

    //Chama a função de atualizar na contrroler e encaminha os dados, id e content-type
    //obdecendo a ordem de criação na função da controller
    let result = await controllerFilme.atualizarFilme(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

//Endepoint para deletar o filme pelo ID 
app.delete('/v1/senai/locadora/filme/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)
})

//Endepoint para inserir personagem
app.post('/v1/senai/filme/personagem', bodyParserJSON, async function(request, response) {
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerPersonagem.inserirNovoPersonagem(dados, contentType)

    response.status(result.status_code)
    response.json(result)
    
})

//Endepoint para listar personagens
app.get('/v1/senai/filme/personagem', async function(request, response) {
    
    let result = await controllerPersonagem.listarPersonagens()

    response.status(result.status_code)
    response.json(result)
})

//Endepoint para buscar personagens pelo (ID)
app.get('/v1/senai/filme/personagem/:id', async function(request, response) {
    //recebe o id via Parametro
    let id = request.params.id

    let result = await controllerPersonagem.buscarPersonagem(id)

    response.status(result.status_code)
    response.json(result)
    
})

//Endepoint para atualizar personagem
app.put('/v1/senai/filme/personagem/:id', bodyParserJSON, async function(request, response){

    //Recebe o content-type da resuisição
    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerPersonagem.atualizarPersonagem(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
    
})

//Endepoint para deletar personagens
app.delete('/v1/senai/filme/personagem/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllerPersonagem.excluirPersonagem(id)

    response.status(result.status_code)
    response.json(result)
})

//Endepoint para inserir um novo sexo
app.post('/v1/senai/filme/sexo', bodyParserJSON, async function(request, response){
    let dados = request.body
    
    let contentType = request.headers['content-type']

    let result = await controllerSexo.inserirNovoSexo(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/filme/sexo', async function(request, response) {

    let result = await controllerSexo.listarSexo()

    response.status(result.status_code)
    response.json(result)
    
})

app.get('/v1/senai/filme/sexo/:id', async function(request, response) {
    //recebe o id via Parametro
    let id = request.params.id

    let result = await controllerSexo.buscarSexo(id)
   
    response.status(result.status_code)
    response.json(result)
})

//Endepoint para atualizar Sexo
app.put('/v1/senai/filme/sexo/:id', bodyParserJSON, async function(request, response){

    //Recebe o content-type da resuisição
    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerSexo.atualizarSexo(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
    
})

//Endepoint para deletar sexo
app.delete('/v1/senai/filme/sexo/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllerSexo.excluirSexo(id)

    response.status(result.status_code)
    response.json(result)
})

//Endepoint para inserir uma nova classificação
app.post('/v1/senai/filme/classificacao', bodyParserJSON, async function(request, response){
    let dados = request.body
    
    let contentType = request.headers['content-type']

    let result = await controllerClassificacao.inserirNovaClassificacao(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/filme/classificacao', async function(request, response) {

    let result = await controllerClassificacao.listarClassificacoes()

    response.status(result.status_code)
    response.json(result)
    
})

app.get('/v1/senai/filme/classificacao/:id', async function(request, response) {
    //recebe o id via Parametro
    let id = request.params.id

    let result = await controllerClassificacao.buscarClassificacao(id)
   
    response.status(result.status_code)
    response.json(result)
})

//Endepoint para atualizar Classificação
app.put('/v1/senai/filme/classificacao/:id', bodyParserJSON, async function(request, response){

    //Recebe o content-type da resuisição
    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerClassificacao.atualizarClassificacao(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
    
})

//Endepoint para deletar classificação
app.delete('/v1/senai/filme/classificacao/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllerClassificacao.excluirClassificacao(id)

    response.status(result.status_code)
    response.json(result)
})

//Endepoint para inserir uma nova Atividade
app.post('/v1/senai/filme/atividade', bodyParserJSON, async function(request, response){
    let dados = request.body
    
    let contentType = request.headers['content-type']

    let result = await controllerAtividade.inserirNovaAtividade(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/filme/atividade', async function(request, response) {

    let result = await controllerAtividade.listarAtividades()

    response.status(result.status_code)
    response.json(result)
    
})

app.get('/v1/senai/filme/atividade/:id', async function(request, response) {
    //recebe o id via Parametro
    let id = request.params.id

    let result = await controllerAtividade.buscarAtividade(id)
   
    response.status(result.status_code)
    response.json(result)
})

//Endepoint para atualizar Atividade
app.put('/v1/senai/filme/atividade/:id', bodyParserJSON, async function(request, response){

    //Recebe o content-type da resuisição
    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerAtividade.atualizarAtividade(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
    
})

//Endepoint para deletar atividade
app.delete('/v1/senai/filme/atividade/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllerAtividade.excluirAtividade(id)

    response.status(result.status_code)
    response.json(result)
})

//Endepoint para inserir uma nova Atividade
app.post('/v1/senai/filme/genero', bodyParserJSON, async function(request, response){
    let dados = request.body
    
    let contentType = request.headers['content-type']

    let result = await controllerGenero.inserirGenero(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/filme/genero', async function(request, response) {

    let result = await controllerGenero.listarGenero()

    response.status(result.status_code)
    response.json(result)
    
})

app.get('/v1/senai/filme/genero/:id', async function(request, response) {
    //recebe o id via Parametro
    let id = request.params.id

    let result = await controllerGenero.buscarGenero(id)
   
    response.status(result.status_code)
    response.json(result)
})

//Endepoint para atualizar Genero
app.put('/v1/senai/filme/genero/:id', bodyParserJSON, async function(request, response){

    //Recebe o content-type da resuisição
    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerGenero.atualizarGenero(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
    
})

//Endepoint para deletar atividade
app.delete('/v1/senai/filme/genero/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllerGenero.excluirGenero(id)

    response.status(result.status_code)
    response.json(result)
})

app.post('/v1/senai/filme/nacionalidade', bodyParserJSON, async function(request, response){
    let dados = request.body
    
    let contentType = request.headers['content-type']

    let result = await controllerNacionalidade.inserirNovaNacionalidade(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/filme/nacionalidade', async function(request, response) {

    let result = await controllerNacionalidade.listarNacionalidade()

    response.status(result.status_code)
    response.json(result)
    
})

app.get('/v1/senai/filme/nacionalidade/:id', async function(request, response) {
    //recebe o id via Parametro
    let id = request.params.id

    let result = await controllerNacionalidade.buscarNacionalidade(id)
   
    response.status(result.status_code)
    response.json(result)
})

//Endepoint para atualizar Genero
app.put('/v1/senai/filme/nacionalidade/:id', bodyParserJSON, async function(request, response){

    //Recebe o content-type da resuisição
    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerNacionalidade.atualizarNacionalidade(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
    
})

//Endepoint para deletar atividade
app.delete('/v1/senai/filme/nacionalidade/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllerNacionalidade.excluirNacionalidade(id)

    response.status(result.status_code)
    response.json(result)
})


//Endepoint para 
//Inicia o servidor
app.listen(PORT, function(){
    console.log(`Servidor rodando na porta ${PORT}`)
})