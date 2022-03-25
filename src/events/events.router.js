import express from "express";
import {
  getCurrentsEventsInfoByEmailCtrl,
  getPastsEventsInfoByEmailCtrl,
} from "./events.controller.js";

const router = express.Router();

router.route("/current").get(getCurrentsEventsInfoByEmailCtrl);
router.route("/past").get(getPastsEventsInfoByEmailCtrl);

export default router;
