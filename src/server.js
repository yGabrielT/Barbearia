const express = require('express');
const path = require('path');
var mysql = require('mysql2');

var queryresult;


const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: 'dbbarbearia'
});

con.connect(function(err) {
    if (err) throw err;
});
/*
con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM tbcliente", function (err, result, fields) 
    {
      if (err) throw err;
      console.log(result);
      queryresult = result;
    });
  });
*/
const app = express();

app.use(express.static(path.join(__dirname)));

app.use('/assetsFotos', express.static(path.join(__dirname, '../assetsFotos')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/sql', (req,res) => {
    const id = req.query.id;
    console.log(`Received ID: ${id}`);

    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    const query = 'SELECT * FROM tbcliente WHERE id_cliente = ?';
    
    con.query(query, [id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
    
});

app.get('/sql/inputUser', (req,res) => {
  const { nome, data, email, senha, tel} = req.query;
  

  if (!nome || !data || !email || !senha || !tel) {
      return res.status(400).json({ error: 'values are required' });
  }

  const query = 'INSERT INTO tbcliente (nome, email, data_nasc, telefone, senha) VALUE (?,?,?,?,?)';
  
  con.query(query, [nome, email, data, tel, senha], (err, result) => {
      if (err) throw err;
      console.log(result);
      res.json(result);
  });
  
}); 

app.get('/sql/inputAgendamento', (req,res) => {
    const {id_cliente, data_corte, desc_corte} = req.query;


    if (!id_cliente || !data_corte || !desc_corte) {
        return res.status(400).json({ error: 'values are required' });
    }

    const query = 'INSERT INTO tbagendamentos (id_cliente, data_corte, desc_corte) VALUE (?,?,?)';

    con.query(query, [id_cliente, data_corte, desc_corte], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });

}); 

app.get('/sql/selectCliente', (req,res) => {
    const {email} = req.query;


    if (!email) {
        return res.status(400).json({ error: 'values are required' });
    }

    const query = 'SELECT id_cliente from tbcliente where email = (?)';

    con.query(query, [email], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });

}); 

app.get('/sql/selectAgendamentos', (req,res) => {


    const query = 'SELECT tbcliente.nome,tbagendamentos.desc_corte,tbagendamentos.data_corte from tbcliente,tbagendamentos';

    con.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });

}); 

app.listen(8080, () => {
    console.log('Server esta escutando no porto 8080');
});
