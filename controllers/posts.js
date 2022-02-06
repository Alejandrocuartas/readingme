const { request, response } = require('express')
const Post = require('../models/Post')

const postsGet = async(req = request, res = response) => {
    try {
        const posts = await Post.find()
        res.status(200).json({
            posts
        })
    } catch (error) {
        res.status(404).json({
            msg: 'could not get posts'
        })
    }
}

const postsPost = async(req = request, res = response) => {
    try {
        const { username, postcomment, image = '', writter } = req.body
        const newPost = new Post({ username, postcomment, image, writter})
        await newPost.save()
        res.status(200).json({
            msg: 'Post saved.'
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: 'Could not save the post'
        })
    }
}

const postsDelete = async(req = request, res = response) => {
    try {
        const id = req.params.id
        const post = await Post.findOne({ id })
        if(post.writter.toString() !== req.writterId){
            return res.status(400).json({
                msg: 'You cannot delete this post'
            })
        }
        await Post.findByIdAndDelete(id)
        res.status(200).json({
            msg: 'Post deleted.'
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: 'Could not delete the post'
        })
    }
}

module.exports = {
    postsGet,
    postsDelete,
    postsPost
}