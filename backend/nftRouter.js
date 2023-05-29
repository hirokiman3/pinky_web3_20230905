import path from "path"
import fetch from "node-fetch"
import express from "express"
import { uploadFileToIPFS } from "./utils.js"
import { Configuration, OpenAIApi } from "openai"
import { writeFileSync, createReadStream } from "fs"

const nftRouter = express.Router()

nftRouter.post("/generate", async (req, res) => {
  try {
    const org_id = req.body.org_id
    const secret = req.body.secret
    const prompt = req.body.prompt
    const no = req.body.no
    const dimensions = req.body.dimensions
    const username = req.body.username

    const configuration = new Configuration({
      organization: org_id,
      apiKey: secret,
    })
    const openai = new OpenAIApi(configuration)
    const result = await openai.createImage({
      prompt,
      n: no,
      size: dimensions,
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
      path: await uploadFileToIPFS(image, prompt, org_id),
      date: date,
    })
  } catch (error) {
    console.log("error while sending nfts to ipfs", error.message)
  }
})

export default nftRouter
