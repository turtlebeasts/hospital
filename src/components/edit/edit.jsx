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
import {Paper} from '@mui/material';
import {styled} from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useNavigate} from "react-router-dom";

const defaultTheme = createTheme();

export default function Edit({detail}) {
    const navigate = useNavigate();
    const [dob, setValue] = React.useState(dayjs(''))
    const [images, setImages] = React.useState([]);
    const [images2, setImages2] = React.useState([]);
    const [reg, setReg] = React.useState(dayjs(''))
    const [error, setError] = React.useState(false)
    const [phoneNumber, setPhoneNumber] = React.useState('');
    
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
            registration: data.get('registration_number'),
            firstName: data.get('firstName'),
            middleName: data.get('middleName'),
            lastName: data.get('lastName'),
            p_firstName: data.get('p_firstName'),
            p_middleName: data.get('p_middleName'),
            p_lastName: data.get('p_lastName'),
            age: data.get('age'),
            reg_date: `${
                reg.$D
            }/${
                reg.$M + 1
            }/${
                reg.$y
            }`,
            email: data.get('email'),
            phone: data.get('phone'),
            address: data.get('address'),
            images: images2
        }
        fetch('http://localhost/hospital/index.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post_data)
        }).then(res => res.text()).then(data => {
            if (data == 300) {
                alert("Insert successful")
                navigate('/plist')
                return null
            } else if (data == 200) {
                alert('Registration Number already exist')
            } else {
                alert("Error inserting")
                console.log(data)
            }
            // console.log(data)
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

    const handleImageUpload = (e) => {
        const files = e.target.files;
        const imageArray = [];
        const imageArray2 = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const imageUrl = URL.createObjectURL(file);
            imageArray.push(imageUrl);

            const reader = new FileReader();
            reader.onload = (e) => {
                imageArray2.push(e.target.result);
            };

            reader.readAsDataURL(file);
        }
        setImages2(imageArray2);
        setImages(imageArray);
    };

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
                        New Patient Form
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
                                }>Date of registration
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker name="reg_date"
                                        onChange={
                                            (newValue) => setReg(newValue)
                                        }/>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item
                                xs={6}
                                sm={12}>
                                <Typography component="p">
                                    Registration Number
                                </Typography>
                            </Grid>
                            <Grid item
                                xs={12}
                                sm={4}>
                                <TextField error={error}
                                    autoComplete="given-name"
                                    name="registration_number"
                                    required
                                    fullWidth
                                    id="firstName"
                                    defaultValue={detail.patient_ID}
                                    label={"Registration Number"}
                                    helperText={
                                        error && "Cannot include /"
                                    }
                                    onChange={
                                        (e) => e.target.value.includes('/') ? setError(true) : setError(false)
                                    }/>
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
                                <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First Name"/>
                            </Grid>
                            <Grid item
                                xs={12}
                                sm={4}>
                                <TextField fullWidth id="middleName" label="Middle Name" name="middleName" autoComplete="family-name"/>
                            </Grid>
                            <Grid item
                                xs={12}
                                sm={4}>
                                <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name"/>
                            </Grid>
                            <Grid item
                                xs={12}
                                sm={12}>
                                <Typography component="p">Parent / Guardian / Spouse's Name
                                </Typography>
                            </Grid>
                            <Grid item
                                xs={12}
                                sm={4}>
                                <TextField autoComplete="given-name" name="p_firstName" fullWidth id="firstName" label="First Name"/>
                            </Grid>
                            <Grid item
                                xs={12}
                                sm={4}>
                                <TextField fullWidth id="middleName" label="Middle Name" name="p_middleName" autoComplete="family-name"/>
                            </Grid>
                            <Grid item
                                xs={12}
                                sm={4}>
                                <TextField fullWidth id="lastName" label="Last Name" name="p_lastName" autoComplete="family-name"/>
                            </Grid>
                            <Grid item
                                xs={12}>
                                <Typography component="p"
                                    sx={
                                        {mb: 2}
                                }>Patient Age
                                </Typography>
                                <TextField type="number" id="lastName" label="Age" name="age" autoComplete="family-name"/>
                            </Grid>
                            <Grid item
                                xs={12}
                                sm={6}>
                                <Typography component="p"
                                    sx={
                                        {mb: 2}
                                }>Email</Typography>
                                <TextField fullWidth id="email" label="Email Address" name="email" autoComplete="email"/>
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
                                    autoComplete=""/>
                            </Grid>
                            <Grid item
                                xs={12}>
                                <Typography component="p"
                                    sx={
                                        {mb: 2}
                                }>
                                    Previous diagnosis images (if any)
                                </Typography>
                                <Button component="label" variant="contained"
                                    startIcon={<CloudUploadIcon/>}>
                                    Upload file
                                    <VisuallyHiddenInput type="file" multiple
                                        onChange={handleImageUpload}
                                        name="images"/>
                                </Button>
                            </Grid>
                            <Grid item
                                xs={12}>
                                <Grid container
                                    spacing={1}>
                                    {
                                    images.map((imageUrl, index) => (
                                        <Grid item
                                            key={index}>
                                            <img src={imageUrl}
                                                alt={
                                                    `Image ${index}`
                                                }
                                                width='50px'
                                                height="50px"/>
                                        </Grid>
                                    ))
                                } </Grid>
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
