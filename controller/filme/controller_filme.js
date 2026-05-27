//Import do arquivo de padronização de mensagens
const message_config = require('../modulo/configMessages.js')

//Import do arquivo DAO para fazer o CRUD do filme no banco de dados
const filmeDAO = require('../../model/DAO/Filme/filme.js')

//Import de arquivos de controller
const controller_classificacao = require('../classificacao/controller_classificacao.js')

const controller_filme_genero = require('./controller_filme_genero.js')

const inserirNovoFilme = async function (filme, contentType){

    let message = JSON.parse(JSON.stringify(message_config))

    try {
        if(String(contentType).includes('application/json')){

            let validar = await validarDados(filme)

            if(validar){
                return validar
            }else{

                let result = await filmeDAO.insertFilme(filme)

                if(result){
                    filme.id = result

                    for (const genero of filme.genero){
                        let filmeGenero = {
                            "id_filme" : filme.id, 
                            "id_genero" : genero.id
                        }

                        let resultInsertGenero = await controller_filme_genero.inserirFilmeGenero(filmeGenero)

                        if(!resultInsertGenero.status){
                            return message.SUCESS_CREATED_ITEM_WARNING
                        }
                    }

                    message.DEFAULT_MESSAGE.status      = message.SUCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = filme

                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }

                return message.DEFAULT_MESSAGE
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        console.log( error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para atualizar um filme
const atualizarFilme = async function (filme, id, contentType){

    //Criando clone do objeto JSOn paea manipular a sua estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(message_config))
    

    try {
        //Validação do contente type para receber apenas Json
        // ✅ Consistente e funciona com charset
        if(String(contentType).includes('application/json')){

            //Validação para o ID correto
        let resultBuscarID = await buscarFilme(id)
        

        //Se a função buscar encontrar o filme o atributo status do JSON será verdadeiro
        //Isso seignifica que o filme existe na base, caso não retorne true, então
        //O retorno da função poderá ser um 400 ou até mesmo um 500
        if(resultBuscarID.status){
            let validar = await validarDados(filme)

            //Validação de campos obrigatórios para a atualização (Body)
            if(!validar){
                //Adiciono o atributo ID do filme no Json para ser enviado ao DAO
                filme.id = id
                

                //Chama a função do DAO para atualizar o filme (dados e o ID)
                let result = await filmeDAO.updateFilme(filme)

                if(result){

                        //Manipulação de dados na tabela de relação entre filme e genero
                        let resultDeleteGenero = await controller_filme_genero.excluirGenerosIdFilme(filme.id)

                        if(resultDeleteGenero.status){
                            //Manipulação de todos os generos relacionados com o filme
                            for (let genero of filme.generos) {
                                let filmeGenero = {
                                    "id_filme" : filme.id,
                                    "id_genero" : genero.id
                                }
                            }
                        }

                    message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCESS_UPDATED_ITEM.message
                    message.DEFAULT_MESSAGE.response = filme

                    return message.DEFAULT_MESSAGE //200 (Atualizado)
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
                }

            }else {
                return validar //400
 
            }

        }else {
            return resultBuscarID //400 ou 404 ou 500
        }

        }else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
    
}


//Função para retornar todos os filmes
const listarFilme = async function (){

    let message = JSON.parse(JSON.stringify(message_config))

    try {
        //Chama a função do DAO para retornar a lista de todos os filmes
        let result = await filmeDAO.selectAllFilme()

        //Validação para verificar se o DAO conseguiu processar os dados
        if(result){
            //Validação para verificr se existe conteúdo no Array
            if(result.length > 0){

                //Percorre o array de filmes para identificar os dados da classificação
                for(const filme of result){

                    //Busca na controller da classificação o ID referente aos dados
                    let resulClassificacao = await controller_classificacao.buscarClassificacao(filme.id_classificacao)
                    //Se a classificação for encontrada
                    if(resulClassificacao.status){
                        //Cria o atributo classificação no filme e adiciona os dados referente a classificação
                        filme.classificacao = resulClassificacao.response.classificacao

                        //Apaga o atributo id_classificação do filme para não ficar repetido
                        delete filme.id_classificacao

                    }

                    //Cria  objeto de generos relaxionados ao filme
                    let resultGenero = await controller_filme_genero.buscarGenerosPorFilme(filme.id)
                    if(resultGenero.status){
                        filme.genero = resultGenero.response.filme_genero
                    }
                }


                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.filme = result

                return message.DEFAULT_MESSAGE //200 (Dados do Filme)

            }else {
                return message.ERROR_NOT_FOUND //404
            }
        }else {
            return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)
        }
        
    } catch (error) {
        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
        
    }
}

//Função para buscar um filme pelo id 
const buscarFilme = async function(id){

    let message = JSON.parse(JSON.stringify(message_config))

    try {
        //Validação para garantir que o id seja válido
        if(id === undefined || id === null || id === '' || isNaN(id)){
            message.ERROR_BAD_RESQUEST.field = '[ID] Inválido'
            return message.ERROR_BAD_RESQUEST //400
        }else{
            let result = await filmeDAO.selectByIdFilme(id)

            if(result){
                if(result.length > 0){

                    //Percorre o array de filmes para identificar os dados da classificação
                for( const filme of result){

                    //Busca na controller da classificação o ID referente aos dados
                    let resulClassificacao = await controller_classificacao.buscarClassificacao(filme.id_classificacao)
                    //Se a classificação for encontrada
                    if(resulClassificacao.status){
                        //Cria o atributo classificação no filme e adiciona os dados referente a classificação
                        filme.classificacao = resulClassificacao.response.classificacao

                        //Apaga o atributo id_classificação do filme para não ficar repetido
                        delete filme.id_classificacao

                    }
                }

                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme = result

                    return message.DEFAULT_MESSAGE //200

                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
        
    }

    
}

//Funcao para excluir um filme
const excluirFilme = async function(id){

    let message = JSON.parse(JSON.stringify(message_config))

    try {
        //Validação do erro 400 e 404
        let resultBuscarID = await buscarFilme(id)

        //Validação para verificar se o status é verdadeiro é verdadeiro (se existe o filme)
        if(resultBuscarID.status){
            //Chamar função do DAO para excluir o fime
            let result = await filmeDAO.deleteFilme(id)

            if(result){
                return message.SUCESS_DELETED_ITEM //200 (Registro exluído)
            }else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)
            }
        }else {
            return resultBuscarID //400 ou 404
        }


    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Funcção para validar todos os dados de filmes (obrigatórios, qtde de caracteres, valor vazio, null, undefind)
const validarDados = async function(filme) {

    let message = JSON.parse(JSON.stringify(message_config))

    try {
        
        if(filme.nome == undefined || filme.nome == null ||  filme.nome == '' || filme.nome.length > 80){
            message.ERROR_BAD_RESQUEST.field = '[NOME] INVÁLIDO'
            return message.ERROR_BAD_RESQUEST //400
        
            }else if(filme.data_lancamento == undefined || filme.data_lancamento == null || filme.data_lancamento == '' || filme.data_lancamento.length != 10){
                message.ERROR_BAD_RESQUEST.field = '[DATA_LANCAMENTO] INVÁLIDA'
                return message.ERROR_BAD_RESQUEST
        
            }else if(filme.duracao == undefined || filme.duracao == null || filme.duracao == '' || filme.duracao.length < 5){
                message.ERROR_BAD_RESQUEST.field = '[DURACAO] INVÁLIDA'
                return message.ERROR_BAD_RESQUEST
        
        
            }else if(filme.sinopse == undefined || filme.sinopse == null || filme.sinopse == '' ){
                message.ERROR_BAD_RESQUEST.field = '[SINOPSE] INVÁLIDA'
                return message.ERROR_BAD_RESQUEST
        
            }else if(isNaN(filme.avaliacao)|| filme.avaliacao.length > 3){
                message.ERROR_BAD_RESQUEST.field = '[AVALIACAO] INVÁLIDA'
                return message.ERROR_BAD_RESQUEST
        
            }else if(filme.valor == '' || filme.valor == null || filme.valor.split('.')[0].length > 3 || isNaN(filme.valor)){
                message.ERROR_BAD_RESQUEST.field = '[VALOR] INVÁLIDO'
                return message.ERROR_BAD_RESQUEST
        
            }else if(filme.capa.length > 255){
                message.ERROR_BAD_RESQUEST.field = '[CAPA] INVÁLIDA'
                return message.ERROR_BAD_RESQUEST //400

                //Validação para a FK da classificação
            }else if(filme.id_classificacao == undefined || filme.id_classificacao == null || filme.id_classificacao === '' || isNaN(filme.id_classificacao) || filme.id_classificacao <=0){
                message.ERROR_BAD_RESQUEST.field = '[ID_CLASSIFICACAO] INVÁLIDO'
                return message.ERROR_BAD_RESQUEST //400

            }else{
                return false
            }

    } catch (error) {
        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


module.exports = {
    inserirNovoFilme,
    listarFilme,
    buscarFilme,
    atualizarFilme,
    excluirFilme
}