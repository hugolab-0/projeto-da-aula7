// Import do knex (conexão com banco)
const knex = require('knex')

// Configuração do banco
const knexConfig = require('../../database_config_knex/knexFile.js')

// Conexão com banco
const knexConex = knex(knexConfig.development)


// ======================== INSERT ========================

const insertGenero = async function(genero) {
    try {

        let sql = `insert into tbl_genero(nome) values (
        '${genero.nome}'
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

const updateGenero = async function(genero){

    try {
        let sql = `update tbl_genero set 
        nome = '${genero.nome}'
        where id = '${genero.id}';`

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

const selectAllGeneros = async function(){
    try {
        let sql = `select * from tbl_genero order by id desc;`

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

const selectByIdGenero = async function(id){
    try {
        let sql =  `select * from tbl_genero where id=${id};`

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

const deleteGenero = async function(id){

    try {
        let sql =  `delete from tbl_genero where id = ${id};`

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
    insertGenero,
    updateGenero,
    selectAllGeneros,
    selectByIdGenero,
    deleteGenero
}