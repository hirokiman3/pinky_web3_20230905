import path from "path"
import express from "express"
import dotenv from "dotenv"
import fetch from "node-fetch"
import { uploadFileToIPFS } from "./utils.js"
import { Configuration, OpenAIApi } from "openai"
import { writeFileSync, createReadStream } from "fs"

dotenv.config()
const nftRouter = express.Router()

nftRouter.post("/generate", async (req, res) => {
  try {
    const prompt = req.body.prompt
    const no = req.body.no
    const dimension = req.body.dimension
    const username = req.body.dimension

    const configuration = new Configuration({
      organization: req.body.org_id || process.env.OPENAI_ORG_ID,
      apiKey: req.body.secret || process.env.OPENAI_API_KEY,
    })

    const openai = new OpenAIApi(configuration)

    const result = await openai.createImage({
      prompt,
      size: dimension,
      user: username,
    })

    const url = result.data.data[0].url

    // Save image to disk
    const imageResult = await fetch(url, { mode: "no-cors" })
    const blob = await imageResult.blob()
    const date = Date.now()
    const imagePath = `./aiassets/${username}-${date}.png`
    writeFileSync(imagePath, Buffer.from(await blob.arrayBuffer()))

    const __dirname = path.resolve()
    const filepath = path.join(__dirname, imagePath)
    const image = createReadStream(filepath)
    // now image converted like file object...
    res.send({
      path: await uploadFileToIPFS(image, prompt, username),
      date: date,
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


export default nftRouter
