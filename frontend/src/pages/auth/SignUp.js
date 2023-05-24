import { useEffect, useState } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import { Link, useNavigate, useNavigation } from "react-router-dom"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import "./Styles.css"
// Benny here
import { useSelector, useDispatch } from "react-redux"
import { register } from "../../actions/userActions"
const theme = createTheme()

export default function SignUp(props) {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userRegister = useSelector((state) => state.userRegister)
  const { userInfo, loading, error } = userRegister

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match")
    } else {
      dispatch(register(name, username, email, password))
    }
  }

  useEffect(() => {
    if (userInfo) {
      navigate("/")
    }
  }, [navigate, userInfo])

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        {loading ? (
          <div>registering user.</div>
        ) : error ? (
          <div>error occured</div>
        ) : (
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
              action='post'
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='given-name'
                    name='firstName'
                    required
                    fullWidth
                    id='fullName'
                    label='Full Name'
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name='userName'
                    required
                    fullWidth
                    id='userName'
                    label='Username'
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    onChange={(e) => setEmail(e.target.value)}
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
                    autoComplete='new-password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='confirmPassword'
                    label='Confirm Password'
                    type='password'
                    id='confirmPassword'
                    autoComplete='new-password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value='remember'
                        sx={{
                          color: "#F25672",
                          "&.Mui-checked": {
                            color: "#F25672",
                          },
                        }}
                      />
                    }
                    label='I want to receive inspiration, marketing promotions and updates via email.'
                  />
                </Grid>
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
        )}
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}

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
