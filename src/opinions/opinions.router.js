import express from "express";
import { createNewTertimonieCtrl } from "./opinions.controller.js";

const router = express.Router();

router.post("/", createNewTertimonieCtrl);

export default router;
