const express = require('express')
const router  = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})
router.get('/login', (req, res) => {
    res.render('login')
})
//register page
router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/directory', (req, res) => {
    res.render('directory')
})

module.exports = router