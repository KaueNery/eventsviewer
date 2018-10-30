const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();  
MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://knery:DiscoVoador123@ds245523.mlab.com:45523/eventsmaker"
MongoClient.connect(uri, (err,client) => {
    if (err) return console.log(err)
    db = client.db('eventsmaker')

    let port = 8000;
    app.listen(port, () => {
        console.log('Server is up and running on port numner ' + port);
    });
})

// initialize the express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

// REST routes 
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/', (req, res) => {
    var cursor = db.collection('data').find()
})

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })

    })
})

app.post('/login', (req,res) => {
    console.log(req.body)
    db.collection('data').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)    
        
        console.log('successfully saved!')
        res.redirect('/show')
    })
    
})

app.route('/edit/:id')
.get((req,res) => {
    var id = req.params.id

    db.collection('data').find(ObjectId(id)).toArray((err, result) => {
        if (err) return res.send(err)
        res.render('edit.ejs' , {data: result})
    })
})
.post((req, res) => {
    var id = req.params.id
    var email = req.params.inputEmail
    var passwrd = req.params.inputPassword 

    db.collection('data').updateOne({_id: objectId(id)},{

        $set: {
            email : email,
            password : password
        }
        } ,(err, result) => {
            if (err) return res.send(err)
            res.redirect('/show')
            console.log('Atualizando no banco de dados')
    })
})



