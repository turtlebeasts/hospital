import { useParams } from "react-router-dom"
import {useEffect, useState} from "react"
import Grid from "@mui/material/Grid"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

export default function Diagnosis(){

  const [date, setValue] = useState(dayjs(''))
  const [diag, setDiag] = useState([])
  const [reload, setReload] = useState(false)

  let { id } = useParams()
  useEffect(()=>{
    async function getDiagnosis(id){
      const response = await fetch("http://localhost/hospital/index.php?getDiag="+id)
      const result = await response.json()
      setDiag(result)
    }
    setReload(false)
    getDiagnosis(id)
  },[reload])

  async function handleSubmit(e){
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const post_data = {
      patient_ID: id,
      date: `${date.$D}/${date.$M + 1}/${date.$y}`,
      diagnosis: data.get('diagnosis'),
      initial_remarks: data.get('initial_remarks'),
    }
    fetch("http://localhost/hospital/diag.php", {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(post_data)
    })
    .then(res=>res.text())
    .then((data)=>{
      e.target.reset()
    })
    .catch(error=>console.error("Error", error))

    setReload(true)
  }
  return(
    <Box
      sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
    >
    <Grid container spacing={2} maxWidth="md">
      {
        diag.length?
              diag.map(diag=>
                <Grid item xs={12} key={diag.diag_ID}>
                  <Card>
                    <CardContent>
                      <Typography
                        variant="p"
                      >
                        Date : {diag.date}
                      </Typography>
                      <br/>
                      <br/>
                      <Typography
                        variant="p"
                      >
                        Diagnosis : {diag.diagnosis}
                      </Typography><br/>
                      <Typography
                        variant="p"
                      >
                        Initial Remarks : {diag.initial_remarks}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
        :
        <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  No previous Diagnosis found!
                </Typography>
              </CardContent>
            </Card>
        </Grid>
      }
      <Grid item xs={12}>
        <Card>
          <CardContent component="form" onSubmit={handleSubmit}>
            <Typography
              variant="h6"
              sx={{mb: 2}}
            >
              Add new diagnosis
            </Typography>

            <Typography
              component="p"
              sx={{mb:2}}
            >Diagnosis date </Typography>
            <LocalizationProvider
            dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="date"
                  sx={{mb:2}}
                  onChange={(newValue)=>setValue(newValue)}
                />
            </LocalizationProvider>

            <Typography
              component="p"
              sx={{mb:2}}
            >Diagnosis </Typography>
            <TextField
              autoComplete="given-name"
              name="diagnosis"
              required
              fullWidth
              label="Diagnosis"
              sx={{mb:2}}
            />

            <Typography
              component="p"
              sx={{mb:2}}
            >Initial Remarks </Typography>
            <TextField
              multiline
              rows={3}
              autoComplete="given-name"
              name="initial_remarks"
              required
              fullWidth
              label="Initial Remarks"
              sx={{mb:2}}
            />

            <Button type="submit" variant="contained" >
              Submit
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </Box>
  )
}
