const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

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
        this.app.use( cors() )
        this.app.use( cookieParser() )
    }

    routes(){
        const { postsRouter, usersRouter, authRouter } = require('../routes')
        this.app.use('/api/posts', postsRouter)
        this.app.use('/api/users', usersRouter)
        this.app.use('/api/auth', authRouter)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Listening at', this.port)
        })
    }

}

module.exports = Server