import { Box, Container } from '@mui/material'
import Lottie from 'lottie-react'
import anim404 from '../../assets/lottie-animations/404.json'
import { Link } from 'react-router-dom'

export default function Error404() {
	return (
		<Container
			maxWidth='sm'
			sx={{ textAlign: 'center' }}
			className='errors-page'
		>
			<Box sx={{ maxWidth: 350, margin: '0 auto', marginTop: 10 }}>
				<Lottie animationData={anim404} />
			</Box>
			<Link to='/'>Redirect to Home</Link>
		</Container>
	)
}
