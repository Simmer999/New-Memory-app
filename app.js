require('dotenv').config()



const express = require('express')
const app = express()
const router = express.Router()
const ejs = require('ejs')
const path = require('path')
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')


const mongoose = require('mongoose')
mongoose.connect(process.env.DB, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
const db = mongoose.connection
db.on('error', console.log.bind(console, 'connection error'))
db.once('open', (callback) => {
    console.log('Connected to MongoDB. line 24 app.js')
})


app.set('view engine', 'ejs')
app.set('views', (path.join(__dirname, 'views')))
app.use(expressEjsLayout)
app.use(express.urlencoded({ extended : false }))
app.use(flash())
app.use(session({
    secret : 'secret', 
    resave : true, 
    saveUninitialized : true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error.msg')
    res.locals.error = req.flash('error')
    next()
})



require('./api/config/passport')(passport)
const bookRoutes = require('./api/routes/books')
app.use('/', bookRoutes)

// app.get('/', (req, res) => {
//     res.render('index')
// })
// app.get('/login', (req, res) => {
//     res.render('login')
// })
// app.get('/register', (req, res) => {
//     res.render('register')
// })







app.use ('/', require('./api/routes/index'))
app.use('/users', require('./api/routes/users'))


app.use((req, res, next) => {
    next()
})

module.exports = app