// Import do arquivo de padronização de mensagens (respostas padrão da aplicação)
const message_config = require('../modulo/configMensagens.js')

// Import do DAO de sexo (responsável por acessar o banco)
const sexoDAO = require('../../model/DAO/sexo/sexo.js')

// =========================
// FUNÇÕES DE CRUD
// =========================

// Função para inserir um novo sexo
const inserirNovosexo = async function(sexo, contentType) {

    // Cria uma cópia das mensagens padrão
    let message = JSON.parse(JSON.stringify(message_config))

     try {
           // Verifica se o content-type é JSON
           if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
   
               // Valida os dados
               let validar = await validarDados(sexo)
   
               // Se deu erro na validação, retorna
               if(validar) {
                   return validar
               }else{ 
                   // Insere no banco
                   let result = await sexoDAO.insertSex(sexo)
   
                   // Se deu certo
                   if(result) {
                       message.DEFAULT_MESSAGE.status = message.SUCESS_INSERT_ITEM.status
                       message.DEFAULT_MESSAGE.status_code = message.SUCESS_INSERT_ITEM.status_code
                       message.DEFAULT_MESSAGE.message = message.SUCESS_INSERT_ITEM.message
                   }
                   else{ 
                       return  message.ERROR_INTERNAL_SERVER_MODEL
                   }
   
                   return message.DEFAULT_MESSAGE
               }
           }else {
               // Content-type inválido
               return message.ERROR_CONTENT_TYPE
           }
   
       } catch (error) {
           // Erro inesperado
           return message.ERROR_INTERNAL_SERVER_CONTROLLER
       }
}


// Função de validação dos dados
const validarDados = async function(sexo) {
    let message = JSON.parse(JSON.stringify(message_config))

    // Valida nome
    if(sexo.nome == '' || sexo.nome == null || sexo.nome.length > 80 || sexo.nome == undefined) {
        message.ERROR_BAD_REQUEST.field =  '[NOME] INVALIDO'
        return message.ERROR_BAD_REQUEST
    }else {
        return false
    }
}


// Função de atualização (não implementada)
const atualizarsexo = async function(sexo, id, contentType) {
    let message = JSON.parse(JSON.stringify(message_config))
    
        try {
            
            // Verifica o content-type
            if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
    
                // Busca o filme pelo ID antes de atualizar
                let resultBuscarId = await buscarsexo(id)
    
                // Se encontrou o filme (status true)
                if(resultBuscarId.status) {
    
                    // Valida os novos dados enviados
                    let validar = await validarDados(sexo)
    
                    // Se não houver erro de validação
                    if(!validar) {
 
                        sexo.id = id

                        // Chama o DAO para atualizar os dados no banco
                        let result = await sexoDAO.updateCharacter(sexo)
    
                        // Se atualizou com sucesso
                        if(result) {
                            message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATE_ITEM.status
                            message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATE_ITEM.status_code
                            message.DEFAULT_MESSAGE.message = message.SUCESS_UPDATE_ITEM.message
    
                            return message.DEFAULT_MESSAGE
                        }else {
                            // Erro no banco
                            return message.ERROR_INTERNAL_SERVER_MODEL
                        }
    
                    }else {
                        // Retorna erro de validação
                        return validar
                    }
    
                }else {
                    // Retorna erro da busca (filme não encontrado ou erro)
                    return resultBuscarId
                }
            }else {
                // Content-type inválido
                return message.ERROR_CONTENT_TYPE //415
            }
    
        } catch (error) {
            // Erro inesperado no controller
            return message.ERROR_INTERNAL_SERVER_CONTROLLER
            
        }
}


// Função para listar personagens
const listarPersonagens = async function() {

        let message = JSON.parse(JSON.stringify(message_config))
    
        try {
            // Busca todos os personagens
            let result = await sexoDAO.selectAllSex()
    
            if(result) {
                if(result.length > 0) {
    
                    // Define sucesso
                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
    
                    // Quantidade (vai ser sobrescrita)
                    message.DEFAULT_MESSAGE.response.result = result.length
    
                    // Dados
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


// Buscar sexo por ID
const buscarsexo = async function(id) {

    let message = JSON.parse(JSON.stringify(message_config))
    
    try {
        // Validação do ID
        if(id == '' || id == null || id == undefined || isNaN(id)) {

            message.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return message.ERROR_BAD_REQUEST

        }else{
            // Busca no banco
            let result = await sexoDAO.selectByIdSex(id)

            if(result) {
                if(result.length > 0) {

                    // Sucesso
                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme = result

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


// Deletar sexo
const excluirsexo = async function(id) {

     let message = JSON.parse(JSON.stringify(message_config))
    
     try {

        // Verifica se existe
        let resultValidarID= await buscarsexo(id)

        if(resultValidarID.status) {

            // Deleta
            let result = await sexoDAO.deleteSex(id)

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
        return false
     }
}


// Exportação
module.exports = {
    inserirNovosexo,
    atualizarsexo,
    excluirsexo,
    buscarsexo,
    listarPersonagens
}