// const express = require("express");
import express from "express";
// const { getPersonByName } = require("../controllers/people");
import {
  createPerson,
  deletePerson,
  getPeople,
  getPersonById,
  editPerson,
  likePerson,
} from "../controllers/people.js";

const router = express.Router();

router
  .route("/:id")
  .get(getPersonById)
  .delete(deletePerson)
  .put(editPerson)
  .patch(likePerson);
router.route("/").get(getPeople).post(createPerson);

// router.post("/", createPerson);
// router.get("/", getPeople);
// router.delete("/:id", deletePerson);
// router.put("/:id", editPerson);

export default router;
