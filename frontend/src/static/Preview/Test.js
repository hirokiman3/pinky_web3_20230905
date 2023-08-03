export async function listNFT(
  contract_address,
  token_id,
  listing_price,
  endTimeSeconds
) {
  // create seaport instance
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const seaport = new Seaport(provider)
  // get seller and prices
  let seller = await getBuyer()
  let royalty_info = await getRoyaltyInfo(contract_address)
  let prices = calculatePrices(listing_price, royalty_info.royalty_fee)
  if (prices === -1) {
    return
  }
  // create the parameters for the order
  let new_parameters = {
    offerer: seller,
    offer: [
      {
        itemType: 2,
        token: contract_address,
        identifierOrCriteria: token_id,
        startAmount: "1",
        endAmount: "1",
      },
    ],
    consideration: [
      {
        itemType: 0,
        token: "0x0000000000000000000000000000000000000000",
        identifierOrCriteria: "0",
        startAmount: prices.listing_profit,
        endAmount: prices.listing_profit,
        recipient: seller,
      },
      {
        itemType: 0,
        token: "0x0000000000000000000000000000000000000000",
        identifierOrCriteria: "0",
        startAmount: prices.opensea_fee,
        endAmount: prices.opensea_fee,
        recipient: "0x8De9C5A032463C561423387a9648c5C7BCC5BC90",
      },
      {
        itemType: 0,
        token: "0x0000000000000000000000000000000000000000",
        identifierOrCriteria: "0",
        startAmount: prices.royalty_fee,
        endAmount: prices.royalty_fee,
        recipient: royalty_info.royalty_address,
      },
    ],
    startTime: ethers.BigNumber.from(
      Math.floor(new Date().getTime() / 1000).toString()
    ),
    endTime: ethers.BigNumber.from(
      Math.floor(
        new Date().getTime() / 1000 + 60 * 60 * endTimeSeconds
      ).toString()
    ),
    orderType: 2,
    zone: "0x004C00500000aD104D7DBd00e3ae0A5C00560C00",
    zoneHash:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    salt: "30158852458975423",
    conduitKey:
      "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
    totalOriginalConsiderationItems: ethers.BigNumber.from("3"),
  }
  const getSign = async (parameters) => {
    let counter = 0
    let signature = await seaport.signOrder(parameters, counter)
    parameters["counter"] = counter
    return {
      parameters: parameters,
      signature: signature,
    }
  }
  const sendToApi = async (order) => {
    let api_params = order["parameters"]
    api_params.startTime = api_params.startTime.toString()
    api_params.endTime = api_params.endTime.toString()
    api_params.totalOriginalConsiderationItems =
      api_params.totalOriginalConsiderationItems.toNumber()
    order["parameters"] = api_params
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "X-API-KEY": process.env.NEXT_PUBLIC_OPENSEAS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }
    fetch("https://api.opensea.io/v2/orders/ethereum/seaport/listings", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err))
  }
  let order = await getSign(new_parameters)
  await sendToApi(order)
}
