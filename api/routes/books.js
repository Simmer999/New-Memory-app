const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


const mongoose = require('mongoose')
// .set('debug', true)
const db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error'))
db.once('open', (callback) => {
    console.log('Connected to MongoDB. line 11 api/routes/books.js.')
})

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const Book = require('../models/books');

const Books = db.collection('Books')    //These are the names of the collections in the database.


//==================================================================== GETs 
router.get('/books', (req, res) => {
    res.render('newPages/newBook')
})

router.get('/newBook', (req, res) => {
    Books.find().toArray()
    .then(results =>{
        res.render('newBook', { entries : results})
    })
    .catch(error => console.error(error))
})
//==================================================================== GETs
//==================================================== Code for BookList
router.get('/BookList', (req, res) => { 
    Books.find().toArray()
        .then(results => {
            res.render('BookList', { entries : results})
        })
        .catch(error => console.error(error))
    })
//==================================================== Code for BookList
//==================================================== Code for bookPresentaion
router.get('/bookPresentation', (req, res) => {
    db.collection('Books')
    .find()
    .toArray()
    .then(results => {
        //In order to print the contents of the database to the console:
        // console.log(results)
        res.render('bookPresentation', { Books: results })  
    })
    .catch(error => console.error(error))
})
//==================================================== Code for bookPresentaion
//==================================================== Code for bookDetails
router.get('/Books/:id', (req, res) => {
    const id = req.params.id 
    console.log(id)
    // db.collection('Books').find( { } ).toArray()
    Book.findById(id)
    .then(result => {  
    res.render('bookDetails', { Book: result }) 
    console.log(result)
    })
    .catch(err => {
    console.log(err)   
})
})
//==================================================== Code for bookDetails


//==================================================== POST for newBook
router.post('/newbook', (req, res) => {
    const book = new Book(req.body)
    book.save()
    .then((result) => {
        res.render('directory')
    })
    .catch(err => {
        console.log(err)   
    })
})
//==================================================== POST for newBook


module.exports = router;














//==================================================== POST for newBook
// router.post('/newbook', (req, res ) => {
//     const title = req.body.title;
//     const author = req.body.author;
//     const body = req.body.body;
  
//     const data = {
//         "title": title,
//         "author": author,
//         "body": body
//     }
//     db.collection('Books').insertOne(data,function(err, collection){
//         if (err) throw err;
//         console.log("Record inserted Successfully");
//         return res.render('corePages/directory');    
//         // return res.redirect('corePages/directory') 
//     });
// })
//==================================================== POST for newBook

