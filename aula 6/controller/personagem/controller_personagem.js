// Import do arquivo de padronização de mensagens (respostas padrão da aplicação)
const message_config = require('../modulo/configMensagens.js')

// Import do DAO de personagem (responsável por acessar o banco)
const personagemDAO = require('../../model/DAO/personagem/personagem.js')


// =========================
// FUNÇÕES DE CRUD
// =========================

// Função para inserir um novo personagem
const inserirNovoPersonagem = async function(personagem, contentType) {

    // Cria uma cópia das mensagens padrão
    let message = JSON.parse(JSON.stringify(message_config))

     try {
           // Verifica se o content-type é JSON
           if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
   
               // Valida os dados
               let validar = await validarDados(personagem)
   
               // Se deu erro na validação, retorna
               if(validar) {
                   return validar
               }else{ 
                   // Insere no banco
                   let result = await personagemDAO.insertCharacter(personagem)
   
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
const validarDados = async function(personagem) {
    let message = JSON.parse(JSON.stringify(message_config))

    // Valida nome
    if(personagem.nome == '' || personagem.nome == null || personagem.nome.length > 80 || personagem.nome == undefined) {
        message.ERROR_BAD_REQUEST.field =  '[NOME] INVALIDO'
        return message.ERROR_BAD_REQUEST
    }else {
        return false
    }
}


// Função de atualização (não implementada)
const atualizarPersonagem = async function(personagem, id, contentType) {
    let message = JSON.parse(JSON.stringify(config_message))
    
        try {
            
            // Verifica o content-type
            if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
    
                // Busca o filme pelo ID antes de atualizar
                let resultBuscarId = await buscarFilme(id)
    
                // Se encontrou o filme (status true)
                if(resultBuscarId.status) {
    
                    // Valida os novos dados enviados
                    let validar = await validarDados(personagem)
    
                    // Se não houver erro de validação
                    if(!validar) {
    
                        // Adiciona o ID ao objeto filme para enviar ao DAO
                        filme.id = id
    
                        // Chama o DAO para atualizar os dados no banco
                        let result = await personagemDAO.updateCharacter(personagem)
    
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
            let result = await personagemDAO.selectAllCharacter()
    
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


// Buscar personagem por ID
const buscarPersonagem = async function(id) {

    let message = JSON.parse(JSON.stringify(message_config))
    
    try {
        // Validação do ID
        if(id == '' || id == null || id == undefined || isNaN(id)) {

            message.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return message.ERROR_BAD_REQUEST

        }else{
            // Busca no banco
            let result = await personagemDAO.selectByIdCharacter(id)

            console.log(result)

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


// Deletar personagem
const excluirPersonagem = async function(id) {

     let message = JSON.parse(JSON.stringify(message_config))
    
     try {

        // Verifica se existe
        let resultValidarID= await buscarPersonagem(id)

        if(resultValidarID.status) {

            // Deleta
            let result = await personagemDAO.deleteCharacter(id)

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
    inserirNovoPersonagem,
    atualizarPersonagem,
    excluirPersonagem,
    buscarPersonagem,
    listarPersonagens
}