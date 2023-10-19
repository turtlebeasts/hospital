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

const Modal = ({ data, setReload }) => {
  const [medicine, setMedicine] = useState([])
  const [open, setOpen] = useState(false)
  const user = JSON.parse(sessionStorage.getItem('user'))

  useEffect(() => {
    async function getMedicine() {
      const response = await fetch("http://localhost/hospital/medicine.php?medicine=")
      const result = await response.json()
      setMedicine(result)
    }
    getMedicine()
  }, [])

  const [medicines, setMedicines] = useState([{ name: '', quantity: 0, dosage: 0, instruction: '' }]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newMedicines = [...medicines];
    newMedicines[index][name] = name === 'instruction' ? value : value >= 0 ? value : 0;
    setMedicines(newMedicines);
  };

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: '', quantity: 0, dosage: 0, instruction: '' }]);
  };

  const handleRemoveMedicine = (index) => {
    const newMedicines = [...medicines];
    if (medicines.length > 1) {
      newMedicines.splice(index, 1);
      setMedicines(newMedicines);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const post_data = {
      "diag_ID": data.diag_ID,
      "prescription": medicines,
    }

    fetch("http://localhost/hospital/prescribe.php", {
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


  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Prescribe</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Typography variant="h6">
              {data.date}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Add medicine
            </Typography>
            {medicines.map((med, index) => (
              <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel>Medicine</InputLabel>
                    <Select
                      name="name"
                      label="Medicine"
                      value={med.name}
                      fullWidth
                      required
                      onChange={(e) => handleInputChange(index, e)}
                    >
                      {
                        medicine.map((item, key) => <MenuItem key={key} value={item.medicine_ID}>{item.name}({item.generic_name})</MenuItem>)
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    type="number"
                    label="Cup of water"
                    name="quantity"
                    value={med.quantity}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    type="number"
                    label="Times perday"
                    name="dosage"
                    value={med.dosage}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type="text"
                    label="Instruction"
                    name="instruction"
                    value={med.instruction}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  {index === medicines.length - 1 && (
                    <IconButton type="button" onClick={handleAddMedicine}>
                      <AddIcon />
                    </IconButton>
                  )}
                </Grid>
                <Grid item xs={1}>
                  <IconButton type="button" onClick={() => handleRemoveMedicine(index)} disabled={medicines.length > 1 ? false : true}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
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
      {/* <Button variant="contained" sx={{ mt: 2, ml: 2 }} size="small">
        Print
      </Button> */}
    </>
  );
};

export default Modal;

