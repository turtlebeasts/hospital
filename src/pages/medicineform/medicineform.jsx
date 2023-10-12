import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const MedicineTable = (props) => {
  const medicineList = props.list
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Medicine Table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Generic Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Manufacturer</TableCell>
            <TableCell>Dosage</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medicineList.map((medicine, index) => (
            <TableRow key={index}>
              <TableCell>{medicine.name}</TableCell>
              <TableCell>{medicine.generic_name}</TableCell>
              <TableCell>{medicine.description}</TableCell>
              <TableCell>{medicine.man_name}</TableCell>
              <TableCell>{medicine.dosage_name}</TableCell>
              <TableCell>{medicine.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const MedicineForm = () => {

  const [man, setMan] = useState([])
  const [dosage, setDosage] = useState([])
  const [medicineList, setMedicineList] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(()=>{
    async function getManufacturer(){
      const response = await fetch("http://localhost/hospital/medicine.php?manufacturer=")
      const result = await response.json()
      setMan(result)
    }
    async function getDosage(){
      const response = await fetch("http://localhost/hospital/medicine.php?dosage_form=")
      const result = await response.json()
      setDosage(result)
    }
    async function getMedicine(){
      const response = await fetch("http://localhost/hospital/medicine.php?medicine=")
      const result = await response.json()
      setMedicineList(result)
    }
    getMedicine()
    getManufacturer()
    getDosage()
    setReload(false)
  },[reload])

  const [medicineData, setMedicineData] = useState({
    name: '',
    generic_name: '',
    description: '',
    man_name: '',
    dosage_name: '',
    price: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicineData({
      ...medicineData,
      [name]: value,
    });
  };

  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    const post_data = {
      name: data.get('name'),
      generic_name: data.get('generic_name'),
      description: data.get('description'),
      man_ID: data.get('man_name'),
      dosage_ID: data.get('dosage_name'),
      price: data.get('price')
    }
    fetch("http://localhost/hospital/medicine.php", {
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
    formRef.current.reset();
    setMedicineData({
      name: '',
      generic_name: '',
      description: '',
      man_name: '',
      dosage_name: '',
      price: '',
    })
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Grid container spacing={2} sx={{mt: 2, padding: 5}} maxWidth="md">
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={medicineData.name}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Generic Name"
            name="generic_name"
            value={medicineData.generic_name}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={medicineData.description}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Manufacturer</InputLabel>
            <Select
              label="Manufacturer"
              name="man_name"
              value={medicineData.man_name}
              onChange={handleInputChange}
              required
            >
              {
                man.map((item, key)=>
                  <MenuItem value={item.man_ID} key={key}>{item.man_name}</MenuItem>
                )
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
          <InputLabel>Dosage Form</InputLabel>
            <Select
              label="Dosage Form"
              name="dosage_name"
              value={medicineData.dosage_name}
              onChange={handleInputChange}
              required
            >
              {
                dosage.map((item, key)=>
                  <MenuItem value={item.dosage_ID} key={key}>{item.dosage_name}</MenuItem>
                )
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={medicineData.price}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
        <Grid item xs={12}>
          <MedicineTable list={medicineList}/>
        </Grid>
      </Grid>
    </form>
  );
};

export default MedicineForm;
