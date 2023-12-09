import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
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
import {createTheme, ThemeProvider} from '@mui/material/styles';
import dayjs from 'dayjs';
import {FormControl, FormLabel, Paper, Radio, RadioGroup} from '@mui/material';
import {styled} from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useNavigate} from "react-router-dom";

const defaultTheme = createTheme();

export default function Edit({detail}) {
    const navigate = useNavigate();
    // console.log(detail)
    const [dob, setValue] = React.useState(dayjs(''))
    const [images, setImages] = React.useState([]);
    const [images2, setImages2] = React.useState([]);
    const [reg, setReg] = React.useState(dayjs(''))
    const [error, setError] = React.useState(false)
    const [phoneNumber, setPhoneNumber] = React.useState(detail.phone);
    
    const handlePhoneNumberChange = (event) => { // Remove non-numeric characters
        const formattedPhoneNumber = event.target.value.replace(/\D/g, '');
        // Limit the input to 12 digits
        if (formattedPhoneNumber.length <= 12) {
            setPhoneNumber(formattedPhoneNumber);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const post_data = {
            registration: detail.patient_ID,
            firstName: data.get('firstName'),
            middleName: data.get('middleName'),
            lastName: data.get('lastName'),
            age: data.get('age'),
            gender: data.get('gender'),
            reg_date: detail.reg_date,
            email: data.get('email'),
            phone: data.get('phone'),
            address: data.get('address')
        }
        fetch(`${import.meta.env.VITE_SITENAME}/hospital/update.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post_data)
        }).then(res => res.text()).then(data => {
            if (data == 200) {
                alert("Update successful")
                navigate('/plist')
                return null
            } else {
                alert("Error inserting")
                console.log(data)
            }
        }).catch(error => console.error("Error", error))
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1
    });

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main">
                <CssBaseline/>
                <Box sx={
                    {
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start'
                    }
                }>
                    <Typography component="h1" variant="h5">
                        Update this patient form
                    </Typography>
                    <Box component="form"
                        onSubmit={handleSubmit}
                        sx={
                            {mt: 3}
                    }>
                        <Grid container
                            spacing={2}>
                            <Grid item
                                xs={6}
                                sm={12}>
                                <Typography component="p"
                                    sx={
                                        {mb: 2}
                                }>Date of registration ({detail.reg_date})
                                </Typography>
                            </Grid>
                            <Grid item
                                xs={6}
                                sm={12}>
                                <Typography component="p">
                                    Registration Number ({detail.patient_ID})
                                </Typography>
                            </Grid>
                            <Grid item
                                xs={12}
                                sm={12}>
                                <Typography component="p">
                                    Patient name
                                </Typography>
                            </Grid>
                            <Grid item
                                xs={12}
                                sm={4}>
                                <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First Name" defaultValue={detail.first_name}/>
                            </Grid>
                            <Grid item
                                xs={12}
                                sm={4}>
                                <TextField fullWidth id="middleName" label="Middle Name" name="middleName" autoComplete="family-name" defaultValue={detail.middle_name}/>
                            </Grid>
                            <Grid item
                                xs={12}
                                sm={4}>
                                <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name" defaultValue={detail.last_name}/>
                            </Grid>
                            <Grid item
                                xs={12}>
                                <Typography component="p"
                                    sx={
                                        {mb: 2}
                                }>Patient Age
                                </Typography>
                                <TextField type="number" id="lastName" label="Age" name="age" autoComplete="family-name" defaultValue={detail.age}/>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue={detail.gender}
                                        name="gender"
                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item
                                xs={12}
                                sm={6}>
                                <Typography component="p"
                                    sx={
                                        {mb: 2}
                                }>Email</Typography>
                                <TextField fullWidth id="email" label="Email Address" name="email" autoComplete="email" defaultValue={detail.email}/>
                            </Grid>
                            <Grid item
                                xs={12}
                                sm={6}>
                                <Typography component="p"
                                    sx={
                                        {mb: 2}
                                }>Phone
                                </Typography>
                                <TextField fullWidth name="phone" label="Phone" id="phone"
                                    value={phoneNumber}
                                    autoComplete=""
                                    onChange={handlePhoneNumberChange}
                                    inputProps={
                                        {
                                            max: 999999999999, // Maximum value (12 nines)
                                        }
                                    }/>
                            </Grid>
                            <Grid item
                                xs={12}>
                                <Typography component="p"
                                    sx={
                                        {mb: 2}
                                }>Address</Typography>
                                <TextField multiline
                                    rows={3}
                                    required
                                    fullWidth
                                    name="address"
                                    label="Address"
                                    type="text"
                                    id="address"
                                    defaultValue={detail.address}
                                    autoComplete=""/>
                            </Grid>
                        </Grid>
                        <Button type="submit" variant="contained"
                            sx={
                                {
                                    mt: 3,
                                    mb: 2
                                }
                            }
                            disabled={error}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
