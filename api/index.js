require('dotenv').config({})
const express = require('express')
const cors = require('cors');
const S3Client = require('@aws-sdk/client-s3').S3Client
const AbortMultipartUploadCommand = require('@aws-sdk/client-s3').AbortMultipartUploadCommand
const fs = require('fs')
const bodyParser = require('body-parser');
const { ListObjectsCommand, PutObjectCommand, AbortMultipartUploadOutputFilterSensitiveLog } = require('@aws-sdk/client-s3');
const app = express()
const multer = require("multer");
const upload = multer({ dest: "uploads/" });


var mysql = require('mysql');

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
    res.send(objects.Contents.map(file => file.Key).join('<br/>'))
})

// uploads data filled out in in the form
app.post('/upload', upload.array('files'), (req, res) => {
    uploadToDatabase(req.body, req.files)

    req.files.forEach(file => {
        const [fileName, filePath, fileType] = [file.filename, file.path, file.mimetype]
        thowFilesInBucket(fileName, filePath, fileType)
        fs.unlink(file.path, resultHandler);
    });
});

let resultHandler = function (err) {
    if (err) {
        console.log("unlink failed", err);
    } else {
        console.log("file deleted");
    }
}

// sends data to the database
const uploadToDatabase = async (data, files) => {
    con.connect(function(err) {
        var sql = "INSERT INTO Applications (firstname, lastname, email, phoneNumber, school, study) VALUES ?";
        var values = [[data.firstname, data.lastname, data.email, data.phoneNumber, data.school, data.study]]
        con.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });

        files.forEach(file => {
            var sql = "INSERT INTO Files (filename, application) VALUES (?, (SELECT (id) FROM Applications WHERE id=(SELECT max(id) FROM Applications)))"
            var values = [[file.filename]]
    
            con.query(sql, [values], function (err, result) {
                if (err) throw err;
                console.log("1 file inserted");
            });
        });
    });    
};

// uploads files to s3
async function thowFilesInBucket(fileName, filePath, fileType) {    
    const client = new S3Client({
        region: 'eu-north-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const blob = fs.readFileSync(filePath);

    const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
        Body: blob,
        ContentType: fileType,
    })

    const uploadImage = await client.send(command);
};

app.listen(process.env.PORT || 3100, () => console.log('server is running'))
