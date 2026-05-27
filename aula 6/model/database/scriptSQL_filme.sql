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
    capa varchar(255),
    id_classificacao int not null,
    
   constraint FK_FILME_CLASSIFICACAO
   foreign key (id_classificacao)
   references tbl_classificacao(id)
    
);

alter table tbl_filme 
add constraint FK_GENERO_FILME
foreign key (id_genero)
references tbl_genero(id);


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

CREATE TABLE tbl_genero (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL
);

CREATE TABLE tbl_filme_genero (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_filme int NOT NULL,
    id_genero int NOT NULL,
    
    constraint FK_FILME_FILMEGENERO
   foreign key (id_filme)
   references tbl_filme(id),
   
   constraint FK_GENERO_FILMEGENERO
   foreign key (id_genero)
   references tbl_genero(id)
);



CREATE TABLE tbl_classificacao (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sigla varchar(4) not null,
    nome VARCHAR(45) NOT NULL
);

CREATE TABLE tbl_atividade (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    atividade VARCHAR(100) NOT NULL
);

select * from tbl_classificacao;
select * from tbl_filme;