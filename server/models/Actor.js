const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { SceneSchema } = require("./Scene");

const ActorSchema = new Schema({
  name: {
    type: String,
    required: true
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
