import { Box, Container } from '@mui/material'
import DashboardButton from './DashboardButton'
import Logo from './Logo'
import AccountMenu from './AccountMenu'
import { Context } from '../App'
import { useContext } from 'react'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import './Style.css'

function Navbar() {
	const { isDarkMode, setIsDarkMode, userInfo } = useContext(Context)
	const handleModeChange = e => {
		const checked = e.target.checked
		setIsDarkMode(checked)
		document.body.classList.toggle('dark-mode', checked)
		document.body.classList.toggle('bright-mode', !checked)
	}

	return (
		<Box sx={{ marginY: 2 }} className='navbar'>
			<Container>
				<Box
					sx={{
						display: 'flex',
						gap: 1,
						justifyContent: 'space-between',
						alignItems: 'center',
						textAlign: { xs: 'center', sm: 'left' },
					}}
				>
					<Logo
						sx={{
							maxWidth: 120,
							'&:hover': { cursor: 'pointer' },
						}}
						isDarkMode={isDarkMode}
					/>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Box className='toggle-switch'>
							<input
								type='checkbox'
								id='toggle'
								className='toggle-input'
								checked={isDarkMode}
								onChange={handleModeChange}
							/>
							<label htmlFor='toggle' className='toggle-label'>
								<LightModeRoundedIcon />
								<DarkModeRoundedIcon />
							</label>
						</Box>
						{userInfo ? (
							<AccountMenu userInfo={userInfo} />
						) : (
							<DashboardButton />
						)}
					</Box>
				</Box>
			</Container>
		</Box>
	)
}

export default Navbar
