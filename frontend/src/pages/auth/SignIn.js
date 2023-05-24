import { useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import './Styles.css'

// benny
import { signin } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const theme = createTheme()

export default function SignIn(props) {
	const dispatch = useDispatch()
	const userSignin = useSelector(state => state.userSignin)
	const { userInfo, loading, error } = userSignin
	const navigate = useNavigate()

	// const redirect = props.location.search
	//   ? props.location.search.split("=")[1]
	//   : "/"

	useEffect(() => {
		if (userInfo) {
			navigate('/')
		}
	}, [navigate, userInfo])

	const handleSubmit = event => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		dispatch(signin(data.get('email'), data.get('password')))
	}

	return (
		<ThemeProvider theme={theme}>
			{loading ? (
				<div>loging...</div>
			) : error ? (
				<div>error occured while signin...</div>
			) : (
				<Container component='main' maxWidth='xs'>
					<CssBaseline />
					<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
						className='auth-card'
					>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Sign in
						</Typography>
						<Box
							component='form'
							onSubmit={handleSubmit}
							noValidate
							sx={{ mt: 1 }}
						>
							<TextField
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								autoFocus
							/>
							<TextField
								margin='normal'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
							/>
							<FormControlLabel
								control={
									<Checkbox
										value='remember'
										sx={{
											color: '#F25672',
											'&.Mui-checked': {
												color: '#F25672',
											},
										}}
									/>
								}
								label='Remember me'
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{
									mt: 3,
									mb: 2,
									backgroundColor: '#F25672',
									color: '#fff !important',
									'&:hover': { backgroundColor: '#C83B55' },
								}}
							>
								Sign In
							</Button>
							<Grid
								container
								sx={{
									'& a': {
										color: 'rgba(25, 118, 210,0.8)',
										fontSize: 14,
										transition: '100ms',
										'&:hover': { color: 'rgba(25, 118, 210,1)' },
									},
								}}
							>
								<Grid item xs>
									<Link to='/forgot'>Forget Password?</Link>
								</Grid>
								<Grid item>
									{/* {`/signup?redirect=${redirect}`} */}
									<Link to='/signup'>Don't have an account? Sign Up</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
					<Copyright sx={{ mt: 8, mb: 4 }} />
				</Container>
			)}
		</ThemeProvider>
	)
}

function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}
		>
			{'Copyright © '}
			<Link to='/' style={{ color: '#9C27B0', textDecoration: 'none' }}>
				Pinky Web 3
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}
