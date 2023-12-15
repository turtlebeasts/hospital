import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
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
    const user = sessionStorage.getItem('user')
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
      <Grid container sx={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497449493050-aad1e7cad165?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: { xs: 'cover', sm: '50% 100%' }, height: '100vh' }}>
        <Grid item xs={12} md={6} sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ p: 2 }}>
            <Card sx={{
              borderRadius: '30px',
              color: 'white', backgroundImage: 'url(https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?q=80&w=1136&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover', height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
            }}>
              <CardContent>
                <Typography variant='h3' style={{textAlign: 'center', fontWeight: 900}}>Login</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  error={emailErr}
                  helperText={emailErr?"Email is required":""}
                  inputProps={{
                    autoComplete: 'off',
                    form: {
                      autoComplete: 'off'
                    }
                  }}
                  value={email}
                  onClick={()=>setEmailErr(false)}
                  onChange={(e)=>setEmail(e.target.value)}
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
                  helperText={passErr?"Password is required":""}
                  inputProps={{
                    autoComplete: 'off',
                    form: {
                      autoComplete: 'off'
                    }
                  }}
                  value={password}
                  onClick={()=>setPassErr(false)}
                  onChange={(e)=>setPass(e.target.value)}
                />
                <Select
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
                </Select>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="info"
                    sx={{ margin: 'auto', mt: 3, mb: 2, borderRadius: '15px' }}
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
          backgroundImage: 'url(https://images.unsplash.com/photo-1504567961542-e24d9439a724?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundPosition: 'center',
          backgroundSize: 'auto 100%',
          borderRadius: '15px 0 0 15px',
          boxShadow: '10px 0px 30px 1px black',
          display: {xs:'none',sm: 'flex'},
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <Typography variant="h1" sx={{fontWeight: 900, textShadow: '2px 0px 10px black', pl: 5, boxSizing: 'border-box', color: '#FFF', width: '100%'}}>
            We provide
          </Typography>
          <Typography variant="h1" sx={{fontWeight: 900, textShadow: '2px 0px 10px black', pl: 5, boxSizing: 'border-box', color: '#29FFBF', width: '100%'}}>
            extensive
          </Typography>
          <Typography variant="h1" sx={{fontWeight: 900, textShadow: '2px 0px 10px black', pl: 5, boxSizing: 'border-box', color: '#FFF', width: '100%'}}>
            care for
          </Typography>
          <Typography variant="h1" sx={{fontWeight: 900, textShadow: '2px 0px 10px black', pl: 5, boxSizing: 'border-box', color: '#FFF', width: '100%'}}>
            all your
          </Typography>
          <Typography variant="h1" sx={{fontWeight: 900, textShadow: '2px 0px 10px black', pl: 5, boxSizing: 'border-box', color: '#29FFBF', width: '100%'}}>
            ailments
          </Typography>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}