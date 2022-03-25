import express from "express";
import { getUserInfo, logoutCtrl, modifyDataCtrl } from "./users.controller.js";

const router = express.Router();

router
  .route("/")
  .get(getUserInfo)
  .post(() => {})
  .patch(modifyDataCtrl);

export default router;
