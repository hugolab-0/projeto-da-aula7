/**
 * Objetivo: arquivo responsavel pela configuração e padronização das mensagens da API
 * Data: 17-04-2026
 * autor: hugo
 * versão: 1.0
 **/

// ======================== PADRÃO DE RESPOSTA ========================
// Este objeto serve como BASE para todas as respostas da API.
// Ele garante que todas as respostas sigam o mesmo formato (padronização),
// facilitando o entendimento tanto no backend quanto no frontend.

const DEFAULT_MESSAGE = {
    api_description: 'API para gerenciar o controle de filmes',
    development: 'Hugo Alves Vieira',
    version: '1.0.4.26',

    status: false,
    status_code: 0,
    response: {}
}

const ERROR_BAD_REQUEST = {
    status: false,
    status_code: 400,
    message:'Os dados enviados na requisição não estão corretos...'
}

const SUCESS_CREATED_ITEM = {
    status: true,
    status_code: 201,
    message: 'Registro inserido com sucesso.'
}

const SUCESS_CREATED_ITEM_WARNIG = {
    status: true,
    status_code: 201,
    message: 'Os dados principais foram inseridos com sucesso, porém alguns dados apresentaram problema.'
}

const SUCESS_INSERT_ITEM = {
    status: true,
    status_code: 201,
    message: 'Registro inserido com sucesso.'
}

const ERROR_INTERNAL_SERVER_MODEL = {
    status: false,
    status_code: 500,
    message:'Não foi possível processar a requisição por conta de erro na modelagem de dados.'
}

const ERROR_CONTENT_TYPE = {
    status: false,
    status_code: 415,
    message:'Não foi possível processar a requisição, pois o formato aceito pela API é somente JSON.'
}

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message:'Não foi possível processar a requisição por conta de erro no controller.'
}

const ERROR_NOT_FOUND = {
    status: false,
    status_code: 404,
    message:'Nenhum dado foi encontrado.'
}

const SUCESS_RESPONSE = {
    status: true,
    status_code: 200
}

const SUCESS_UPDATE_ITEM = {
    status: true,
    status_code: 200,
    message: 'Registro atualizado com sucesso!'
}

const SUCESS_DELETE_ITEM = {
    status: true,
    status_code: 200,
    message: 'Item excluído com sucesso!'
}

module.exports = {
    ERROR_BAD_REQUEST,
    SUCESS_CREATED_ITEM,
    DEFAULT_MESSAGE,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_NOT_FOUND,
    SUCESS_RESPONSE,
    SUCESS_UPDATE_ITEM,
    SUCESS_DELETE_ITEM,
    SUCESS_INSERT_ITEM,
    SUCESS_CREATED_ITEM_WARNIG
}

