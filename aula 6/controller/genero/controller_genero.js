// INSERT
// Import do arquivo de padronização de mensagens
const message_config = require('../modulo/configMensagens.js')

// Import do DAO de genero
const generoDAO = require('../../model/DAO/genero/genero.js')


// =========================
// FUNÇÕES DE CRUD
// =========================

// INSERT
const inserirNovoGenero = async function(genero, contentType) {
    let message = JSON.parse(JSON.stringify(message_config))

    try{
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(genero)

            if(validar) {
                return validar
            }else{ 
                let result = await generoDAO.insertGenero(genero)

                if(result) {
                    message.DEFAULT_MESSAGE.status = message.SUCESS_INSERT_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_INSERT_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCESS_INSERT_ITEM.message
                }
                else{ 
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
                return message.DEFAULT_MESSAGE
            }

        }else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


// VALIDAÇÃO
const validarDados = async function(genero) {
    let message = JSON.parse(JSON.stringify(message_config))

    if(genero.nome == '' || genero.nome == null || genero.nome == undefined || genero.nome.length > 45) {
        message.ERROR_BAD_REQUEST.field = '[NOME] INVALIDO'
        return message.ERROR_BAD_REQUEST
    }else {
        return false
    }
}


// UPDATE
const atualizarGenero = async function(genero, id, contentType) {

    let message = JSON.parse(JSON.stringify(message_config))
    
    try {
        
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscarId = await buscarGenero(id)

            if(resultBuscarId.status) {

                let validar = await validarDados(genero)

                if(!validar) {

                    genero.id = id

                    let result = await generoDAO.updateGenero(genero)

                    if(result) {
                        message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATE_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATE_ITEM.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCESS_UPDATE_ITEM.message

                        return message.DEFAULT_MESSAGE
                    }else {
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else {
                    return validar
                }

            }else {
                return resultBuscarId
            }
        }else {
            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


// SELECT ALL
const listarGeneros = async function() {
    let message = JSON.parse(JSON.stringify(message_config))

    try {
        let result = await generoDAO.selectAllGeneros()

        if(result) {
            if(result.length > 0) {

                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.result = result

                return message.DEFAULT_MESSAGE

            }else {
                return message.ERROR_NOT_FOUND
            }

        }else {
            return message.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


// SELECT BY ID
const buscarGenero = async function(id) {

    let message = JSON.parse(JSON.stringify(message_config))
    
    try {

        if(id == '' || id == null || id == undefined || isNaN(id)) {

            message.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return message.ERROR_BAD_REQUEST

        }else{

            let result = await generoDAO.selectByIdGenero(id)

            if(result) {
                if(result.length > 0) {

                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.genero = result

                    return message.DEFAULT_MESSAGE
                }else {
                    return message.ERROR_NOT_FOUND
                }
            }else {
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }
        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


// DELETE
const excluirGenero = async function(id) {

    let message = JSON.parse(JSON.stringify(message_config))
    
    try {

        let resultValidarID = await buscarGenero(id)

        if(resultValidarID.status) {

            let result = await generoDAO.deleteGenero(id)

            if(result) {
                message.DEFAULT_MESSAGE.status = message.SUCESS_DELETE_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_DELETE_ITEM.status_code
                message.DEFAULT_MESSAGE.message = message.SUCESS_DELETE_ITEM.message

                return message.DEFAULT_MESSAGE
            }else {
                return message.ERROR_BAD_REQUEST
            }

        }else {
            return resultValidarID
        }
     } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
     }
}


// EXPORT FINAL (COMMONJS)
module.exports = {
    inserirNovoGenero,
    atualizarGenero,
    excluirGenero,
    buscarGenero,
    listarGeneros
}