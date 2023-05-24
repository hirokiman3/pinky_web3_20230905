import { Configuration, OpenAIApi } from "openai"
import { writeFileSync } from "fs"
import dotenv from "dotenv"

dotenv.config()

const configuration = new Configuration({
  organization: process.env.ORG_ID,
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const prompt = "A monkey coding blockchain on his laptop"

const result = await openai.createImage({
  prompt,
  n: 1,
  size: "256x256",
  user: "itsaliarsalan",
})

const url = result.data.data[0].url
console.log(url)

// Save image to disk
const imageResult = await fetch(url)
const blob = await imageResult.blob()
const buffer = Buffer.from(await blob.arrayBuffer())
writeFileSync(`./img/${Date.now()}.png`, buffer)
