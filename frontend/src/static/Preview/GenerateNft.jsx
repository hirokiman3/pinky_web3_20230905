import { Container, TextField, InputAdornment, Button } from "@mui/material"
import Navbar from "../../components/Navbar"
import { useState } from "react"

export default function GenerateNft() {
	const [nftTitle, setNftTitle] = useState(null)
	const [nftPrice, setNftPrice] = useState(null)
	const [nftDescription, setNftDescription] = useState(null)

	return (
		<>
			<Navbar />
			<Container>
				<div className="grid grid-cols-1 md:grid-cols-2 mt-10">
					<div className="nft-preview mb-4 md:mb-inherit">
						<div className="w-[20rem] mx-auto">
							<img
								src="https://pbs.twimg.com/media/Fnz8_pZaMAEo50e?format=jpg"
								alt=""
								className="w-full h-[20rem] object-cover"
							/>
							<div className="preview-data w-full flex justify-between items-center mt-2">
								<h5 className="font-bold text-lg dark:text-slate-300">
									{nftTitle || "Rainbow Endevaour"}
								</h5>
								<h5 className="font-semibold dark:text-slate-300">
									{nftPrice || 0.0004} ETH
								</h5>
							</div>
							<p className="dark:text-slate-400">
								{nftDescription ||
									"Immerse yourself in the beauty of nature with this stunning NFT artwork."}
							</p>
						</div>
					</div>
					<hr className="w-[20rem] mx-auto mb-4 md:hidden md:mb-inherit" />
					<div className="nft-data">
						<div className="w-[20rem] mx-auto">
							<div className="mb-1">
								<label
									htmlFor="nftTitle"
									className="block mb-[4px] font-medium dark:text-slate-200 tracking-wide"
								>
									Title
								</label>
								<TextField
									fullWidth
									id="nftTitle"
									variant="outlined"
									sx={{
										"& .MuiInputBase-input": {
											backgroundColor: "#fff",
											borderRadius: 1,
										},
									}}
									placeholder="Rainbowed Endevaour"
									size="small"
									value={nftTitle}
									onChange={e => setNftTitle(e.target.value)}
								/>
							</div>
							<div className="mb-1">
								<label
									htmlFor="nftTitle"
									className="block mb-[4px] font-medium dark:text-slate-200 tracking-wide"
								>
									Description
								</label>
								<TextField
									fullWidth
									id="nftTitle"
									variant="outlined"
									sx={{
										"& .MuiInputBase-multiline": {
											backgroundColor: "#fff",
											borderRadius: 1,
											lineHeight: 1.2,
										},
									}}
									placeholder="Immerse yourself in the beauty of nature with this stunning NFT artwork."
									size="small"
									multiline
									rows={3}
									value={nftDescription}
									onChange={e => setNftDescription(e.target.value)}
								/>
							</div>
							<div className="mb-2">
								<label
									htmlFor="nftTitle"
									className="block mb-[4px] font-medium dark:text-slate-200 tracking-wide"
								>
									Price
								</label>
								<TextField
									fullWidth
									id="nftTitle"
									variant="outlined"
									type="number"
									sx={{
										"& .MuiInputBase-input, & .MuiInputBase-adornedEnd": {
											backgroundColor: "#fff",
											borderRadius: 1,
										},
									}}
									placeholder="0.0004"
									size="small"
									InputProps={{
										endAdornment: (
											<InputAdornment position="start">ETH</InputAdornment>
										),
									}}
									value={nftPrice}
									onChange={e => setNftPrice(e.target.value)}
								/>
							</div>
							<Button variant="contained" fullWidth>
								Mint
							</Button>
							<h6 className="mt-1 underline underline-offset-4 dark:text-slate-200">
								Generate New One
							</h6>
						</div>
					</div>
				</div>
			</Container>
		</>
	)
}
