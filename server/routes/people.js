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

router.get("/", getPeople);

router.get("/:id", getPersonById);

router.post("/", createPerson);

router.delete("/:id", deletePerson);

router.put("/:id", editPerson);

export default router;
