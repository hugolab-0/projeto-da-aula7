// Import do arquivo de padronização de mensagens
const message_config = require('../modulo/configMensagens.js')

// Import do DAO de atividade
const atividadeDAO = require('../../model/DAO/atividade/atividade.js')


// =========================
// FUNÇÕES DE CRUD
// =========================

// INSERT
const inserirNovaAtividade = async function(atividade, contentType) {
    let message = JSON.parse(JSON.stringify(message_config))

    try{
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(atividade)

            if(validar) {
                return validar
            }else{ 
                let result = await atividadeDAO.insertAtividade(atividade)

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
const validarDados = async function(atividade) {
    let message = JSON.parse(JSON.stringify(message_config))

    if(atividade.atividade == '' || atividade.atividade == null || atividade.atividade == undefined || atividade.atividade.length > 100) {
        message.ERROR_BAD_REQUEST.field = '[ATIVIDADE] INVALIDA'
        return message.ERROR_BAD_REQUEST
    }else {
        return false
    }
}


// UPDATE
const atualizarAtividade = async function(atividade, id, contentType) {

    let message = JSON.parse(JSON.stringify(message_config))
    
    try {
        
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscarId = await buscarAtividade(id)

            if(resultBuscarId.status) {

                let validar = await validarDados(atividade)

                if(!validar) {

                    atividade.id = id

                    let result = await atividadeDAO.updateAtividade(atividade)

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
const listarAtividades = async function() {
    let message = JSON.parse(JSON.stringify(message_config))

    try {
        let result = await atividadeDAO.selectAllAtividades()

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
const buscarAtividade = async function(id) {

    let message = JSON.parse(JSON.stringify(message_config))
    
    try {

        if(id == '' || id == null || id == undefined || isNaN(id)) {

            message.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return message.ERROR_BAD_REQUEST

        }else{

            let result = await atividadeDAO.selectByIdAtividade(id)

            if(result) {
                if(result.length > 0) {

                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.atividade = result

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
const excluirAtividade = async function(id) {

    let message = JSON.parse(JSON.stringify(message_config))
    
    try {

        let resultValidarID = await buscarAtividade(id)

        if(resultValidarID.status) {

            let result = await atividadeDAO.deleteAtividade(id)

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
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
     }
}


// EXPORT FINAL
module.exports = {
    inserirNovaAtividade,
    atualizarAtividade,
    excluirAtividade,
    buscarAtividade,
    listarAtividades
}