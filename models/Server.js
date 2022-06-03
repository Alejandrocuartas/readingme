const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const { createServer } = require('http')
const { Server } = require('socket.io')

const socketController = require('../sockets/controller')
const dbConector = require('../db/server')

class ServerModel{
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.server = createServer(this.app)
        this.io = new Server(this.server, {
            cors: ['https://readingme-alejo.netlify.app', 'http://localhost:8080', 'http://localhost:8081'],
        })
        
        this.dbConector()

        this.middlewares()

        this.routes()

        this.sockets()

    }

    async dbConector(){
        await dbConector()
    }
    
    middlewares(){
        this.app.use( express.static('public') )
        this.app.use( express.json() )
        this.app.use( cors({
            origin: ['https://readingme-alejo.netlify.app', 'http://localhost:8080', 'http://localhost:8081'],
            credentials: true
        }) )
        this.app.use( cookieParser() )
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    sockets(){
        this.io.on('connection', socketController );
    }

    routes(){
        const { postsRouter, usersRouter, authRouter, uploadsRouter } = require('../routes')
        this.app.use('/api/posts', postsRouter)
        this.app.use('/api/users', usersRouter)
        this.app.use('/api/auth', authRouter)
        this.app.use('/api/upload', uploadsRouter)
    }

    listen(){
        this.server.listen(this.port, ()=>{
            console.log('Listening at', this.port)
        })
    }

}

module.exports = ServerModel