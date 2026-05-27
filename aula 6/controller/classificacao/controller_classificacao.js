// Import do arquivo de padronização de mensagens (respostas padrão da aplicação)
const message_config = require('../modulo/configMensagens.js')

// Import do DAO de classificacao
const classificacaoDAO = require('../../model/DAO/classificacao/classificacao.js')


// =========================
// FUNÇÕES DE CRUD
// =========================

// Inserir
const inserirNovaClassificacao = async function(classificacao, contentType) {

    let message = JSON.parse(JSON.stringify(message_config))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(classificacao)

            if(validar) {
                return validar
            }else{
                let result = await classificacaoDAO.insertClassificacao(classificacao)

                if(result) {
                    message.DEFAULT_MESSAGE.status = message.SUCESS_INSERT_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_INSERT_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCESS_INSERT_ITEM.message
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }

                return message.DEFAULT_MESSAGE
            }

        }else{
            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


// Validação
const validarDados = async function(classificacao) {
    let message = JSON.parse(JSON.stringify(message_config))

    if(classificacao.sigla == '' || classificacao.sigla == null || classificacao.sigla.length > 4 || classificacao.sigla == undefined){
        message.ERROR_BAD_REQUEST.field = '[SIGLA] INVALIDA'
        return message.ERROR_BAD_REQUEST
    }

    if(classificacao.nome == '' || classificacao.nome == null || classificacao.nome.length > 45 || classificacao.nome == undefined){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVALIDO'
        return message.ERROR_BAD_REQUEST
    }

    return false
}


// Atualizar
const atualizarClassificacao = async function(classificacao, id, contentType) {

    let message = JSON.parse(JSON.stringify(message_config))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscar = await buscarClassificacao(id)

            if(resultBuscar.status) {

                let validar = await validarDados(classificacao)

                if(!validar) {

                    classificacao.id = id

                    let result = await classificacaoDAO.updateClassificacao(classificacao)

                    if(result) {
                        message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATE_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATE_ITEM.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCESS_UPDATE_ITEM.message

                        return message.DEFAULT_MESSAGE
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else{
                    return validar
                }

            }else{
                return resultBuscar
            }

        }else{
            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


// Listar
const listarClassificacao = async function() {

    let message = JSON.parse(JSON.stringify(message_config))

    try {
        let result = await classificacaoDAO.selectAllClassificacao()

        if(result) {
            if(result.length > 0) {

                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.result = result

                return message.DEFAULT_MESSAGE

            }else{
                return message.ERROR_NOT_FOUND
            }

        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


// Buscar por ID
const buscarClassificacao = async function(id) {

    let message = JSON.parse(JSON.stringify(message_config))

    try {
        if(id == '' || id == null || id == undefined || isNaN(id)) {

            message.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return message.ERROR_BAD_REQUEST

        }else{

            let result = await classificacaoDAO.selectByIdClassificacao(id)

            if(result) {
                if(result.length > 0) {

                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.result = result

                    return message.DEFAULT_MESSAGE

                }else{
                    return message.ERROR_NOT_FOUND
                }

            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


// Deletar
const excluirClassificacao = async function(id) {

    let message = JSON.parse(JSON.stringify(message_config))

    try {

        let validar = await buscarClassificacao(id)

        if(validar.status) {

            let result = await classificacaoDAO.deleteClassificacao(id)

            if(result) {
                message.DEFAULT_MESSAGE.status = message.SUCESS_DELETE_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_DELETE_ITEM.status_code
                message.DEFAULT_MESSAGE.message = message.SUCESS_DELETE_ITEM.message

                return message.DEFAULT_MESSAGE
            }else{
                return message.ERROR_BAD_REQUEST
            }

        }else{
            return validar
        }

    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


// Exportação
module.exports = {
    inserirNovaClassificacao,
    atualizarClassificacao,
    excluirClassificacao,
    buscarClassificacao,
    listarClassificacao
}