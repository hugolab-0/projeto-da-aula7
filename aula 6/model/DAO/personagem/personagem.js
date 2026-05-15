// Import do knex (conexão com banco)
const knex = require('knex')

// Configuração do banco
const knexConfig = require('../../database_config_knex/knexFile.js')

// Conexão com banco
const knexConex = knex(knexConfig.development)


// ======================== INSERT ========================

// Insere personagem
const insertCharacter = async function(Character){
    try {
        
        let sql = `insert into tbl_personagem(nome)value(
            '${Character.nome}'
        );`

        let result = await knexConex.raw(sql)

        if(result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}


// ======================== UPDATE ========================

// Atualiza personagem
const updateCharacter = async function(Character){

    try {
        let sql = `update tbl_personagem set nome = '${Character.nome}' where id = '${Character.id}';`

        let result = await knexConex.raw(sql)

        if(result) {
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}


// ======================== SELECT ALL ========================

// Lista todos
const selectAllCharacter = async function(){
    try {
        let sql = `select * from tbl_personagem order by id desc;`

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

// Busca por ID
const selectByIdCharacter = async function(id){
    try {
        let sql =  `select * from tbl_personagem where id=${id};`

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

// Deleta por ID
const deleteCharacter = async function(id){

    try {
        let sql =  `delete from tbl_personagem where id= ${id};`

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


// Exportação
module.exports = {
    insertCharacter,
    updateCharacter,
    selectAllCharacter,
    selectByIdCharacter,
    deleteCharacter
}