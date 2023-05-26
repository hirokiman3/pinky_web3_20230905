import { Box, Button, Container, Stack, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { Context } from '../../App'

export default function UserSettings() {

	// Importing userInfo through useContext
	const { userInfo } = useContext(Context)

	// State Variables
	const [fullName, setFullName] = useState(userInfo.name)
	const [email, setEmail] = useState(userInfo.email)
	const [username, setUsername] = useState(userInfo.username)
	const [openAiSecret, setOpenAiSecret] = useState('')
	const [organizationId, setOrganizationId] = useState('')

	const handleSettingsUpdate = () => {
		// Code to handle update
	}
	const connectWallet = () => {
		// Code to handle connect wallet
	}
	return (
		<Container maxWidth='md'>
			<Box
				sx={{
					backgroundColor: '#fff',
					boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
					borderRadius: 2,
					width: '100%',
					marginTop: 5,
					paddingBottom: 10,
				}}
			>
				<Container sx={{ paddingTop: 2 }}>
					<Box>
						<h3 style={{ margin: 0, color: 'rgba(0, 0, 0, 0.8)' }}>
							Account Settings
						</h3>
					</Box>
					<Box component='form' sx={{ marginY: 4 }}>
						<Stack spacing={2}>
							<TextField
								fullWidth
								required
								type='text'
								label='Full name'
								value={fullName}
								onChange={event => {
									setFullName(event.target.value)
								}}
							/>
							<Stack
								direction={{ xs: 'column', sm: 'row' }}
								spacing={{ xs: 2, sm: 1 }}
							>
								<TextField
									fullWidth
									required
									type='email'
									label='Email'
									value={email}
									onChange={event => {
										setEmail(event.target.value)
									}}
								/>
								<TextField
									fullWidth
									required
									label='Username'
									value={username}
									onChange={event => {
										setUsername(event.target.value)
									}}
								/>
							</Stack>
							<h5
								style={{
									margin: 0,
									marginTop: 20,
									color: 'rgba(0, 0, 0, 0.8)',
									fontWeight: 500,
								}}
							>
								API Settings
							</h5>
							<Stack
								direction={{ xs: 'column', sm: 'row' }}
								spacing={{ xs: 2, sm: 1 }}
							>
								<TextField
									fullWidth
									required
									type='text'
									label='Open AI Secret'
									value={openAiSecret}
									onChange={event => {
										setOpenAiSecret(event.target.value)
									}}
								/>
								<TextField
									fullWidth
									required
									label='Organisation ID'
									value={organizationId}
									onChange={event => {
										setOrganizationId(event.target.value)
									}}
								/>
							</Stack>
							<h5
								style={{
									margin: 0,
									marginTop: 20,
									color: 'rgba(0, 0, 0, 0.8)',
									fontWeight: 500,
								}}
							>
								Wallet Settings
							</h5>
							<Box>
								<Button variant='contained' onClick={connectWallet}>
									Connect Wallet
								</Button>
							</Box>
						</Stack>

						<Box sx={{ textAlign: 'end', marginTop: 2 }}>
							<Button
								variant='contained'
								sx={{ textAlign: 'end' }}
								onClick={handleSettingsUpdate}
							>
								Save
							</Button>
						</Box>
					</Box>
				</Container>
			</Box>
		</Container>
	)
}
