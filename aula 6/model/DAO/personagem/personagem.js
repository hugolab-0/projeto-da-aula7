const knex = require('knex')

// Import do arquivo de configuração que contém as credenciais e parâmetros de conexão com o banco
const knexConfig = require('../../database_config_knex/knexFile.js')

// Cria a conexão com o banco de dados utilizando as configurações do ambiente "development"
const knexConex = knex(knexConfig.development)

// função para inserir dados no banco
const insertNewCaracte = async function() {
    try {
        
    } catch (error) {
        
    }
}

// função para atulizar alguma informação no banco
const updateCaracter = async function() {
    
}

// função
const selectAllCaracters = async function() {
    
}

const selectByIdCaracter = async function() {
    
}

const deleteCaracter = async function() {
    
}