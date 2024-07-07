Before running this project please ensure to create the mysql tables as below

three tables are interconnected to eachother as

(1 = One, M = Many)
category (1 to M) subcategory
subcategory (1 to M) product

1) users table

create table users(uid int auto_increment primary key, email varchar(256), password varchar(256));

3) category table

create table category(cid int auto_increment primary key, cname varchar(256), image varchar(256), status varchar(20) default 'active'
check (status in ('active', 'inactive')), sequence int);

4) subcategory table

create table subcategory(sid int auto_increment primary key, scname varchar(256), status varchar(20) default 'active'
check (status in ('active', 'inactive')), sequence int, cid int, FOREIGN KEY (cid) REFERENCES category(cid));

6) product table

create table product(pid int auto_increment primary key, productName varchar(256), status varchar(20) default 'active'
check (status in ('active', 'inactive')), sid int, FOREIGN KEY (sid) REFERENCES subcategory(cid));
