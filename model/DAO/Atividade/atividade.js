//Impor da biblioteca para gereniciar o banco de dados MySQL no node.js
const knex = require('knex')

//Import do arquivo de configiração para conexão com o banco de dados MySQL
const knexConfig = require('../../database_config_knex/knexFile.js')

//Criar a conexão com o banco de dados MySQL
const knexConex = knex(knexConfig.development)


//Função para inserir dados na tabela de personagem
const insertNewAtividade = async function(atividade) {

    try {
        const sql = `insert into tbl_atividade (tipo_atividade) values (?)`
        const result = await knexConex.raw(sql, [atividade.tipo_atividade])

        return result[0].insertId || false

    } catch (error) {
        console.log('Erro ao inserir um atividade: ', error)
        return false
    }
}


//Função para atualizar um personagem existente na tabela
const updateAtividade = async function(atividade) {

    try {
        
        let sql = `update tbl_atividade set
        tipo_atividade =        '${atividade.tipo_atividade}'
        where id =              '${atividade.id}';`

        let result = await knexConex.raw(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        console.log(error);
        
        return false
    }
}


//Função para retornar todos os dados da tabela de pesonagem
const selectAllAtividade = async function() {
    try {
        
        let sql = `select * from tbl_atividade order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }

    } catch (error) {
        
        return false
    }
}


//Função para retornar os dados da atividade fitrando pelo ID
const selectByIdAtividade = async function(id) {
    
    try {
        
        let sql = `select * from tbl_atividade where id= ?`

        let result = await knexConex.raw(sql, [id])

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
        
    } catch (error) {
        console.log('Erro ao buscar atividade por ID: ', error)
        return false
    }
}


//Função para excluir uma atividade pelo ID
const deleteAtividade = async function(id) {
    try {
        let sql = `delete from tbl_atividade where id=${id}`

        let result = await knexConex.raw(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        
        return false
    }
    
}

module.exports = {
    insertNewAtividade,
    updateAtividade,
    selectAllAtividade,
    selectByIdAtividade,
    deleteAtividade
}