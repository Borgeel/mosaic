import mongoose from "mongoose";

const personModel = mongoose.Schema({
  name: String,
  age: String,
  likes: { type: [String], default: [] },
});

export default mongoose.model("Person", personModel);
