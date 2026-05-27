//Import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

//Import do arquivo DAO para fazer o CRUD do genero no banco de dados
const filmeGeneroDAO = require('../../model/DAO/filme_genero/filme_genero.js')

//Função para inserir um novo genero
const inserirNovoFilmeGenero = async function(filmeGenero){
   
    //Criando um clone do objeto JSON para manipular a sua estrutura local sem
    //modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))
    
    try {
            //Validação de dados para os atributos do genero (Status 400)
            let validar = await validarDados(filmeGenero)

            //Se a função validar retornar um Json de erro, iremos devolver ao 
            // APP o erro
            if(validar){
                return validar //400
            }else{
                //Encaminha os dados do genero para o DAO
                let result = await filmeGeneroDAO.insertFilmeGenero(filmeGenero)

                if(result){ //201
                    //Criando o atributo ID no JSON do genero e colocando
                    // o ID gerado após o insert
                    filmeGenero.id = result

                    message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response = filmeGenero

                    return message.DEFAULT_MESSAGE
                }else{ //500
                    return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)
                }
                
            }
    } catch (error) {
        // console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

//Função para atualizar um genero
const atualizarFilmeGenero = async function(filmeGenero, id)
{
    let message = JSON.parse(JSON.stringify(config_message))

    try {
       
            //Validação para o ID incorreto
            let resultBuscarID = await buscarFilmeGenero(id)

            //Se a função buscar encontrar o genero o atributo status do JSON será verdadeiro
            //Isso significa que o genero existe na base, caso não retorne true, então 
            //o retorno da função poderá ser um 400 ou 404 ou até mesmo um 500
            if(resultBuscarID.status){
                let validar = await validarDados(filmeGenero)

                //Validação de campos obrigatórios para a atualização (Body)
                if(!validar){
                    //Adiciono o atributo ID do genero no JSON para ser enviado ao DAO
                    filmeGenero.id = id

                    //Chama a função do DAO para atualizar o genero (dados e o ID)
                    let result = await filmeGeneroDAO.updateFilmeGenero(filmeGenero)

                    if(result){
                        message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = filmeGenero
                         
                        return message.DEFAULT_MESSAGE //200 (Atualizado)

                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                }else{
                    return validar //400
                }
            }else{
                return resultBuscarID //400 ou 404 ou 500
            }
            
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (Controller)
    }
}

//Função para retornar todos os generos
const listarFilmeGenero = async function(){
    
    //Criando um clone do objeto JSON para manipular a sua estrutura local sem
    //modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //Chama a função do DAO para retornar a lista de todos os generos
        let result = await filmeGeneroDAO.selectAllFilmeGenero()

        //Validação para verificar se o DAO conseguiu processar os dados
        if(result){
            //Validação para verificar se existe conteúdo no array
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.filme_genero = result

                return message.DEFAULT_MESSAGE //200 (Dados do genero)
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

//Função para buscar um genero pelo ID
const buscarFilmeGenero = async function(id){
    
    //Criando um clone do objeto JSON para manipular a sua estrutura local sem
    //modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))
    
    try {
        //Validaçção para garantir que o ID seja válido
        if(id == undefined || id == '' || id == null ||  isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST //400
        }else{
            let result = await filmeGeneroDAO.selectByIdFilmeGenero(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme_genero = result

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

//Função para buscar um genero pelo ID
const buscarFilmeIdGenero = async function(idGenero){
    
    //Criando um clone do objeto JSON para manipular a sua estrutura local sem
    //modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))
    
    try {
        //Validaçção para garantir que o ID seja válido
        if(idGenero == undefined || idGenero == '' || idGenero == null ||  isNaN(idGenero)){
            message.ERROR_BAD_REQUEST.field = '[ID_GENERO] INVÁLIDO'
            return message.ERROR_BAD_REQUEST //400
        }else{
            let result = await filmeGeneroDAO.selectFilmesByIdGenero(idGenero)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme_genero = result

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

//Função para buscar um genero pelo ID
const buscarGeneroIdFilme = async function(idFilme){
    
    //Criando um clone do objeto JSON para manipular a sua estrutura local sem
    //modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))
    
    try {
        //Validaçção para garantir que o ID seja válido
        if(idFilme == undefined || idFilme == '' || idFilme == null ||  isNaN(idFilme)){
            message.ERROR_BAD_REQUEST.field = '[ID_GENERO] INVÁLIDO'
            return message.ERROR_BAD_REQUEST //400
        }else{
            let result = await filmeGeneroDAO.selectGenerosByIdFilme(idFilme)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme_genero = result

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

//Função para excluir um genero
const excluirFilmeGenero = async function(id){

    let message = JSON.parse(JSON.stringify(config_message))
    
    try {
        //Validação do erro 400 e 404
        let resultBuscarID = await buscarFilmeGenero(id)

        //Validação para verificar se o status é verdadeiro(se existe o genero)
        if(resultBuscarID.status){
            //Chamar a função do DAO para excluir o genero
            let result = await filmeGeneroDAO.deleteFilmeGenero(id)

            if(result){
                return message.SUCCESS_DELETED_ITEM //200 (Registro excluído)
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
            }
        }else{
            return resultBuscarID //400 ou 404
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

//Função para excluir os generos relacionados com o filme
const excluirGenerosIdFilme = async function(idFilme){

    let message = JSON.parse(JSON.stringify(config_message))
    
    try {
        //Chamar a função do DAO para excluir o genero
        let result = await filmeGeneroDAO.deleteGenerosByIdFilme(idFilme)

        if(result){
            return message.SUCCESS_DELETED_ITEM //200 (Registro excluído)
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
        }
       
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

//Função para validar todos os dados de genero 
// (obrigatórios, qtde de caracteres, etc)
const validarDados = async function(filmeGenero){

    // console.log(genero.valor.split('.')[0].length)
    //Cria um clone da const de mensagebs
    let message = JSON.parse(JSON.stringify(config_message))

    if(filmeGenero.id_filme == undefined || filmeGenero.id_filme == '' || filmeGenero.id_filme == null || isNaN(filmeGenero.id_filme)){
        message.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST //400
    }else if(filmeGenero.id_genero == undefined || filmeGenero.id_genero == '' || filmeGenero.id_genero == null || isNaN(filmeGenero.id_genero)){
        message.ERROR_BAD_REQUEST.field = '[ID_GENERO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST //400
    }else{
        return false
    }
}

module.exports = {
    inserirNovoFilmeGenero,
    listarFilmeGenero,
    buscarFilmeGenero,
    buscarFilmeIdGenero,
    buscarGeneroIdFilme,
    atualizarFilmeGenero,
    excluirFilmeGenero,
    excluirGenerosIdFilme
}