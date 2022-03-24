const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const dbConector = require('../db/server')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        
        this.dbConector()

        this.middlewares()

        this.routes()
    }

    async dbConector(){
        await dbConector()
    }
    
    middlewares(){
        this.app.use( express.static('public') )
        this.app.use( express.json() )
        this.app.use( cors({
            origin: 'http://localhost:8081',
            credentials: true
        }) )
        this.app.use( cookieParser() )
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    routes(){
        const { postsRouter, usersRouter, authRouter, uploadsRouter } = require('../routes')
        this.app.use('/api/posts', postsRouter)
        this.app.use('/api/users', usersRouter)
        this.app.use('/api/auth', authRouter)
        this.app.use('/api/upload', uploadsRouter)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Listening at', this.port)
        })
    }

}

module.exports = Server