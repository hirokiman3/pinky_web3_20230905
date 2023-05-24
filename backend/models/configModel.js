import mongoose from "mongoose"
import userSchema from "./userModel.js"

const configSchema = new mongoose.Schema(
  {
    secret: { type: String, required: true },
    org_id: { type: String, required: true },
    user: userSchema,
  },
  {
    timestamps: true,
  }
)
const Config = mongoose.model("Config", configSchema)

export default Config
