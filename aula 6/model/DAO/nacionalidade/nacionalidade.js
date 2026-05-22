// Import do knex (conexão com banco)
const knex = require('knex')

// Configuração do banco
const knexConfig = require('../../database_config_knex/knexFile.js')

// Conexão com banco
const knexConex = knex(knexConfig.development)


// ======================== INSERT ========================

const insertNacionalidade = async function(nacionalidade) {
    try {

        let sql = `insert into tbl_nacionalidade(nome) values (
        '${nacionalidade.nome}'
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

const updateNacionalidade = async function(nacionalidade){

    try {
        let sql = `update tbl_nacionalidade set 
        nome = '${nacionalidade.nome}'
        where id = '${nacionalidade.id}';`

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

const selectAllNacionalidades = async function(){
    try {
        let sql = `select * from tbl_nacionalidade order by id desc;`

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

const selectByIdNacionalidade = async function(id){
    try {
        let sql =  `select * from tbl_nacionalidade where id=${id};`

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

const deleteNacionalidade = async function(id){

    try {
        let sql =  `delete from tbl_nacionalidade where id = ${id};`

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
    insertNacionalidade,
    updateNacionalidade,
    selectAllNacionalidades,
    selectByIdNacionalidade,
    deleteNacionalidade
}