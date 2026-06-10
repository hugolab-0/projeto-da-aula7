//Padronização de cabeçalho de retorno dos endpoints para API
const DEFAULT_MESSAGE = {
    api_description: 'API para gerenciar o controle de filmes',
    desenvolvedor: 'Geovane Merçon Santos',
    Version: '1.0.4.26',
    status: false,
    status_code: 0,
    response: {}
}

//Mensagens de erro da API
const ERROR_BAD_RESQUEST               = {
    status: false,
    status_code: 400,
    message: 'Os dados enviados na requisição não estão corretos.'
}

const ERROR_INTERNAL_SERVER_MODEL      = {
    status: false,
    status_code: 500,
    message: 'Não foi possivel processar a requisição por conta de erro na API [ERRO NA MODELAGEM DE DADOS]'
}

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message: 'Não foi possivel processar a requisição por conta de erro na API [ERRO NA CONTROLLER]'
}

const ERROR_CONTENT_TYPE = {
    status: false,
    status_code: 415,
    message: 'Não foi possivel processar a requisição pois o formato de dados aceito pela API é somente JSON.'
}

const ERROR_NOT_FOUND = {
    status: false,
    status_code: 404,
    message: 'Não foi encontrado nenhum dado para retorno.'
}

//Mensagens de sucesso
const SUCESS_CREATED_ITEM = {
    status: true,
    status_code: 201,
    message: 'Registro inserido com sucesso!'
}

const SUCESS_CREATED_ITEM_WARNING = {
    status: true,
    status_code: 201,
    message: 'Os dados principais foram inseridos com sucesso, porém alguns apresentaram problema!'
}

const SUCESS_RESPONSE = {
    status: true,
    status_code: 200
}

const SUCESS_UPDATED_ITEM = {
    status: true,
    status_code: 200,
    message: 'Registro atualizado com sucesso!'
}

const SUCESS_DELETED_ITEM = {
    status: true,
    status_code: 200,
    message: 'Registro excluído com sucesso!'
}

module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_RESQUEST,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCESS_CREATED_ITEM,
    SUCESS_CREATED_ITEM_WARNING,
    SUCESS_RESPONSE,
    SUCESS_UPDATED_ITEM,
    SUCESS_DELETED_ITEM
}