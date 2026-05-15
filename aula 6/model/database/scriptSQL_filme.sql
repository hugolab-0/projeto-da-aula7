# criando o database de filmes 
create database db_filmes_20261_a;

# indicando que vai usar 
use db_filmes_20261_a;

# criando a tabela de filmes 
create table tbl_filme(
# complementos dentro da tabela
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    data_lancamento date not null,
    duracao time not null,
    sinopse text not null,
    avaliacao decimal(3,2) default null,
    valor decimal (5,2) not null default 0,
    capa varchar(255)
);

CREATE TABLE tbl_personagem (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(40) NOT NULL
);

CREATE TABLE tbl_sexo (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(40) NOT NULL,
    sigla VARCHAR(4) NOT NULL
);



CREATE TABLE tbl_nacionalidade (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);


CREATE TABLE tbl_genero (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL
);


CREATE TABLE tbl_classificacao (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    classe VARCHAR(45) NOT NULL
);


CREATE TABLE tbl_atividade (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    atividade VARCHAR(100) NOT NULL
);

insert into tbl_personagem(nome)values(
            nome = 'teste'
        );