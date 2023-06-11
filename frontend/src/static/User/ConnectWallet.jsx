import React from "react"
import Navbar from "../../components/Navbar"
import { Button, Container } from "@mui/material"

export default function ConnectWallet() {
	return (
		<>
			<Navbar />
			<Container className="mt-12">
				<h2 className="text-4xl font-bold mb-1 text-pink-600 dark:text-pink-500">
					Marketplace | Your NFTs
				</h2>
				<h5 className="text-gray-800 dark:text-gray-200 mb-8">
					Connect your wallet and see how other creators generated their artwork
				</h5>
				<Button variant="contained">Connect Wallet</Button>
			</Container>
		</>
	)
}
