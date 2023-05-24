import { Box, Button, Container, Grid, Stack, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { Context } from '../../App'

export default function UserSettings() {
	const { userInfo } = useContext(Context)

	// State Variables
	const [fullName, setFullName] = useState(userInfo.name)
	const [email, setEmail] = useState(userInfo.email)
	const [username, setUsername] = useState(userInfo.username)

	const handleSettingsUpdate = () => {
		// Write code to handle update
	}
	return (
		<Container maxWidth='md'>
			<Grid
				container
				sx={{
					backgroundColor: '#fff',
					boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
					padding: 4,
					borderRadius: 2,
					width: '100%',
					marginTop: 5,
					paddingBottom: 10,
				}}
			>
				<Grid item xs={12} md={4} lg={3}>
					<Box>
						<ul>
							<li>
								<a href='#'>Nothing</a>
							</li>
							<li>
								<a href='#'>Nothing</a>
							</li>
							<li>
								<a href='#'>Nothing</a>
							</li>
							<li>
								<a href='#'>Nothing</a>
							</li>
						</ul>
					</Box>
				</Grid>
				<Grid item xs={12} md={8} lg={9}>
					<Box component='form'>
						<h3 style={{ marginBottom: 20, color: 'rgba(0, 0, 0, 0.8)' }}>
							Account Settings
						</h3>
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
							<Box
								sx={{
									display: 'flex',
									flexDirection: { xs: 'column', sm: 'row' },
									gap: { xs: 2, sm: 1 },
								}}
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
				</Grid>
			</Grid>
		</Container>
	)
}
