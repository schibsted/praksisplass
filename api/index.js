var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "application-database",
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
});

const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send(JSON.stringify({
        name: 'test'
    }))
})

app.post('/sendData', (req, res) => {
    console.log(req.body)
    let data = req.body
    con.connect(function(err) {
        var sql = "INSERT INTO applications (firstname, lastname, email, phoneNumber, school, study) VALUES ?";
        var values = [[data.firstname, data.lastname, data.email, data.phoneNumber, data.school, data.study]]
        con.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });
})

app.put('/sendData', (req, res) => {
    

})

app.listen(process.env.PORT || 3100, () => console.log('server is running'))

// const sqlStmt = mysql.statement("INSERT INTO customers (name, address) VALUES (?, ?);");

// ?something=something

// ?something=something\';DELETE FROM customers;SELECT from customers where something=

// "insert into customers where name='a' and something='" + something + "'";

// sqlStmt.exec(['value1', 'value2']);