import Person from "../models/personModel.js";
import mongoose from "mongoose";

export const getPeople = async (req, res) => {
  try {
    const people = await Person.find();

    res.status(200).json(people);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPersonById = async (req, res) => {
  const { id } = req.params;

  const singlePerson = await Person.findById(id);
  try {
    res.status(200).json(singlePerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createPerson = async (req, res) => {
  const { name, age } = req.body;

  const newPerson = await new Person({
    name: name,
    age: age,
    likes: [],
  });

  try {
    await newPerson.save();

    res.status(201).json(newPerson);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePerson = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No Person with id: ${id}`);
  }

  await Person.findByIdAndRemove(id);

  res.json({ message: "Person deleted successfully!" });
};

export const editPerson = async (req, res) => {
  const { id } = req.params;

  const { name, age, likes } = req.body.editedPerson;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No Person with id: ${id}`);
  }

  const editedPerson = { _id: id, name, age, likes };

  await Person.findByIdAndUpdate(id, editedPerson, { new: true });

  res.status(200).json(editedPerson);
};

export const likePerson = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No person with the ID: ${id}`);
  }

  const person = await Person.findById(id);

  let count = person.likes.length;
  person.likes.push(count++);

  const likedPerson = await Person.findByIdAndUpdate(id, person, { new: true });

  res.json(likedPerson);
};
