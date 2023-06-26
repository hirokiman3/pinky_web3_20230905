import path from "path"
import express from "express"
import dotenv from "dotenv"
import fetch from "node-fetch"
import { uploadFileToIPFS } from "./utils.js"
import { Configuration, OpenAIApi } from "openai"
import { writeFileSync, createReadStream } from "fs"
import Nft from "./nftModal.js"
import User from "./userModel.js"
import expressAsyncHandler from "express-async-handler"

dotenv.config()
const nftRouter = express.Router()

nftRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const user = req.query.seller || ""
    const sellerFilter = user ? { user } : {}

    const nfts = await Nft.find({ ...sellerFilter })
    return res.send(nfts)
  })
)

nftRouter.post("/generate", async (req, res) => {
  try {
    const { prompt, no, dimension, userInfo } = req.body
    let config = ""
    let result = null

    const u = await User.findById(userInfo._id)

    if (u.trial) {
      config = new Configuration({
        organization: process.env.OPENAI_ORG_ID,
        apiKey: process.env.OPENAI_API_KEY,
      })
      const openai = new OpenAIApi(config)
      const user = await User.findById(req.body.userInfo._id)
      if (user) {
        user.trial = false
        await user.save()
      }
      result = await openai.createImage({
        prompt,
        size: dimension,
        user: userInfo.username,
      })
      const url = result.data.data[0].url
      // Save image to disk
      const imageResult = await fetch(url, { mode: "no-cors" })
      const blob = await imageResult.blob()
      const date = Date.now()
      const imagePath = `./aiassets/${userInfo.username}-${date}.png`
      writeFileSync(imagePath, Buffer.from(await blob.arrayBuffer()))

      const __dirname = path.resolve()
      const filepath = path.join(__dirname, imagePath)
      const image = createReadStream(filepath)

      // now image converted like file object...
      let p = await uploadFileToIPFS(image, prompt, userInfo.username)

      res.send({
        path: p,
        date: date,
      })
    } else {
      if (userInfo.org_id && userInfo.secret) {
        config = new Configuration({
          organization: userInfo.org_id,
          apiKey: userInfo.secret,
        })
        const openai = new OpenAIApi(config)
        result = await openai.createImage({
          prompt,
          size: dimension,
          user: userInfo.username,
        })
        const url = result.data.data[0].url
        // Save image to disk
        const imageResult = await fetch(url, { mode: "no-cors" })
        const blob = await imageResult.blob()
        const date = Date.now()
        const imagePath = `./aiassets/${userInfo.username}-${date}.png`
        writeFileSync(imagePath, Buffer.from(await blob.arrayBuffer()))

        const __dirname = path.resolve()
        const filepath = path.join(__dirname, imagePath)
        const image = createReadStream(filepath)

        // now image converted like file object...
        let p = await uploadFileToIPFS(image, prompt, userInfo.username)

        res.send({
          path: p,
          date: date,
        })
      } else {
        res.send({
          path: null,
          message: "Your trial is expired. Update your OpenAI details!",
        })
      }
    }
  } catch (error) {
    if (error.response) {
      console.log("Image error status: ", error.response.status)
      console.log("Image error data: ", error.response.data)
    } else {
      console.log("Image error message: ", error.message)
    }
  }
})

nftRouter.post("/save", async (req, res) => {
  const nft = new Nft({
    path: req.body.path,
    title: req.body.title,
    desc: req.body.desc,
    price: req.body.price,
    user: req.body.userId,
  })

  const createdNft = await nft.save()
  res.send(createdNft)
})

nftRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const nft = await Nft.findById(req.params.id)
    if (nft) {
      const deletedNft = await nft.deleteOne()
      res.send({ message: "Nft Deleted", nft: deletedNft })
    } else {
      res.status(404).send({ message: "Nft Not Found" })
    }
  })
)
export default nftRouter
