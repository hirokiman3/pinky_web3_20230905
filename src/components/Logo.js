import { Box } from '@mui/material'
import brightLogo from '../assets/images/logo_white.png'
import darkLogo from '../assets/images/logo.png'

function Logo({ sx, isDarkMode }) {
	return (
		<Box sx={{ ...sx }}>
			<img
				src={isDarkMode ? brightLogo : darkLogo}
				className='img-fluid'
				alt=''
			/>
		</Box>
	)
}

Logo.defaultProps = {
	isDarkMode: true,
}

export default Logo
