// Import do arquivo de padronização de mensagens
const message_config = require('../modulo/configMensagens.js')

// Import do DAO de nacionalidade
const nacionalidadeDAO = require('../../model/DAO/nacionalidade/nacionalidade.js')


// =========================
// FUNÇÕES DE CRUD
// =========================

// INSERT
const inserirNovaNacionalidade = async function(nacionalidade, contentType) {
    let message = JSON.parse(JSON.stringify(message_config))

    try{
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(nacionalidade)

            if(validar) {
                return validar
            }else{ 
                let result = await nacionalidadeDAO.insertNacionalidade(nacionalidade)

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
const validarDados = async function(nacionalidade) {
    let message = JSON.parse(JSON.stringify(message_config))

    if(nacionalidade.nome == '' || nacionalidade.nome == null || nacionalidade.nome == undefined || nacionalidade.nome.length > 50) {
        message.ERROR_BAD_REQUEST.field = '[NOME] INVALIDO'
        return message.ERROR_BAD_REQUEST
    }else {
        return false
    }
}


// UPDATE
const atualizarNacionalidade = async function(nacionalidade, id, contentType) {

    let message = JSON.parse(JSON.stringify(message_config))
    
    try {
        
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscarId = await buscarNacionalidade(id)

            if(resultBuscarId.status) {

                let validar = await validarDados(nacionalidade)

                if(!validar) {

                    nacionalidade.id = id

                    let result = await nacionalidadeDAO.updateNacionalidade(nacionalidade)

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
const listarNacionalidades = async function() {
    let message = JSON.parse(JSON.stringify(message_config))

    try {
        let result = await nacionalidadeDAO.selectAllNacionalidades()

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
const buscarNacionalidade = async function(id) {

    let message = JSON.parse(JSON.stringify(message_config))
    
    try {

        if(id == '' || id == null || id == undefined || isNaN(id)) {

            message.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return message.ERROR_BAD_REQUEST

        }else{

            let result = await nacionalidadeDAO.selectByIdNacionalidade(id)

            if(result) {
                if(result.length > 0) {

                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.nacionalidade = result

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
const excluirNacionalidade = async function(id) {

    let message = JSON.parse(JSON.stringify(message_config))
    
    try {

        let resultValidarID = await buscarNacionalidade(id)

        if(resultValidarID.status) {

            let result = await nacionalidadeDAO.deleteNacionalidade(id)

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
    inserirNovaNacionalidade,
    atualizarNacionalidade,
    excluirNacionalidade,
    buscarNacionalidade,
    listarNacionalidades
}