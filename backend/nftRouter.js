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
import request from "request"

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
    const { prompt, model, userInfo } = req.body
    let result = null

    var options = {
      method: "POST",
      url: "https://stablediffusionapi.com/api/v4/dreambooth",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: process.env.STABLE,
        model_id: model,
        prompt: prompt,
        width: "512",
        height: "512",
        samples: "1",
        num_inference_steps: "30",
        safety_checker: "no",
        enhance_prompt: "yes",
        seed: null,
        guidance_scale: 7.5,
        multi_lingual: "no",
        panorama: "no",
        self_attention: "no",
        upscale: "no",
        embeddings_model: null,
        lora_model: null,
        tomesd: "yes",
        use_karras_sigmas: "yes",
        vae: null,
        lora_strength: null,
        scheduler: "UniPCMultistepScheduler",
        webhook: null,
        track_id: null,
      }),
    }
    request(options, async function (error, response) {
      result = JSON.parse(response.body)
      console.log(result.output[0])

      let url = result.output[0]

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
    })
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



