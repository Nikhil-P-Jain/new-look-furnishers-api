const multer = require('multer');
const router = require("express").Router();
const bodyParser = require("body-parser");
const path=require('path');

router.use(bodyParser.json());

//file Upload setting
const PATH  = './api/upload';
let storage = multer.diskStorage({
	destination:(req,file,cb)=>{
		cb(null,PATH );
	},
	filename:(req,file,cb)=>{
		cb(null,Date.now()+'-'+file.originalname)
	}
});

let upload = multer({
  storage:storage,
  limits: { fileSize: 1024 * 1024 * 25 },
});

// POST File
// router.post('/file', upload.array('file'), function (req, res,next) {
//     const files = req.file;
//     console.log("File Uploade given :-", files);
//     if (!files) {
//         const error = new Error('No File is available!')
//         error.httpStatusCode = 400
//         return next(error);
//     } else {
//       console.log('File is available!');
//       return res.send(req.file)
//     }
// });

router.post('/file', upload.single('file'), (req, res, next) => {
    const files = req.file;
    // console.log("Getting Error",err);
    // if(error.code == "LIMIT_FILE_SIZE"){
    //   res.send({status:'false' , message: 'File Size is too large.Allowed File size is 2mb'})
    // }
    if (!files) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      console.log("Getting error :-", error);
      return next(error)
    }
      res.send({status:  'true', file: files});
  })

router.post('/',(req,res,next)=>{
  // console.log(req.body.filename);
  filepath = path.join(__dirname,'../upload')+'/'+req.body.filename;
  // console.log("Get file response :-",res);
  // res.send(res);
})

module.exports = router;