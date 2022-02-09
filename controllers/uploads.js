const { request, response } = require('express')
const path = require('path')


const postFile = async(req = request, res = response) => {

    let postFile
    let uploadPath
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.postFile ) {
      return res.status(400).json({
          msg: 'No files were uploaded.'}
        )
    }
  
    console.log('req.files >>>', req.files) // eslint-disable-line
  
    postFile = req.files.postFile

    const cutName = postFile.name.split('.')
    const extension = cutName[ cutName.length - 1 ]
    if(extension !== 'jpg'){
        return res.status(400).json({
            msg: 'The file must be a jgp file'
        })
    }
    uploadPath = path.join(__dirname, '../uploads/', postFile.name)
  
    postFile.mv(uploadPath, function(err) {
      if (err) {
        return res.status(500).json({err})
      }
  
      res.status(200).json({msg: 'File uploaded to ' + uploadPath})
    })
  

}


const deleteFile = async(req = request, res = response) => {
}

module.exports = {
    deleteFile,
    postFile
}