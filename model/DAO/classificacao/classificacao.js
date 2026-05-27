//Impor da biblioteca para gereniciar o banco de dados MySQL no node.js
const knex = require('knex')

//Import do arquivo de configiração para conexão com o banco de dados MySQL
const knexConfig = require('../../database_config_knex/knexFile.js')


//Criar a conexão com o banco de dados MySQL
const knexConex = knex(knexConfig.development)

//Função para inserir dados na tabela de personagem
const insertclassification = async function(classificacao) {

    try {
        let sql = `insert into tbl_classificacao (
            tipo,
            nome,
            descricao 
            )
        values(
            '${classificacao.tipo}',
            '${classificacao.nome}',
            '${classificacao.descricao}'
            );`

        let result = await knexConex.raw(sql)

        return result[0].insertId || false

    } catch (error) {
        console.log('Erro ao inserir uma classificacao: ', error)
        return false
    }
}


//Função para atualizar um personagem existente na tabela
const updateClassification = async function(classificacao) {

    try {
        
        let sql = `update tbl_classificacao set
		    tipo =          '${classificacao.tipo}',
            nome =          '${classificacao.nome}',
            descricao =     '${classificacao.descricao}'
            where id =      '${classificacao.id}';`

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
const selectAllClassification = async function() {
    try {
        
        let sql = `select * from tbl_classificacao order by id desc;`

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


//Função para retornar os dados do personagem fitrando pelo ID
const selectByIdClassification = async function(id) {
    
    try {
        
        let sql = `select * from tbl_classificacao where id = ?;`

        let result = await knexConex.raw(sql, [id])

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
        
    } catch (error) {
        console.log('Erro ao buscar classificacao por ID: ', error)
        return false
    }
}


//Função para excluir uma classificação pelo ID
const deleteClassification = async function(id) {
    try {
        let sql = `delete from tbl_classificacao where id=${id}`

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
    insertclassification,
    updateClassification,
    selectAllClassification,
    selectByIdClassification,
    deleteClassification
}