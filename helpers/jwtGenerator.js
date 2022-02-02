const jwt = require('jsonwebtoken')

const jwtGenerator = (id) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id
        }
        jwt.sign(payload, process.env.JWT_KEY,{
            expiresIn: 60
        }, (err, token) => {
            if(err){
                console.log(err)
                reject('Could not generate token.')
            }else{
                resolve(token)
            }
        })
    })
}

module.exports = jwtGenerator