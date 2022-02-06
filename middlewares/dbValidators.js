const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const Post = require('../models/Post')

const existUsername = async(username) => {
    const exist = await User.findOne({ username })
    if(exist){
        throw new Error(`The username ${ username } already exists.`)
    }
}

const existUser = async(id) => {
    const exist = await User.findById(id)
    if(!exist){
        throw new Error(`The user with the id ${id} does not exist.`)
    }
}

const usernameGetter = async(req = request, res = response, next) => {
    try {
        const { userToken } = req.cookies
        const { id } = jwt.verify(userToken, process.env.JWT_KEY)
        const { username } = await User.findOne({ id })
        req.body.username = username
        req.body.writter = id
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Could not create the post. A common reason is you are not logged in.'
        })
    }
}

const existPost = async(id) => {
    const exist = await Post.findById(id)
    if(!exist){
        throw new Error(`The post with the id ${id} does not exist.`)
    }
}

module.exports = {
    existUsername,
    existUser,
    usernameGetter,
    existPost
}