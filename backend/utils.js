import jwt from "jsonwebtoken"

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "30d",
    }
  )
}
