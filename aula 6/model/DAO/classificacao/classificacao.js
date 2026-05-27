const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)


// INSERT
const insertClassificacao = async function(classificacao){
    try {

        let sql = `insert into tbl_classificacao(sigla, nome) values(
            '${classificacao.sigla}',
            '${classificacao.nome}'
        );`

        let result = await knexConex.raw(sql)

        if(result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        return false
    }
}


// UPDATE
const updateClassificacao = async function(classificacao){
    try {

        let sql = `update tbl_classificacao set 
            sigla = '${classificacao.sigla}',
            nome = '${classificacao.nome}'
        where id = '${classificacao.id}';`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}


// SELECT ALL
const selectAllClassificacao = async function(){
    try {

        let sql = `select * from tbl_classificacao order by id desc;`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}


// SELECT BY ID
const selectByIdClassificacao = async function(id){
    try {

        let sql = `select * from tbl_classificacao where id=${id};`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}


// DELETE
const deleteClassificacao = async function(id){
    try {

        let sql = `delete from tbl_classificacao where id=${id};`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}


module.exports = {
    insertClassificacao,
    updateClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao,
    deleteClassificacao
}