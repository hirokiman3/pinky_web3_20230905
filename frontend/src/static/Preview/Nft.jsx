import { Container, Button } from "@mui/material"
import Navbar from "../../components/Navbar"

export default function Nft() {
	return (
		<>
			<Navbar />
			<Container>
				<div className="grid grid-cols-1 md:grid-cols-2 mt-10">
					<div className="nft-preview mb-4 md:mb-inherit">
						<div className="w-[20rem] h-[24rem] md:w-[24rem] max-md:mx-auto ms-auto">
							<img
								src="https://pbs.twimg.com/media/Fnz8_pZaMAEo50e?format=jpg"
								alt=""
								className="w-full h-full object-cover rounded"
							/>
						</div>
					</div>
					<hr className="w-[20rem] mx-auto md:mx-inherit md:me-auto mb-4 md:hidden md:mb-inherit" />
					<div className="nft-data">
						<div className="w-[20rem] md:w-[28rem] mx-auto md:mx-inherit md:me-auto">
							<div className="preview-data w-full flex justify-between items-center mt-2">
								<h5 className="font-bold text-xl md:text-2xl dark:text-gray-200 mb-1">
									{"Rainbow Endevaour"}
								</h5>
							</div>
							<p className="dark:text-gray-300 text-gray-500">
								{
									"Immerse yourself in the beauty of nature with this stunning NFT artwork."
								}
							</p>
							<div className="meta-data my-3 my-8">
								<div className="item mb-1">
									<h5 className="font-bold dark:text-gray-200 uppercase">
										Owner
									</h5>
									<p className="dark:text-gray-300 text-gray-500 break-words">
										0x9068cF148800d75f68a0F6C4449B405a98786E32
									</p>
								</div>
								<div className="item mb-1">
									<h5 className="font-bold dark:text-gray-200 uppercase">
										Seller
									</h5>
									<p className="dark:text-gray-300 text-gray-500 break-words">
										0x9068cF148800d75f68a0F6C4449B405a98786E32
									</p>
								</div>
								<div className="item mb-1">
									<h5 className="font-bold dark:text-gray-200 uppercase">
										Price
									</h5>
									<p className="dark:text-gray-300 text-gray-500">0.004 ETH</p>
								</div>
							</div>
							<Button variant="contained" className="w-full md:w-[12rem]">
								Mint Now
							</Button>
						</div>
					</div>
				</div>
			</Container>
		</>
	)
}
