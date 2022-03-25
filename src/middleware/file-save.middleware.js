import multer from "multer";

const storageEngine = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public-static");
  },
  filename: function (req, file, callback) {
    callback(null, file.filename + "-" + req.email); //estructurar la info desde el cliente
  },
});

export const uploadMiddleware = multer({ storage: storageEngine });

/**
 * import multer from 'multer'



const storageEngine = multer.diskStorage ({
   destination:function(req,file,cb){
       cb(null,'public-static')
   },
   filename:function(req,file,cb){
       cb(null, file.originalname)
   }
  });

  export const upload = multer({storage:storageEngine})

  export const Public = 'static/'

 */
