const mongoose = require('mongoose')

const dbConector = async() => {
    try {
        mongoose.connect(process.env.MONGODB_ATLAS)
        console.log('Database connected.')
    } catch (error) {
        throw new Error('Error when connecting database.')
    }
}

module.exports = dbConector