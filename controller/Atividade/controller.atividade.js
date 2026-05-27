//Import do arquivo de padronização de mensagens
const message_config = require('../modulo/configMessages.js')

//Import do arquivo DAO para fazer o CRUD do filme no banco de dados
const atividadeDAO = require('../../model/DAO/Atividade/atividade.js')

//Função para inserir um novo Personagem
const inserirNovaAtividade = async function(atividade, contentType) {

    //Criando clone do objeto JSOn paea manipular a sua estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(message_config))

    try {
        if(String(contentType).includes('application/json')){

            let validar = await validarDados(atividade)


            if(validar){
                return validar

            }else{
                let result = await atividadeDAO.insertNewAtividade(atividade)

                if(result){ //201

                    atividade.id = result
                    message.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response = atividade

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

//Funcção para atualizar uma atividade
const atualizarAtividade = async function(atividade, id, contentType){

    //Criando clone do objeto JSOn paea manipular a sua estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(message_config))
   
    try {
        //Validação do contente type para receber apenas Json
        // Consistente e funciona com charset
        if(String(contentType).includes('application/json')){

            //Validação para o ID correto
            let resultBuscarID = await buscarAtividade(id)

            if(resultBuscarID.status){
                let validar = await validarDados(atividade)

                //Validação de campos obrigatórios para a atualização (Body)
                if(!validar){
                    //Adiciono o atributo ID do filme no Json para ser enviado ao DAO
                    atividade.id = id


                    let result = await atividadeDAO.updateAtividade(atividade)

                    if(result){
                        message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message_config.SUCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response = atividade

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
        console.log('ERRO CONTROLLER atualizarAtividade:', error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


const listarAtividades = async function() {
    
    let message = JSON.parse(JSON.stringify(message_config))

    try {
        
        let result = await atividadeDAO.selectAllAtividade()

        if(result){

            if(result.length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.atividade = result

                return message.DEFAULT_MESSAGE //200

            }else{
                return message.ERROR_NOT_FOUND //404
            }

        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)
        }

    } catch (error) {
        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


const buscarAtividade = async function(id) {
    
    let message = JSON.parse(JSON.stringify(message_config))

    try {

        if(id === undefined || id === null || id === '' || isNaN(id)){
            message.ERROR_BAD_RESQUEST.field = '[ID] Inválido'
            return message.ERROR_BAD_RESQUEST //400
        }else{
            let result = await atividadeDAO.selectByIdAtividade(id)

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
        console.log('ERRO CONTROLLER buscarAtividade:', error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


const excluirAtividade = async function(id) {
    
    let message = JSON.parse(JSON.stringify(message_config))
    
        try {
            //Validação do erro 400 e 404
            let resultBuscarID = await buscarAtividade(id)
    
            //Validação para verificar se o status é verdadeiro é verdadeiro (se existe o filme)
            if(resultBuscarID.status){
                //Chamar função do DAO para excluir o fime
                let result = await atividadeDAO.deleteAtividade(id)
    
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

const validarDados = async function(atividade) {

    let message = JSON.parse(JSON.stringify(message_config))

    try {
        if (atividade.tipo_atividade === undefined || atividade.tipo_atividade === '' || atividade.tipo_atividade === null) {
            return message_config.ERROR_REQUIRED_FIELDS // 400
        }
        return false

    } catch (error) {
        
        return message.DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirNovaAtividade,
    atualizarAtividade,
    listarAtividades,
    buscarAtividade,
    excluirAtividade,
    validarDados
}