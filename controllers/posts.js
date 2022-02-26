const { request, response } = require('express')
const Post = require('../models/Post')
const cloudinary = require('cloudinary').v2

cloudinary.config( process.env.CLOUDINARY_URL )

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
    let urlImage = ''
    try {
        if(req.files.postFile.name){
            const { tempFilePath } = req.files.postFile
            const { secure_url } = await cloudinary.uploader.upload( tempFilePath )
            urlImage = secure_url
        }
        const { username, postcomment, writter } = req.body
        const newPost = new Post({ username, postcomment, image: urlImage , writter})
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