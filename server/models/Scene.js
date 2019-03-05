const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ActorSchema } = require("./Actor");

const SceneSchema = new Schema({
  scene: {
    type: String,
    required: true
  },
  actors: {
    type: Array
  }
});

const Scene = mongoose.model("Scene", SceneSchema);
module.exports = { Scene, SceneSchema };
