// import { Configuration, OpenAIApi } from "openai"
// import { Buffer } from "buffer"
// const fs = require("fs")

// export const genNFT = async (userInfo, prompt, no, dimensions) => {
//   var nft = new Array("")
//   // OpenAI Config and Connection
//   const configuration = new Configuration({
//     organization: userInfo.org_id,
//     apiKey: userInfo.secret,
//   })
//   const openai = new OpenAIApi(configuration)

//   const result = await openai.createImage({
//     prompt,
//     n: no,
//     size: dimensions,
//     user: userInfo.username,
//   })

//   const url = result.data.data[0].url
//   console.log(url)

//   // Save image to disk
//   const imageResult = await fetch(url, { mode: "no-cors" })
//   const blob = await imageResult.blob()
//   const date = Date.now()

//   nft[0] = `../src/assets/${userInfo.username}-${date}.png`
//   nft[1] = date

//   fs.writeFileSync(nft[0], Buffer.from(await blob.arrayBuffer()))

//   return nft
// }
