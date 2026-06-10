//Impor da biblioteca para gereniciar o banco de dados MySQL no node.js
const knex = require('knex')

//Import do arquivo de configiração para conexão com o banco de dados MySQL
const knexConfig = require('../../database_config_knex/knexFile.js')


//Criar a conexão com o banco de dados MySQL
const knexConex = knex(knexConfig.development)

//Função para inserir dados na tabela de sexo
const insertNewNacionalidade = async function(nacionalidade) {

    try {
        const sql = `insert into tbl_nacionalidade (nacionalidade) values ('${nacionalidade.nacionalidade}')`
        const result = await knexConex.raw(sql)

        return result[0].insertId || false

    } catch (error) {
        console.log('Erro ao inserir uma nova nacionalidade: ', error)
        return false
    }
}

//Função para atualizar o sexo existente na tabela
const updateNacionalidade = async function(nacionalidade) {

    try {
        
        let sql = `update tbl_nacionalidade set
        nacionalidade =     '${nacionalidade.nacionalidade}'
        where id =          '${nacionalidade.id}';`

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


// Função para retornar todos os registros da tabela de sexo
const selectAllNacionalidade = async function () {
    try {
        const sql = `select * from tbl_nacionalidade order by id desc`;
        const result = await knexConex.raw(sql);

        if (Array.isArray(result) && result[0].length > 0) {
            return result[0];
        }

        return [];

    } catch (error) {
        console.error("Erro ao buscar registros em tbl_sexo:", error.message);
        return [];
    }
};


//Função para retornar os dados do personagem fitrando pelo ID
const selectByIdNacionalidade = async function(id) {
    
    try {
        
        let sql = `select * from tbl_nacionalidade where id=${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
        
    } catch (error) {
        console.log('Erro ao buscar nacionalidade por ID: ', error)
        return false
    }
}


//Função para excluir um personagem pelo ID
const deleteNacionalidade = async function(id) {
    try {
        let sql = `delete from tbl_nacionalidade where id=${id}`

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
    insertNewNacionalidade,
    updateNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade,
    deleteNacionalidade
}