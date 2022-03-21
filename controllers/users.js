const { request, response } = require('express')
const bcrypt = require('bcryptjs')

const User = require('../models/User')

const postUserGetter = async(req = request, res = response) => {
    try {
        const user = await User.findById(req.params.id).populate('post')
        res.status(200).json({
            user
        }) 
    } catch (error) {
        console.log(error)
        res.status(404).json({
            msg: 'could not get the posts of the user'
        })
    }
}

const postUser = async(req = request, res = response) => {
    try {
        const { username, password } = req.body
        const newUser = new User({ username, password })
        const hash = bcrypt.hashSync(password, 10)
        newUser.password = hash
        await newUser.save()
        res.status(200).json({
            msg: 'user saved correctly'
        })
    } catch (error) {
        res.status(500).json({
            msg: 'could not save the user'
        })
    }
}

const deleteUser = async(req = request, res = response) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            msg: 'user deleted.'
        })
    } catch (error) {
        res.status(500).json({
            msg: 'could not delete user'
        })
    }
}

module.exports = {
    postUser,
    deleteUser,
    postUserGetter
}