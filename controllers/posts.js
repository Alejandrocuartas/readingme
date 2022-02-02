const { request, response } = require('express')

const postsGet = (req = request, res = response) => {
    res.json({
        msg: 'ok'
    })
}

const postsPost = (req = request, res = response) => {
    res.json({
        msg: 'ok'
    })
}

const postsDelete = (req = request, res = response) => {
    res.json({
        msg: 'ok'
    })
}

module.exports = {
    postsGet,
    postsDelete,
    postsPost
}