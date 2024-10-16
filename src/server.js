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

app.listen(8080, () => {
    console.log('Server esta escutando no porto 8080');
});
