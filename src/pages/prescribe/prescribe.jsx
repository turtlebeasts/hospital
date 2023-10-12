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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Modal from "../../components/modal/modal"
import Prescription from "../../components/prescription/prescription"
import Box from "@mui/material/Box"

export default function Prescribe(){

  const [date, setValue] = useState(dayjs(''))
  const [diag, setDiag] = useState([])
  const [reload, setReload] = useState(false)
  const [panel, setPanel] = useState(0)
  
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
    .then(data=>{
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
      <Grid item xs={12} key={diag.diag_ID}>
      {
        diag.length?
              diag.map((diag, key)=>
                
              <Accordion key={diag.diag_ID} expanded={panel===key} onChange={()=>setPanel(key)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{diag.date}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="h6"
                  >
                    Name : {`${diag.first_name} ${diag.middle_name} ${diag.last_name}`}
                  </Typography>
                  <Typography
                    variant="p"
                  >
                    Diagnosis : {diag.diagnosis}
                  </Typography><br/>
                  <Typography
                    variant="p"
                  >
                    Initial Remarks : {diag.initial_remarks}
                  </Typography><br/>
                  <Prescription diag_ID={diag.diag_ID} reload={reload}/><br/>
                  <Modal data={diag} setReload={setReload}/>
                </AccordionDetails>
              </Accordion>
              )

        :
        <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  No Diagnosis found!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  You can prescribe medicines once diagnosis is done completely
                </Typography>
              </CardContent>
            </Card>
        </Grid>
      }
      </Grid>
    </Grid>
    </Box>
  )
}
