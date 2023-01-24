require('dotenv').config({})

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
const S3Client = require('@aws-sdk/client-s3').S3Client
const AbortMultipartUploadCommand = require('@aws-sdk/client-s3').AbortMultipartUploadCommand
const fs = require('fs')
const multer = require('multer')
const bodyParser = require('body-parser');
const { RestoreObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
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

app.get('/api/applications', (req, res) => {
    con.connect(function(err) {
        con.query("SELECT id, firstname, lastname, email FROM applications", function (err, result) {
            if (err) throw err;
            res.send(result)
        });
    });
})

app.get('/api/applications/:id', (req, res) => {
    con.connect(function(err) {
        con.query("SELECT * FROM applications WHERE id = ?", [req.params.id], function (err, result) {
            if (err) throw err;
            res.send(result)
        });
    });
})

app.post('/uploadFile', (req, res) => {
    console.log(req.body)
})

app.post('/upload', async function (req, res) {
    const file = req.body.applicationLetter
    
    const client = new S3Client({
        region: 'eu-north-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const blob = fs.readFileSync(file);

    const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: asdfsfasd.txt,
        Body: blob,
    })

    const uploadImage = await client.send(command);

    res.send({
        Location: uploadImage.Location || 'undefined',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        Bucket: process.env.BUCKET_NAME,
    })
});

app.listen(process.env.PORT || 3100, () => console.log('server is running'))
