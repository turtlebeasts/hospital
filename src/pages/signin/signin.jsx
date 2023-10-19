import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { Card, CardContent } from '@mui/material';

const defaultTheme = createTheme();
const style = {
  backgroundColor: 'white'
}

export default function SignIn() {

  const [reload, setReload] = React.useState(false)
  const [type, setType] = React.useState(1)

  React.useEffect(() => {
    const user = sessionStorage.getItem('user')
    if (user !== null) {
      window.location.href = "/"
    }
  }, [reload])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const post_data = {
      email: data.get('email'),
      password: data.get('password'),
      type: data.get('type')
    }

    fetch("http://localhost/hospital/login.php", {
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
          alert("Error inserting")
        }
      })
      .catch(error => console.error("Error", error))
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Grid container>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, p: 2 }}>
            <Card>
              <CardContent>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="info"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    </Container>
  );
}