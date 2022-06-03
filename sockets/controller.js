const Post = require('../models/Post')

const socketController = async(socket) => {
        const posts = await Post.find()
        socket.emit('get-posts', {
            posts
        })
        socket.on('new-post', async (data) => {
            const posts = await Post.find()
            socket.broadcast.emit('get-posts', {
                posts
            })
            socket.emit('get-posts', {
                posts
            })
        })
}

module.exports = socketController
