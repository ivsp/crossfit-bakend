import express from "express";
import { createNewAthleteCtrl } from "./athletes.controller.js";

const router = express.Router();

router.post("/", createNewAthleteCtrl);

export default router;
