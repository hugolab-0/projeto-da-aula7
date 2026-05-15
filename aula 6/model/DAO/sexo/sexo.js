const knex = require('knex')

const knexConfig = require('../../database_config_knex/knexFile.js')

const knexConex = knex(knexConfig.development)

const insertSex = async function(sex){
    try {
        let sql = `insert into tbl_sexo(nome, sigla)values(
                                            '${sex.nome}',
                                            '${sex.sigla}'
                                            );`
    
    
        let result = await knexConex.raw(sql)
    
        if(result){
            return result[0].insertId
        } else {
            return false
        }
     } catch (error) {
        return false
     }
}


// ======================== UPDATE ========================

// Atualiza personagem
const updateSex = async function(sex){

  try {
        let sql = `update tbl_personagem set nome = '${sex.nome}', 
                                             sigla = '${sex.sigla}'
                                              where id = '${sex.id}';`

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
const selectAllSex = async function(){
    try {
        // Query SQL para selecionar todos os registros da tabela
        // "order by id desc" ordena do maior ID para o menor (mais recente primeiro)
        let sql = `select * from tbl_sexo;`

        // Executa a query no banco
        let result = await knexConex.raw(sql)
        
        // Verifica se o retorno é um array (formato esperado do knex)
        if(Array.isArray(result)){
            // O resultado real vem na posição [0]
            return result[0]
        }else{
            // Caso não seja array, considera erro
            return false
        }
    } catch (error) {
        // Em caso de erro, retorna false
        return false
    }
}


// ======================== SELECT BY ID ========================

// Busca por ID
const selectByIdSex = async function(id){
    try {
        // Query SQL para buscar um registro filtrando pelo ID
        let sql =  `select * from tbl_sexo where id=${id}`

        // Executa no banco
        let result = await knexConex.raw(sql)

        // Verifica se retornou array
        if(Array.isArray(result)) {
            return result[0]
        }else {
            return false
        }

    } catch (error) {
        // Em caso de erro, retorna false
        return false
    }
}


// ======================== DELETE ========================

// Deleta por ID
const deleteSex = async function(id){

    try {
        let sql =  `delete from tbl_sexo where id= ${id};`
    
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
    insertSex,
    updateSex,
    selectAllSex,
    selectByIdSex,
    deleteSex
}