import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

function ConnectButton() {
	return (
		<Link to='/signin'>
			<Button
				variant='contained'
				sx={{
					borderRadius: 10,
					border: 'transparent',
					fontWeight: 400,
					whiteSpace: 'nowrap',
				}}
			>
				Generate NFT
			</Button>
		</Link>
	)
}

export default ConnectButton
