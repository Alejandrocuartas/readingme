require('dotenv').config()

console.clear()

const Server = require('./models/Server')

const app = new Server()

app.listen()