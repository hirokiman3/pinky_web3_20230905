import React, { useContext } from 'react'
import TypeWriter from '../../components/Typewriter'
import { Box, Container } from '@mui/material'
import './Style.css'
import Lottie from 'lottie-react'
import HeroAnimation from '../../assets/lottie-animations/hero-animation.json'
import DiscordIcon from '../../components/Icons/DiscordIcon'

function Hero() {
	const isDarkMode = useContext('ThemeContext')
	const typeWriter = ['Efficiency.', 'Flowchart.', 'Watermelons.', 'Brains.']

	return (
		<Container sx={{ textAlign: 'center' }}>
			<Box
				sx={{
					margin: '0 auto',
					marginTop: { sx: 0, sm: -8 },
					width: { xs: 200, md: 280 },
				}}
			>
				<Lottie animationData={HeroAnimation} />
			</Box>
			<Box
				sx={{
					fontSize: { xs: 15, sm: 25 },
					marginTop: -3,
				}}
			>
				<h1 style={{ margin: 0 }}>
					AI Generator for minting
					<Box
						component='div'
						sx={{
							color: '#E04562',
							fontFamily: 'Dancing Script',
							fontSize: { xs: 60, sm: 80 },
							fontWeight: 700,
							marginTop: -2,
						}}
					>
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
			<button className='cta'>
				<DiscordIcon size='24px' />
				Discord
			</button>
		</Container>
	)
}

export default Hero
