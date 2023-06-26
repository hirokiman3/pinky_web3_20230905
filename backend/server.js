import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import path from "path"
import userRouter from "./userRouter.js"
import nftRouter from "./nftRouter.js"
// import cors from "cors"

dotenv.config()

const app = express()

// Below two lines converts form post data to json format in req body
// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose
  .connect(process.env.MONGO_DB_URI, {
    dbName: "pinkyDb",
    retryWrites: true,
    w: "majority",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to DB")
  })
  .catch((err) => {
    console.log(err.message)
  })
app.use("/api/users", userRouter)
app.use("/api/nft", nftRouter)

const __dirname = path.resolve()

app.use("/aiassets", express.static(path.join(__dirname, "/aiassets")))
app.use(express.static(path.join(__dirname, "/frontend/build")))
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
)

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})


const port = process.env.PORT || 8001
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})
