const { Schema, model } = require('mongoose')

const postSchema = Schema({
    username: {
        type: String,
        required: [true, 'The schema username is required.']
    },
    postcomment: {
        type: String,
        description: [true, 'The description of the post is required']
    },
    image: {
        type: Buffer
    },
    writter: {
        type: Schema.Types.ObjectId,
        ref: 'writer',
        required: true
    }
})

module.exports = model('post', postSchema)