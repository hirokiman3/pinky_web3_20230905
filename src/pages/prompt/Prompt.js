import React from 'react'
import PromptField from './PromptField'
import { Box, Container } from '@mui/material'
import NftGallery from './NftGallery'

export default function Prompt() {
	return (
		<Container>
			<Box sx={{ width: '98%', margin: '0 auto', marginTop: 15 }}>
				<h4 className='m-0 mb-1'>Lets imagine a cool NFT</h4>
			</Box>
			<PromptField />
			<NftGallery />
		</Container>
	)
}
