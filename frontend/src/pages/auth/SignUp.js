import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import Checkbox from '@mui/material/Checkbox'
import { Link, useNavigate } from "react-router-dom"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import "./Styles.css"

// Benny here
import { register } from "../../actions/userActions"
import { useDispatch, useSelector } from "react-redux"

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      className='auth-typo'
      {...props}
    >
      {"Copyright © "}
      <Link to='/' style={{ color: "#9C27B0", textDecoration: "none" }}>
        Pinky Web 3
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const theme = createTheme()

export default function SignUp(props) {
  const [name, setName] = React.useState("")
  const [username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")

  const userRegister = useSelector((state) => state.userRegister)
  const { userInfo, loading, error } = userRegister
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match")
    } else {
      dispatch(register(name, username, email, password))
    }
  }

  React.useEffect(() => {
    if (userInfo) {
      navigate("/")
    }
  }, [userInfo])

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className='auth-card'
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='given-name'
                  name='name'
                  required
                  fullWidth
                  id='name'
                  label='Full Name'
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                  autoComplete='family-name'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  autoComplete='new-password'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='confirmPassword'
                  label='Confirm Password'
                  type='assword'
                  id='confirmPassword'
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                  }}
                  autoComplete='new-password'
                />
              </Grid>
              {/* <Grid item xs={12}>
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
									label='I want to receive inspiration, marketing promotions and updates via email.'
								/>
							</Grid> */}
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#F25672",
                color: "#fff !important",
                "&:hover": { backgroundColor: "#C83B55" },
              }}
            >
              Sign Up
            </Button>
            <Grid
              container
              justifyContent='flex-end'
              sx={{
                "& a": {
                  color: "rgba(25, 118, 210,0.8)",
                  fontSize: 14,
                  transition: "100ms",
                  "&:hover": { color: "rgba(25, 118, 210,1)" },
                },
              }}
            >
              <Grid item>
                <Link to='/signin' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ my: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
