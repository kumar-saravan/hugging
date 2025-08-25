import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  space_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  prompts: {
    type: [String],
    default: [],
  },
  history: {
    type: [
      {
        html: String,
        prompt: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [],
  },
  _createdAt: {
    type: Date,
    default: Date.now,
  },
  _updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
