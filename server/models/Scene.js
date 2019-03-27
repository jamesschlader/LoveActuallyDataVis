const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SceneSchema = new Schema({
  scene: {
    type: String,
    required: true,
    unique: true
  },
  actorIds: {
    type: Array
  }
});

const Scene = mongoose.model("Scene", SceneSchema);
module.exports = { Scene, SceneSchema };
