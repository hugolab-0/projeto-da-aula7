/******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela
 *           classificacao
 * Data: 15/04/2026
 * Autor: Marcel
 * Versão: 1.0
 ******************************************************************************/

//Import da bibliioteca para gerenciar o banco de dados Mysql no node.JS
const knex = require('knex')

//Import do arquivo de configuração para conexão com o BD Mysql
const knexConfig = require('../../database_config_knex/knexFile.js')

//Criar a conexão com o BD Mysql
const knexConex = knex(knexConfig.development)

//Função para inserir dados na tabela de classificacao
const insertGenero = async function(genero){
    try {

        let sql = `insert into tbl_genero (
                            nome 
                            )
                    values (
                            '${genero.nome}'
                            );`

        //Executar o ScriptSQL no banco de dados                        
        let result = await knexConex.raw(sql)
    

        if(result)
            return result[0].insertId //Retorno o ID geraddo no BD
        else
            return false

    } catch (error) {
        //console.log(error)
        return false
    }
}

//Função para atualizar um classificacao existente na tabela
const updateGenero = async function(genero){
    try {
        //Script para atualizar os dados no BD
        let sql = `update tbl_genero set 
                        nome            = '${genero.nome}'
                       
                    where id = ${genero.id}`

        //Executa o script SQL no BD
        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para retornar todos os dados da tabela de classificacao
const selectAllGenero = async function(){
    try {
        //Script para retornar todos os classificacaos
        let sql = `select * from tbl_genero order by id desc`

        //Executa no banco de dados o script SQL para retornar os classificacaos
        let result = await knexConex.raw(sql)
        
        //Validação para verificar se o retorno no BD é um Array
        //Se o scriptSQL der erro, o banco não devolve um array
        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}


//Função para retornar os dados do classificacao filtrando pelo ID
const selectByIdGenero = async function(id){
    try {
        let sql = `select * from tbl_genero where id=${id}`

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

//Função para excluir um classificacao pelo ID
const deleteGenero = async function(id){
    try {
        let sql = `delete from tbl_genero where id=${id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertGenero,
    updateGenero,
    selectAllGenero,
    selectByIdGenero,
    deleteGenero
}
