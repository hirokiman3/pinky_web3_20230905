import React from 'react'
import TypeWriter from '../../components/Typewriter'
import { Box, Container } from '@mui/material'
import './Style.css'
import Lottie from 'lottie-react'
import Robot from '../../assets/lottie-animations/robot.json'

function Hero({ isDarkMode }) {
	const typeWriter = ['efficiency', 'flowchart', 'watermelons', 'brains']

	return (
		<Container sx={{ textAlign: 'center' }}>
			<Lottie
				animationData={Robot}
				style={{ width: 300, height: 250, margin: '0 auto', marginTop: -20 }}
			/>
			<Box
				sx={{
					fontSize: { sx: 20, sm: 25 },
					marginTop: -5,
				}}
			>
				<h1 style={{ margin: 0 }}>
					AI-powered chatbot for creating
					<Box component='div' sx={{ color: '#E04562' }}>
						<TypeWriter data={typeWriter} isDarkMode={isDarkMode} />
					</Box>
				</h1>
			</Box>
			<Box sx={{ maxWidth: 500, marginX: 'auto' }}>
				<p className='color-muted'>
					Create original, plagiarism-free material for your website, emails,
					advertising, and blogs 10X faster.
				</p>
			</Box>
			<button className='cta'>Join Discord</button>
		</Container>
	)
}

export default Hero
