create table Authors (
    id serial primary key,
    firstname varchar(50) not null,
    lastname varchar(50) not null,
    DOB date,
    country varchar(50)
);

create table Books (
    id serial primary key,
    title varchar(255) not null,
    authorid Integer references Authors(id),
    publisher varchar(255),
    published date,
    category varchar(50),
    ISBN varchar(50),
    language varchar(30) not null
);

create table Users (
    id serial primary key,
    useremail varchar(255) not null,
    password varchar(255) not null,
    firstname varchar(50) not null,
    lastname varchar(50) not null,
    createdDate date not null
);

create table Comments (
    id serial primary key,
    bookid Integer references Books(id) not null,
    postingDate date not null,
    userid Integer references Users(id) not null
    body varchar(1024) not null
);

