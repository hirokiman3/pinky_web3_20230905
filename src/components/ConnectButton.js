import { Button } from '@mui/material'
import React from 'react'

function ConnectButton({ isDarkMode }) {
	return (
		<Button
			variant='contained'
			sx={{
				backgroundColor: '#F25672',
				borderRadius: 10,
				border: 'transparent',
				'&:hover': { backgroundColor: '#D93F5C' },
			}}
		>
			Connect Wallet
		</Button>
	)
}

export default ConnectButton
