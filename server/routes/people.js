// const express = require("express");
import express from "express";
// const { getPersonByName } = require("../controllers/people");
import {
  createPerson,
  deletePerson,
  getPeople,
  getPersonById,
  editPerson,
} from "../controllers/people.js";

const router = express.Router();

router.route("/").get(getPeople).post(createPerson);
router.route("/:id").get(getPersonById).delete(deletePerson).put(editPerson);

export default router;
