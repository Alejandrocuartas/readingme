const User = require('../models/User')

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

module.exports = {
    existUsername,
    existUser
}