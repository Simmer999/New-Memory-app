const mongoose = require('mongoose');
const Schema = mongoose.Schema

// const bookSchema = mongoose.Schema



const BookSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    // _id: { type: String},
  
    title: {
        type: String,
        required: true
    } ,
    author:{
        type: String,
        required: true
    } ,
    body: {
        type: String,
        required: true
    }
}, { timestamps: true})

const Book = mongoose.model('Book', BookSchema, 'Books');
// The 'Books' is important. It prevents from saving to 'books'.
module.exports = Book
// This goes to routes/books.js. (const Book = require('../models/books');)