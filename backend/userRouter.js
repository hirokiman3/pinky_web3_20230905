import express from "express"
import expressAsyncHandler from "express-async-handler"
import data from "./data.js"
import User from "./userModel.js"
import bcrypt from "bcryptjs"

import { generateToken } from "./utils.js"

const userRouter = express.Router()

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users)
    res.send({ createdUsers })
  })
)

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          secret: user.secret,
          org_id: user.org_id,
          token: generateToken(user),
        })
        return
      }
    }
    res.status(401).send({ message: "Invalid email or password" })
  })
)

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      secret: "xxxxxxxxxxxx",
      org_id: "xxxxxxxxxxxx",
      password: bcrypt.hashSync(req.body.password, 8),
    })
    const createdUser = await user.save()
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      username: createdUser.username,
      email: createdUser.email,
      secret: createdUser.secret,
      org_id: createdUser.org_id,
      token: generateToken(createdUser),
    })
  })
)

export default userRouter
