// Import do knex (conexão com banco)
const knex = require('knex')

// Configuração do banco
const knexConfig = require('../../database_config_knex/knexFile.js')

// Conexão com banco
const knexConex = knex(knexConfig.development)


// ======================== INSERT ========================

const insertAtividade = async function(atividade) {
    try {

        let sql = `insert into tbl_atividade(atividade) values (
        '${atividade.atividade}'
        )`

        let result = await knexConex.raw(sql)

        if(result) {
            return result[0].insertId
        }else {
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}


// ======================== UPDATE ========================

const updateAtividade = async function(atividade){

    try {
        let sql = `update tbl_atividade set 
        atividade = '${atividade.atividade}'
        where id = '${atividade.id}';`

        let result = await knexConex.raw(sql)

        if(result) {
            return true
        }else{
            return false
        }
        
    } catch (error) {
        console.log(error)
        return false
    }
}


// ======================== SELECT ALL ========================

const selectAllAtividades = async function(){
    try {
        let sql = `select * from tbl_atividade order by id desc;`

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


// ======================== SELECT BY ID ========================

const selectByIdAtividade = async function(id){
    try {
        let sql =  `select * from tbl_atividade where id=${id};`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)) {
            return result[0]
        }else {
            return false
        }

    } catch (error) {
        return false
    }
}


// ======================== DELETE ========================

const deleteAtividade = async function(id){

    try {
        let sql =  `delete from tbl_atividade where id = ${id};`

        let result = await knexConex.raw(sql)

        if(result) {
            return true 
        }else {
            return false
        }
    } catch (error) {
        return false
    }
}


// EXPORT FINAL
module.exports = {
    insertAtividade,
    updateAtividade,
    selectAllAtividades,
    selectByIdAtividade,
    deleteAtividade
}