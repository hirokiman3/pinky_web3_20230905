import mongoose from "mongoose"
import userSchema from "./userModel.js"

const gallerySchema = new mongoose.Schema(
  {
    prompt: { type: String, required: true },
    path: { type: String, required: true },
    user: userSchema,
  },
  {
    timestamps: true,
  }
)
const Gallery = mongoose.model("Gallery", gallerySchema)

export default Gallery
