import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    secret: { type: String },
    org_id: { type: String },
  },
  {
    timestamps: true,
  }
)
const User = mongoose.model("User", userSchema)

export default User
