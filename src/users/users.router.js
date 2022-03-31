import express from "express";
import { getUserInfo, modifyDataCtrl } from "./users.controller.js";
import { upload } from "../middleware/file-save.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(getUserInfo)
  .post(() => {})
  .patch(upload.single("file"), modifyDataCtrl);

export default router;
