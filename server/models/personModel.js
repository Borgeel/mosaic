import mongoose from "mongoose";

const personModel = mongoose.Schema({
  name: { type: String },
  age: { type: String },
});

export default mongoose.model("Person", personModel);
