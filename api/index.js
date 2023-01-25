require('dotenv').config({})
const express = require('express')
const cors = require('cors');
const S3Client = require('@aws-sdk/client-s3').S3Client
const fs = require('fs')
const bodyParser = require('body-parser');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { ListObjectsCommand, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const app = express()
const multer = require("multer");
const upload = multer({ dest: "uploads/" });


var mysql = require('mysql');
const { send } = require('process');
const { get } = require('http');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "application-database",
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
});

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/listBucketData', async (req, res) => {
    const client = new S3Client({
        region: 'eu-north-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const command = new ListObjectsCommand({
        Bucket: process.env.BUCKET_NAME,
        Delimiter: '/',
    })

    const objects = await client.send(command);
    res.send(objects.Contents.map(file => file))
})

app.get('/get-school-and-study',  (req, res) => {
    con.connect(function(err, result) {
        con.query("SELECT school FROM Schools", function (err, result) {
            if (err) throw err
            res.send(result)
        })
    })
})

app.get('/get-file-url', async (req, res) =>{
    const applicationId = req.query.applicationid
    
    database("SELECT fileKey FROM File WHERE Application_id=?", [applicationId], async function(result){
        const urls = []
        for (let i = 0; i < result.length; i++) {
            const url = await getFIleUrl(result[i].fileKey)
            urls.push(url)
        }
    
        res.send((urls))
     });
})

const getFIleUrl = async (key) => {
    const client = new S3Client({
        region: 'eu-north-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    
    const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
    });
    
    const url = {url: await getSignedUrl(client, command, { expiresIn: 3600 })}
    return url
}

app.get('/get-schools', (req, res) => {
    database("SELECT name FROM School", function(result){
        res.send(result)
    })
})

app.get('get-counties', (req, res) => {
    database("SELECT name FROM County", function(result){
        res.send(result)
    })
})

app.get('/get-subject-areas', (req, res) => {
    database("SELECT * FROM SubjectArea", [], function(result){
        res.send(result)
    })
})

app.get('/get-positions', (req, res) => {
    database("SELECT * FROM Position", [], function(result){
        res.send(result)
    })
})

app

const database = (sql, values, callback) => {
    con.connect(function(err) {
        con.query(sql, values, function (err, result) {
            if (err) throw err
            return callback(result)
        })
    })
}


// uploads data filled out in in the form -------------------------------------------------------------------------------------
app.post('/send-form', upload.array('files'), (req, res) => {
    uploadToDatabase(req.body, req.files)

    let resultHandler = function (err) {
        if (err) {
            console.log("unlink failed", err);
        } else {
            console.log("file deleted");
        }
    }

    req.files.forEach(file => {
        const [fileName, filePath, fileType] = [file.filename, file.path, file.mimetype]
        thowFileInBucket(fileName, filePath, fileType)
        fs.unlink(filePath, resultHandler);
    });

    console.log('1 application submitted')
    res.end(JSON.stringify('ok'))
});

// sends data to the database
const uploadToDatabase = async (data, files) => {
    con.connect(function(err) {
        // var sql = "INSERT INTO Application (firstname, lastname, email, tel, School_id, Study_id) VALUES (?, ?, ?, ?, (SELECT id FROM School WHERE name=?), )";
        var sql = "INSERT INTO Application (firstname, lastname, email, tel, schoolOrgnr, subjectId, positionId) VALUES (?, ?, ?, ?, ?, ?, ?)";

        var values = [data.firstname, data.lastname, data.email, data.tel, data.school, data.subject, data.position]
        con.query(sql, values, function (err, result) {
            if (err) throw err;
        });
        
        var sql = "INSERT INTO File (filename, fileKey, Application_id) VALUES (?, (SELECT (id) FROM Application WHERE id=(SELECT max(id) FROM Application)))"
        
        files.forEach(file => {
            var values = [file.originalname, withFileExtension(file.filename, file.mimetype)]

            con.query(sql, [values], function (err, result) {
                if (err) throw err;
            });
        });
    });    
};

// uploads files to s3
async function thowFileInBucket(fileName, filePath, fileType) {    
    const client = new S3Client({
        region: 'eu-north-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const blob = fs.readFileSync(filePath);

    console.log(fileType)

    const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: withFileExtension(fileName, fileType),
        ContentType: fileType,
        Body: blob,
    })

    const uploadImage = await client.send(command);
};

const withFileExtension = (fileName, fileType) => {
    switch (fileType) {
        case 'application/pdf':
            return `${fileName}.pdf`
        default:
            return fileName
    }
}

app.listen(process.env.PORT || 3100, () => console.log('server is running'))
