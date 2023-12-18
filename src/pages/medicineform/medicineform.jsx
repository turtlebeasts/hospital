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
import DeleteModal2 from '../../components/deletemodal2/deletemodal2';

const user = JSON.parse(sessionStorage.getItem('user'))

const MedicineTable = (props) => {

  const medicineList = props.list
  const setReload = props.reload

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Medicine Table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Direction of use</TableCell>
            <TableCell>Dosage</TableCell>
            {
              user.type == '1' ?
                <TableCell>Action</TableCell>
                : ""
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {medicineList.map((medicine, index) => (
            <TableRow key={index}>
              <TableCell>{medicine.generic_name} ({medicine.name})</TableCell>
              <TableCell>{medicine.description}</TableCell>
              <TableCell>{medicine.dosage_name}</TableCell>
              {
                user.type == '1' ?
                  <TableCell>
                    <DeleteModal2 deleteID={medicine.medicine_ID} reload={setReload}/>
                  </TableCell>
                  : ""
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const MedicineForm = () => {

  const [dosage, setDosage] = useState([])
  const [medicineList, setMedicineList] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    async function getDosage() {
      const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/medicine.php?dosage_form=`)
      const result = await response.json()
      setDosage(result)
    }
    async function getMedicine() {
      const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/medicine.php?medicine=`)
      const result = await response.json()
      setMedicineList(result)
    }
    getMedicine()
    getDosage()
    setReload(false)
  }, [reload])

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
      man_ID: 6,
      dosage_ID: data.get('dosage_name'),
      price: 0
    }
    fetch(`${import.meta.env.VITE_SITENAME}/hospital/medicine.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post_data)
    })
      .then(res => res.text())
      .then(data => {
        e.target.reset()
      })
      .catch(error => console.error("Error", error))
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
    <form onSubmit={handleSubmit} ref={formRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container spacing={2} sx={{ mt: 2, padding: 5 }} maxWidth="md">
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
            label="Name in Assamese"
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
            <InputLabel>Dosage Form</InputLabel>
            <Select
              label="Dosage Form"
              name="dosage_name"
              value={medicineData.dosage_name}
              onChange={handleInputChange}
              required
            >
              {
                dosage.map((item, key) =>
                  <MenuItem value={item.dosage_ID} key={key}>{item.dosage_name}</MenuItem>
                )
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
        <Grid item xs={12}>
          <MedicineTable list={medicineList} reload={setReload}/>
        </Grid>
      </Grid>
    </form>
  );
};

export default MedicineForm;
