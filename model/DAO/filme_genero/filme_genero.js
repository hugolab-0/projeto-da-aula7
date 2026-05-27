//Impor da biblioteca para gereniciar o banco de dados MySQL no node.js
const knex = require('knex')

//Import do arquivo de configiração para conexão com o banco de dados MySQL
const knexConfig = require('../../database_config_knex/knexFile.js')

//Criar a conexão com o banco de dados MySQL
const knexConex = knex(knexConfig.development)


//Função para inserir dados na tabela de personagem
const insertFilmeGenero = async function(filmeGenero) {

    try {
        let sql = `insert into tbl_filme_genero(id_filme, id_genero) 
                    values ('${filmeGenero.id_filme}',
                            '${filmeGenero.id_genero}');`

        const result = await knexConex.raw(sql)

        return result[0].insertId || false

    } catch (error) {
        console.log('Erro ao inserir um genero: ', error)
        return false
    }
}


//Função para atualizar um personagem existente na tabela
const updateFilmeGenero = async function(filmeGenero) {

    try {
        
        let sql = `update tbl_filme_genero set
        id_filme =     '${filmeGenero.id_filme}',
        id_genero =     '${filmeGenero.id_genero}'
        where id =     '${filmeGenero.id}';`

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


//Função para retornar todos os dados da tabela de pesonagem
const selectAllFilmeGenero = async function() {
    try {
        
        let sql = `select * from tbl_filme_genero order by id desc`

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

const selectByIdFilmeGenero = async function(id) {
    
    try {
        
        let sql = `select * from tbl_filme_genero where id=${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
        
    } catch (error) {
        console.log('Erro ao buscar filme genero por ID: ', error)
        return false
    }
}

//Função para retornar os dados da atividade fitrando pelo ID
const selectByIdGenero = async function(idGenero) {
    
    try {
        
        let sql =   `select tbl_genero.*
                        from tbl_filme
                            inner join tbl_filme_genero
                                on tbl_filme.id = tbl_filme_genero.id_filme 
                            inner join tbl_genero
                                on tbl_genero.id = tbl_filme_genero.id_genero
                    where tbl_genero.id=${idGenero}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
        
    } catch (error) {
        console.log('Erro ao buscar Genero por ID: ', error)
        return false
    }
}

//Função para retornar os dados da atividade fitrando pelo ID
const selectByIdFilme = async function(idFilme) {
    
    try {
        
        let sql =   `select tbl_genero.*
                        from tbl_filme
                            inner join tbl_filme_genero
                                on tbl_filme.id = tbl_filme_genero.id_filme 
                            inner join tbl_genero
                                on tbl_genero.id = tbl_filme_genero.id_genero
                    where tbl_filme.id=${idFilme}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
        
    } catch (error) {
        console.log('Erro ao buscar Genero por ID: ', error)
        return false
    }
}


//Função para excluir uma atividade pelo ID
const deleteGenero = async function(idGenero) {
    try {
        let sql = `delete from tbl_filme_genero where id=${idGenero}`

        let result = await knexConex.raw(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
    
}

//Função para excluir os generos filtrando pelo id do filme
//Essa função será utilzada no Update do filme, pois precisa apagar todos os generos relacionados com o filme para inserir as novas relações
//Função para excluir os generos filtrando pelo id do filme
//Essa função será utilzada no Update do filme, pois precisa apagar todos os generos relacionados com o filme para inserir as novas relações
const deleteGenerosByIdFilme = async function(idFilme) {
    try {
        let sql = `
            delete from tbl_filme_genero where id_filme = ${idFilme}`
        let result = await knexConex.raw(sql)

        if(result){
            return true
        }else{
            return false
        }

    } catch (error) {

        console.log(error)

        return false
    }
}


module.exports = {
    insertFilmeGenero,
    updateFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    selectByIdGenero,
    selectByIdFilme,
    deleteGenero,
    deleteGenerosByIdFilme
}