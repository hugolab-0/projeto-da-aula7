//Impor da biblioteca para gereniciar o banco de dados MySQL no node.js
const knex = require('knex')

//Import do arquivo de configiração para conexão com o banco de dados MySQL
const knexConfig = require('../../database_config_knex/knexFile.js')


//Criar a conexão com o banco de dados MySQL
const knexConex = knex(knexConfig.development)

//Função para inserir dados na tabela de sexo
const insertNewSexo = async function(sexo) {

    try {
        const sql = `insert into tbl_sexo (sigla, descricao) values ('${sexo.sigla}', '${sexo.descricao}')`
        const result = await knexConex.raw(sql)

        return result[0].insertId || false

    } catch (error) {
        console.log('Erro ao inserir um novo sexo: ', error)
        return false
    }
}

//Função para atualizar o sexo existente na tabela
const updateSexo = async function(sexo) {

    try {
        
        let sql = `update tbl_sexo set
        sigla =         '${sexo.sigla}',
        descricao =     '${sexo.descricao}'
        where id =      '${sexo.id}';`

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
const selectAllSexo = async function () {
    try {
        const sql = `select * from tbl_sexo order by id desc`;
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
const selectByIdSexo = async function(id) {
    
    try {
        
        let sql = `select * from tbl_sexo where id= ?`

        let result = await knexConex.raw(sql, [id])

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
        
    } catch (error) {
        console.log('Erro ao buscar sexo por ID: ', error)
        return false
    }
}


//Função para excluir um personagem pelo ID
const deleteSexo = async function(id) {
    try {
        let sql = `delete from tbl_sexo where id=${id}`

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
    insertNewSexo,
    selectAllSexo,
    selectByIdSexo,
    updateSexo,
    deleteSexo
}