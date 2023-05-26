import { Configuration, OpenAIApi } from "openai"
import { Buffer } from "buffer"

export const genNFT = async (userInfo, prompt, no, dimensions) => {
  // OpenAI Config and Connection
  const configuration = new Configuration({
    organization: userInfo.org_id,
    apiKey: userInfo.secret,
  })
  const openai = new OpenAIApi(configuration)

  const result = await openai.createImage({
    prompt,
    n: no,
    size: dimensions,
    user: userInfo.username,
  })

  return result.data.data[0].url
  // console.log(url)

  // // Save image to disk
  // const imageResult = await fetch(url, { mode: "no-cors" })
  // const blob = await imageResult.blob()
  // return Buffer.from(await blob.arrayBuffer())
}
