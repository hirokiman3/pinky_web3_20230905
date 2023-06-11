import React from "react"
import Navbar from "../../components/Navbar"
import { Button, Container } from "@mui/material"
import InputVariant1 from "../../components/ui/InputVariant1"

export default function Settings() {
	return (
		<>
			<Navbar />
			<h2 className="text-4xl text-center font-bold dark:text-gray-200 mb-8">
				Your Profile
			</h2>
			<Container maxWidth="md">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="row-1">
						<InputVariant1
							label="Title"
							defaultValue="Arsalan Ali"
							id="accountTitle"
							className="mb-1"
						/>
						<InputVariant1
							label="Username"
							defaultValue="aliarslandev"
							id="accountUsername"
							className="mb-1"
						/>
						<InputVariant1
							label="Your OpenAI Organization ID"
							defaultValue="000000000000000000000000"
						/>
						<h4 className="text-lg font-bold mt-6 mb-[4px] uppercase dark:text-gray-200">
							Connect Your Wallet
						</h4>
						<Button variant="contained">Connect</Button>
						<h6 className="mt-1 dark:text-gray-300 text-gray-500">
							0x9068cF148800d75f68a0F6C4449B405a98786E32
						</h6>
					</div>
					<div className="row-2">
						<InputVariant1
							label="Email"
							defaultValue="aliarsalandev@gmail.com"
							id="accountEmail"
							className="mb-1"
							type="email"
						/>
						<InputVariant1
							label="Your OpenAI Secret Key"
							defaultValue="000x000000000000x0"
							id="openAiKey"
							className="mb-1"
						/>
						<div className="flex gap-1 mb-2">
							<InputVariant1
								label="New Password"
								placeholder="Password"
								id="accountPass"
								className="mb-1 w-full"
							/>
							<InputVariant1
								label="Confirm Password"
								placeholder="Confirm Password"
								id="accountConfirmPass"
								className="mb-1 w-full"
							/>
						</div>
						<Button variant="contained" fullWidth>
							Update Profile
						</Button>
					</div>
				</div>
			</Container>
		</>
	)
}
