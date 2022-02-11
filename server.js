const http = require('http')
const app = require('./app')

const server = http.createServer(app)

const port = process.env.PORT || 5555

server.listen(port)
console.log(`Listening on port ${port}. line 9 server.js`)