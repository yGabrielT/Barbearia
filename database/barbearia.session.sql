CREATE TABLE tbcliente(
    id_cliente INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    data_nasc DATE NOT NULL,
    telefone INT UNSIGNED NOT NULL,
    senha VARCHAR(255) NOT NULL
);
CREATE TABLE tbagendamentos(
    id_agenda INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT UNSIGNED NOT NULL,
    data_corte DATETIME NOT NULL,
    desc_corte VARCHAR(255) NOT NULL
);
ALTER TABLE
    tbagendamentos ADD FOREIGN KEY(id_cliente) REFERENCES tbcliente(id_cliente);

-- @block
INSERT INTO tbcliente (nome,email,data_nasc,telefone,senha) values
('João', 'joao12345@gmail.com','2001-01-21',111111111,'senha1234');

-- @block
SELECT * FROM tbagendamentos

-- @block
SELECT * FROM tbcliente

-- @block
SELECT tbcliente.nome,tbagendamentos.desc_corte,tbagendamentos.data_corte from tbcliente,tbagendamentos