//Impor da biblioteca para gereniciar o banco de dados MySQL no node.js
const knex = require('knex')

//Import do arquivo de configiração para conexão com o banco de dados MySQL
const knexConfig = require('../../database_config_knex/knexFile.js')

//Criar a conexão com o banco de dados MySQL
const knexConex = knex(knexConfig.development)


//Função para inserir dados na tabela de personagem
const insertNewGenero = async function(genero) {

    try {
        const sql = `insert into tbl_genero (nome) values ('${genero.nome}')`
        const result = await knexConex.raw(sql)

        return result[0].insertId || false

    } catch (error) {
        console.log('Erro ao inserir um genero: ', error)
        return false
    }
}


//Função para atualizar um personagem existente na tabela
const updateGenero = async function(genero) {

    try {
        
        let sql = `update tbl_genero set
        nome =        '${genero.nome}'
        where id =     '${genero.id}';`

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
const selectAllGenero = async function() {
    try {
        
        let sql = `select * from tbl_genero order by id desc`

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
const selectByIdGenero = async function(id) {
    
    try {
        
        let sql = `select * from tbl_genero where id= ?`

        let result = await knexConex.raw(sql, [id])

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
        
    } catch (error) {
        console.log('Erro ao buscar Genero por ID: ', error)
        return false
    }
}


//Função para excluir uma atividade pelo ID
const deleteGenero = async function(id) {
    try {
        let sql = `delete from tbl_genero where id=${id}`

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
    insertNewGenero,
    updateGenero,
    selectAllGenero,
    selectByIdGenero,
    deleteGenero
}