// INSERT
// Import do arquivo de padronização de mensagens
const message_config = require('../modulo/configMensagens.js')

// Import do DAO de genero
const filmeGeneroDAO = require('../../model/DAO/filme_genero/filme_genero.js')


// =========================
// FUNÇÕES DE CRUD
// =========================

// INSERT
const inserirFilmeGenero = async function(filmeGenero) {
    let message = JSON.parse(JSON.stringify(message_config))

    try{
            let validar = await validarDados(filmeGenero)

            if(validar) {
                return validar
            }else{ 
                let result = await filmeGeneroDAO.insertFilmeGenero(filmeGenero)

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
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


// VALIDAÇÃO
const validarDados = async function(filmeGenero) {
    let message = JSON.parse(JSON.stringify(message_config))

    if(filmeGenero.id_filme == '' || filmeGenero.id_filme == null || filmeGenero.id_filme == undefined || isNaN(filmeGenero.id_filme)) {
        message.ERROR_BAD_REQUEST.field = '[ID_FILME] INVALIDO'
        return message.ERROR_BAD_REQUEST
    }if(filmeGenero.id_genero == '' || filmeGenero.id_genero == null || filmeGenero.id_genero == undefined || isNaN(filmeGenero.id_genero)) {
        message.ERROR_BAD_REQUEST.field = '[ID_GENERO] INVALIDO'
        return message.ERROR_BAD_REQUEST
    }else {
        return false
    }
}


// UPDATE
const atualizarFilmeGenero = async function(filmeGenero, id) {

    let message = JSON.parse(JSON.stringify(message_config))
    
    try {
        
       

            let resultBuscarId = await buscarFilmeGenero(id)

            if(resultBuscarId.status) {

                let validar = await validarDados(filmeGenero)

                if(!validar) {

                    filmeGenero.id = id

                    let result = await filmeGeneroDAO.updateFilmeGenero(filmeGenero, id)

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

    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


// SELECT ALL
const listarFilmeGeneros = async function() {
    let message = JSON.parse(JSON.stringify(message_config))

    try {
        let result = await filmeGeneroDAO.selectAllFilmeGeneros()

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
const buscarFilmeGenero = async function(id) {

    let message = JSON.parse(JSON.stringify(message_config))
    
    try {

        if(id == '' || id == null || id == undefined || isNaN(id)) {

            message.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return message.ERROR_BAD_REQUEST

        }else{

            let result = await filmeGeneroDAO.selectByIdFilmeGenero(id)

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

const buscarFilmeIdGenero = async function(idGenero) {

    let message = JSON.parse(JSON.stringify(message_config))
    
    try {

        if(idGenero == '' || idGenero == null || idGenero == undefined || isNaN(idGenero)) {

            message.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return message.ERROR_BAD_REQUEST

        }else{

            let result = await filmeGeneroDAO.selectByIdGenero(id)

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

const buscarGeneroIdFilme = async function(idGenero) {

    let message = JSON.parse(JSON.stringify(message_config))
    
    try {

        if(idGenero == '' || idGenero == null || idGenero == undefined || isNaN(idGenero)) {

            message.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return message.ERROR_BAD_REQUEST

        }else{

            let result = await filmeGeneroDAO.selectByIdFilme(id)

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
const excluirFilmeGenero = async function(id) {

    let message = JSON.parse(JSON.stringify(message_config))
    
    try {

        let resultValidarID = await buscarFilmeGenero(id)

        if(resultValidarID.status) {

            let result = await filmeGeneroDAO.deleteFilmeGenero(id)

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


// EXPORT FINAL (COMMONJS)
module.exports = {
    inserirFilmeGenero,
    atualizarFilmeGenero,
    excluirFilmeGenero,
    buscarFilmeGenero,
    listarFilmeGeneros,
    buscarFilmeIdGenero,
    buscarGeneroIdFilme
}