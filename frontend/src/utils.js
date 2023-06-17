export const GetIpfsUrlFromPinata = (pinataUrl) => {
  try {
    var IPFSUrl = pinataUrl.split("/")
    const lastIndex = IPFSUrl.length
    IPFSUrl = "https://ipfs.io/ipfs/" + IPFSUrl[lastIndex - 1]
  } catch (error) {
    if (error.response) {
      console.log("Pinata error status: ", error.response.status)
      console.log("Pinata error data: ", error.response.data)
    } else {
      console.log("Pinata error message: ", error.message)
    }
  }
  return IPFSUrl
}
