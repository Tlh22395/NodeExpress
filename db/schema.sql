create database if not exists burgers_db;
use burgers_db;

drop table if exists burgers;

create table burgers (
	id int not null auto_increment,
	burger_name varchar(255) not null,
	ate bool default false,
	primary key (id)
);