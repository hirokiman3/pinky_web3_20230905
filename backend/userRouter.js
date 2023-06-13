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
          org_id: user.org_id,
          secret: user.secret,
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
      org_id: "xxxxxxxxxxxx",
      secret: "xxxxxxxxxxxx",
      password: bcrypt.hashSync(req.body.password, 8),
    })
    const createdUser = await user.save()
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      username: createdUser.username,
      email: createdUser.email,
      org_id: createdUser.org_id,
      secret: createdUser.secret,
      token: generateToken(createdUser),
    })
  })
)
userRouter.put(
  "/profile",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.userId)
    if (user) {
      user.name = req.body.fullName || user.name
      user.username = req.body.username || user.username
      user.email = req.body.email || user.email
      user.org_id = req.body.organizationId || user.org_id
      user.secret = req.body.openAiSecret || user.secret
      user.password = req.body.password || user.password

      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8)
      }

      const updatedUser = await user.save()
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
        org_id: updatedUser.org_id,
        secret: updatedUser.secret,
        token: generateToken(updatedUser),
      })
    }
  })
)

export default userRouter
