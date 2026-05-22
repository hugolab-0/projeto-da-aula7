// Import do knex (conexão com banco)
const knex = require('knex')

// Configuração do banco
const knexConfig = require('../../database_config_knex/knexFile.js')

// Conexão com banco
const knexConex = knex(knexConfig.development)


// ======================== INSERT ========================

const insertFilmeGenero = async function(generoFilme) {
    try {

        let sql = `insert into tbl_filme_genero(id_filme, id_genero)
                   values (
                   '${generoFilme.id_filme}',
                   '${generoFilme.id_genero}'
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

const updateFilmeGenero = async function(generoFilme){
    try {

        let sql = `update tbl_filme_genero set
                   id_filme = '${generoFilme.id_filme}',
                   id_genero = '${generoFilme.id_genero}'
                   where id = '${generoFilme.id}';`

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

const selectAllFilmeGeneros = async function(){
    try {

        let sql = `select * from tbl_filme_genero order by id desc;`

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

const selectByIdFilmeGenero = async function(id){
    try {

        let sql =  `select * from tbl_filme_genero where id=${id};`

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

const selectByIdGenero = async function(idGenero){
    try {
        let sql =  `select tbl_filme.*
                    from tbl_filme
                        inner join tbl_filme_genero 
                            on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero
                            where tbl_genro.id=${idGenero};`

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

const selectByIdFilme = async function(idFilme){
    try {
        let sql =  `select tbl_filme.*
                    from tbl_filme
                        inner join tbl_filme_genero 
                            on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero
                            where tbl_filme.id=${idFilme};`

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

const deleteFilmeGenero = async function(id){
    try {

        let sql =  `delete from tbl_filme_genero where id = ${id};`

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
    insertFilmeGenero,
    updateFilmeGenero,
    selectAllFilmeGeneros,
    selectByIdFilmeGenero,
    deleteFilmeGenero,
    selectByIdGenero,
    selectByIdFilme
}