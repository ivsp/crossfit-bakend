import express from "express";
import {
  createNewAthleteCtrl,
  getAllAthleteEventsByEmailCtrl,
} from "./athletes.controller.js";

const router = express.Router();

router.post("/", createNewAthleteCtrl).get("/", getAllAthleteEventsByEmailCtrl);

export default router;
