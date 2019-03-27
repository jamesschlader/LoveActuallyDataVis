const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String
  },
  sceneIds: {
    type: String
  }
});

const Actor = mongoose.model("Actor", ActorSchema);
module.exports = { Actor, ActorSchema };
