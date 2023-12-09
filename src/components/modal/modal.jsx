import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel"
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton"
import DeleteIcon from '@mui/icons-material/Delete';
import { Autocomplete } from '@mui/material';


const Modal = ({ data, setReload }) => {
  const [medicine, setMedicine] = useState([])
  const [medicines, setMedicines] = useState({})
  const [open, setOpen] = useState(false)
  const user = JSON.parse(sessionStorage.getItem('user'))

  useEffect(() => {
    async function getMedicine() {
      const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/medicine.php?medicine=`)
      const result = await response.json()
      setMedicine(result)
    }
    getMedicine()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const post_data = {
      "diag_ID": data.diag_ID,
      "prescription": medicines,
    }

    fetch(`${import.meta.env.VITE_SITENAME}/hospital/prescribe.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post_data)
    })
      .then(res => res.text())
      .then(data => {
        if (data == 200) {
          setReload(true)
          setOpen(false)
        } else {
          console.log(data)
          alert("Error inserting")
        }
      })
      .catch(error => console.error("Error", error))
  };

  const [med1, setMed1] = useState('')
  const [solute, setSolute] = useState('')
  const [times, setTimes] = useState(0)
  const [instruction, setInstruction] = useState('')

  const handleAdd = () => {
    setMedicines({
      
    })
  }
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Prescribe medicines for diagnosis on date {data.date}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>


            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Medicine</InputLabel>
                  <Select
                    sx={{ mb: 2 }}
                    name="name"
                    label="Medicine"
                    value={med1}
                    fullWidth
                    required
                    onChange={(e) => setMed1(e.target.value)}
                  >
                    {
                      medicine.map((item, key) => <MenuItem key={key} value={item.medicine_ID}>{item.name}({item.generic_name})</MenuItem>)
                    }
                  </Select>
                  <TextField
                    sx={{ mb: 2 }}
                    type="text"
                    label="Mix with"
                    name="solute"
                    value={solute}
                    onChange={(e) => setSolute(e.target.value)}
                  />
                  <TextField
                    sx={{ mb: 2 }}
                    type="number"
                    label="Times perday"
                    name="dosage"
                    value={times}
                    onChange={(e) => setTimes(e.target.value <= 0 ? 0 : e.target.value)}
                  />
                  <TextField
                    sx={{ mb: 2 }}
                    type="text"
                    label="Instruction"
                    name="instruction"
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                  />
                </FormControl>
                <Button variant='contained' onClick={handleAdd}>Add</Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {user.type == '3' || user.type == '1' ?
        <Button variant="outlined" sx={{ mt: 2 }} size="small" onClick={() => setOpen(true)}>
          Prescribe
        </Button> : ""
      }
    </>
  );
};

export default Modal;

