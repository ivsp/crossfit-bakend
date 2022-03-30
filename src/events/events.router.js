import express from "express";
import {
  addUserToaEventByEmailAndEvNameCtrl,
  deletePastsEventsInfoByEmailAndNameCtrl,
  getCurrentEventsInfoCtrl,
  getCurrentsEventsInfoByEmailCtrl,
  getPastsEventsInfoByEmailCtrl,
} from "./events.controller.js";

const router = express.Router();

router.route("/current").get(getCurrentsEventsInfoByEmailCtrl);
router
  .route("/past")
  .get(getPastsEventsInfoByEmailCtrl)
  .post(deletePastsEventsInfoByEmailAndNameCtrl);
router
  .route("/")
  .get(getCurrentEventsInfoCtrl)
  .post(addUserToaEventByEmailAndEvNameCtrl);
export default router;
