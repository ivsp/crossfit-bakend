import multer from "multer";

const storageEngine = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public-static");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname); //estructurar la info desde el cliente
  },
});

export const uploadMiddleware = multer({ storage: storageEngine });

export const Public = "static/";
