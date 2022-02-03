const { request, response } = require('express')
const bcrypt = require('bcryptjs')

const jwtGenerator = require('../helpers/jwtGenerator')

const User = require('../models/User')

const authPost = async(req = request, res = response) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })

        if(!user){
            res.status(400).json({
                msg: `the username ${ username } does not exist.`
            })
        }

        const passwIsCorrect = bcrypt.compareSync( password, user.password )
        if(!passwIsCorrect){
            res.status(400).json({
                msg: 'The password is incorrect.'
            })
        }

        const token = await jwtGenerator(user.id)

        res.cookie('userToken', token).status(200).json({
            msg: 'User logged'
        })

    } catch (error) {
        console.log(error)
        return new Error("Could not log in.")
    }
}

module.exports = { 
    authPost
}