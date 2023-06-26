import mongoose from "mongoose"

const nftSchema = new mongoose.Schema(
  {
    path: { type: String },
    title: { type: String },
    desc: { type: String },
    price: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
)
const Nft = mongoose.model("Nft", nftSchema)

export default Nft
