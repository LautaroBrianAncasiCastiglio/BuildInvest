CREATE TABLE user {
    username varchar(16),
    email varchar(255),
    password varchar(255),
    create_time timestamp
}

CREATE TABLE architect {
    idarchitect int auto_increment,
    complete_name varchar(70),
    dni varchar(10),
    n_matricula varchar(45),
    email varchar(255),
}