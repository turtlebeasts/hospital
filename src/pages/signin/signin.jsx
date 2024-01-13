import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { Card, CardContent, ThemeProvider, createTheme } from '@mui/material';

export default function SignIn() {

  const [reload, setReload] = React.useState(false)
  const [type, setType] = React.useState('1')
  const [email, setEmail] = React.useState('')
  const [password, setPass] = React.useState('')
  const [emailErr, setEmailErr] = React.useState(false)
  const [passErr, setPassErr] = React.useState(false)

  React.useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    if(user !== null && user.type==6){
      window.location.href = "/herbs"
      return
    }
    if (user !== null) {
      window.location.href = "/"
    }
  }, [reload])
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(email==''){
      setEmailErr(true)
      return
    }
    if(password==''){
      setPassErr(true)
      return
    }
    const post_data = {
      email: email,
      password: password,
      type: type
    }
    fetch(`${import.meta.env.VITE_SITENAME}/hospital/login.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post_data)
    })
      .then(res => res.text())
      .then(data => {
        if (data == 200) {
          sessionStorage.setItem('user', JSON.stringify(post_data))
          setReload(true)
        } else {
          alert("Incorrect email or password")
        }
      })
      .catch(error => console.error("Error", error))
  };

  const theme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ height: '100vh', }}>
        <Grid item xs={12} md={6} sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ p: 2 }}>
            <Card sx={{
              boxShadow: '-10px 0px 30px 1px black',
              borderRadius: '30px',
              color: 'white', height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
            }}>
              <CardContent>
                <Typography variant='h3' style={{ textAlign: 'center', fontWeight: 900 }}>Login</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  error={emailErr}
                  helperText={emailErr ? "Email is required" : ""}
                  inputProps={{
                    autoComplete: 'off',
                    form: {
                      autoComplete: 'off'
                    }
                  }}
                  value={email}
                  onClick={() => setEmailErr(false)}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={passErr}
                  helperText={passErr ? "Password is required" : ""}
                  inputProps={{
                    autoComplete: 'off',
                    form: {
                      autoComplete: 'off'
                    }
                  }}
                  value={password}
                  onClick={() => setPassErr(false)}
                  onChange={(e) => setPass(e.target.value)}
                />
                <Select
                  sx={{ mt: 2 }}
                  name="type"
                  label="Account Type"
                  value={type}
                  onChange={e => setType(e.target.value)}
                  required
                  fullWidth
                >
                  <MenuItem value="1">Admin</MenuItem>
                  <MenuItem value="2">Doctor (Diagnosis)</MenuItem>
                  <MenuItem value="3">Doctor (Medicine)</MenuItem>
                  <MenuItem value="4">Reviewer</MenuItem>
                  <MenuItem value="5">Reception</MenuItem>
                  <MenuItem value="6">Media</MenuItem>
                </Select>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="info"
                    sx={{ margin: 'auto', mt: 3, mb: 2, pl: '2rem', pr: '2rem' }}
                  >
                    Sign In
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{
          height: { xs: '0', sm: '100vh' },
          backgroundColor: 'white',
          backgroundPosition: 'center',
          backgroundSize: 'auto 100%',
          borderRadius: '15px 0 0 15px',
          boxShadow: '10px 0px 30px 1px black',
          display: { xs: 'none', sm: 'flex' },
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F1946759%2Fscreenshots%2F4596801%2Fadmin.png&f=1&nofb=1&ipt=2dab34edc1bfadf95a88a398dbf145ec911a19a1c0eba880a86a747345874260&ipo=images' width={'80%'} style={{ borderRadius: '30px' }} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}