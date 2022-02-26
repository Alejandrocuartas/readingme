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
        type: String
    },
    writter: {
        type: Schema.Types.ObjectId,
        ref: 'writer',
        required: true
    }
})

postSchema.methods.toJSON = function() {
   const { __v, ...rest } = this.toObject()
   return rest
}

module.exports = model('post', postSchema)