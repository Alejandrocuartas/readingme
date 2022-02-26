const { response, request } = require('express')

const fileExtensionValidator = (req = request, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.postFile ) {
        return next()
    }
    
    const { postFile } = req.files

    const cutName = postFile.name.split('.')
    const extension = cutName[ cutName.length - 1 ]
    if(extension !== 'jpg'){
        return res.status(400).json({
            msg: 'The file must be a jgp file'
        })
    }
    next()

}

module.exports = fileExtensionValidator