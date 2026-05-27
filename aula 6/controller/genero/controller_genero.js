/*********************************************************************************************************
 * Objetivo: Arquivo responsavel pela validação , tratamento e
 *      manipulacao de dados para o CRUD de filmes
 * Data: 08/05/2026
 * Autor: Geovane
 * Versão: 1.0
 *********************************************************************************************************/

//Import do arquivo de padronização de mensagens
const message_config = require('../modulo/configMessages.js')

//Import do arquivo DAO para fazer o CRUD do filme no banco de dados
const generoDAO = require('../../model/DAO/genero/genero.js')


//Função para inserir um novo Sexo
const inserirGenero = async function(genero, contentType) {

    //Criando clone do objeto JSOn paea manipular a sua estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(message_config))

    try {
        if(String(contentType).includes('application/json')){

            let validar = await validarDados(genero)


            if(validar){
                return validar

            }else{
                let result = await generoDAO.insertNewGenero(genero)

                if(result){ //201

                    sexo.id = result
                    message.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response = genero

                }else {
                    return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)
                }

                return message.DEFAULT_MESSAGE
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
        
    } catch (error) {

        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}

const atualizarGenero = async function(genero, id, contentType) {

     //Criando clone do objeto JSOn paea manipular a sua estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(message_config))
       
    try {
        //Validação do contente type para receber apenas Json
        //Consistente e funciona com charset
        if(String(contentType).includes('application/json')){
    
            //Validação para o ID correto
            let resultBuscarID = await buscarGenero(id)
    
            if(resultBuscarID.status){
                let validar = await validarDados(genero)
    
                //Validação de campos obrigatórios para a atualização (Body)
                if(!validar){
                    //Adiciono o atributo ID do filme no Json para ser enviado ao DAO
                    genero.id = id
    
    
                    let result = await generoDAO.updateGenero(genero)
    
                    if(result){
                        message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message_config.SUCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response = genero
    
                        return message.DEFAULT_MESSAGE //200 (Atualizado)
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
                    }
    
                }else{
                    return validar //400
                }
            }else{
                return resultBuscarID //400 ou 404 ou 500
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        console.log('ERRO CONTROLLER atualizar genero:', error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const listarGenero = async function() {
    let message = JSON.parse(JSON.stringify(message_config))

    try {
      
      let result = await generoDAO.selectAllGenero()

      if(result){

          if(result.length > 0){
              message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
              message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
              message.DEFAULT_MESSAGE.response.count = result.length
              message.DEFAULT_MESSAGE.response.genero = result

              return message.DEFAULT_MESSAGE //200

          }else{
              return message.ERROR_NOT_FOUND //404
          }

      }else{
          return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)
      }

    } catch (error) {
        console.error("Erro ao listar genero:", error.message);
      return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarGenero = async function(id) {
    
    let message = JSON.parse(JSON.stringify(message_config))
    
    try {
    
        if(id === undefined || id === null || id === '' || isNaN(id)){
            message.ERROR_BAD_RESQUEST.field = '[ID] Inválido'

            return message.ERROR_BAD_RESQUEST //400

        }else{
            let result = await generoDAO.selectByIdGenero(id)
    
            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response = result
    
                    return message.DEFAULT_MESSAGE //200
    
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
            }
        }
    } catch (error) {
        console.log('ERRO CONTROLLER buscarGenero:', error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const excluirGenero = async function(id) {
     let message = JSON.parse(JSON.stringify(message_config))
        
            try {
                //Validação do erro 400 e 404
                let resultBuscarID = await buscarGenero(id)
        
                //Validação para verificar se o status é verdadeiro é verdadeiro (se existe o filme)
                if(resultBuscarID.status){
                    //Chamar função do DAO para excluir o fime
                    let result = await generoDAO.deleteGenero(id)
        
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

const validarDados = async function(genero) {

    let message = JSON.parse(JSON.stringify(message_config))

    try {
        if (genero.nome === undefined || genero.nome === '' || genero.nome === null) {
            return message_config.ERROR_REQUIRED_FIELDS // 400
        }
        return false

    } catch (error) {
        
        return message.DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirGenero,
    atualizarGenero,
    listarGenero,
    buscarGenero,
    excluirGenero,
    validarDados
}