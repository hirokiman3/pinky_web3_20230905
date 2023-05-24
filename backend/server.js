import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import path from "path"

dotenv.config()

const app = express()

// Below two lines converts form post data to json format in req body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to DB")
  })
  .catch((err) => {
    console.log(err.message)
  })

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, "/client/build")))
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/build/index.html"))
)
// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})

const port = process.env.PORT || 8001
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})
