import { Button, Card, CardContent, CircularProgress, FormControl, Grid, IconButton, InputLabel, LinearProgress, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Medicines() {

    const { id } = useParams()
    const [diag, setDiag] = useState({})
    const [med, setmed] = useState([])
    const [times, setTimes] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [mwith, setWith] = useState('')
    const [pmedicine, setpmedicine] = useState("")
    const [reload, setReload] = useState(true)
    const [ins, setIns] = useState('')
    const [totalmed, settotalmed] = useState([])
    const [presciptions, setprescriptions] = useState([])
    useEffect(() => {
        async function getDiagnosis(id) {
            const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/index.php?getDiagDetail=${id}`)
            const result = await response.json()
            setDiag(result)
        }
        async function getMedicine() {
            const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/medicine.php?medicine=`)
            const result = await response.json()
            setmed(result)
        }
        async function getPrescription() {
            const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/prescribe.php?diag_ID=${id}`)
            const result = await response.json()
            setprescriptions(result)
        }
        getPrescription()
        getMedicine()
        getDiagnosis(id)
        setReload(false)
    }, [reload])

    const [selectedMedicines, setSelectedMedicines] = useState([]);

    const handleAddMedicine = () => {
        setSelectedMedicines([...selectedMedicines, '']);
    };

    const handleMedicineChange = (index, value) => {
        const updatedMedicines = [...selectedMedicines];
        updatedMedicines[index] = value;
        setSelectedMedicines(updatedMedicines);
    };

    const handleRemoveMedicine = (index) => {
        const updatedMedicines = [...selectedMedicines];
        updatedMedicines.splice(index, 1);
        setSelectedMedicines(updatedMedicines);
    };

    const handlesubmit = (e) => {
        e.preventDefault()
        let data = {
            primary_medicine: pmedicine,
            quantity: quantity,
            mwith: mwith,
            times: times,
            ins: ins,
            extras: selectedMedicines
        }
        settotalmed(prev => [...prev, data])
    }

    const handleDelete = (e) => {
        let newarr = [...totalmed]
        newarr.splice(e, 1)
        settotalmed(newarr)
    }

    const handlefinalsubmit = () => {
        const post_data = {
            data: totalmed,
            diag_ID: id
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
                // e.target.reset()
                if (data == 200) {
                    settotalmed([])
                    setReload(true)
                } else {
                    alert("Error from backend")
                }

            })
            .catch(error => console.error("Error", error))
    }

    const handleDeletefromdb = async (pres_ID) => {
        fetch(`${import.meta.env.VITE_SITENAME}/hospital/prescribe.php?delete=${pres_ID}`)
        .then(res=>res.text())
        .then(data=>{
            if(data==200){
                setReload(true)
            }else{
                alert("Error deleting")
            }
        })
    }
    return (
        <Grid container spacing={2} sx={{ mt: 2, p: 2 }}>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Date of Diagnosis: {diag.date}</Typography>
                        <Typography variant="h6">Diagnosis: {diag.diagnosis}</Typography>
                        <Typography variant="h6">Remarks: {diag.initial_remarks}</Typography>
                    </CardContent>
                </Card>
                <Card sx={{ mt: 2 }}>
                    <CardContent>
                        {
                            presciptions.map((item, key) => {
                                return (
                                    <Card key={key} sx={{ mb: 2 }}>
                                        <CardContent>
                                            <Typography><b>{item.name}</b> {item.dosage_name}: mix {item.water_quantity} with {item.mwith}, {item.times_perday} times per day</Typography>
                                            <Typography>Instruction: {item.instruction}</Typography>
                                            {item.extras !== "" && <hr />}
                                            {item.extras !== "" && <Typography><b>Extra medicines</b></Typography>}
                                            {item.extras}
                                            <br />
                                            <IconButton value={key} onClick={() => handleDeletefromdb(item.pres_ID)}>
                                                <DeleteForeverIcon color="error" />
                                            </IconButton>
                                        </CardContent>
                                    </Card>
                                )
                            })
                        }
                        {
                            presciptions.length==0 && !reload?<Typography>No prescriptions added</Typography>:""
                        }
                        {
                            reload?<><LinearProgress /><Typography variant="h6">Loading prescriptions</Typography></>:""
                        }
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <FormControl fullWidth>
                            <InputLabel>Primary Medicine</InputLabel>
                            <Select
                                label="Primary Medicine"
                                name="pmedicine"
                                value={pmedicine}
                                onChange={(e) => setpmedicine(e.target.value)}
                                required
                                sx={{ mb: 2 }}
                            >
                                {
                                    med.map((item, key) =>
                                        <MenuItem value={item.medicine_ID} key={key}>{item.generic_name}</MenuItem>
                                    )
                                }
                            </Select>
                            <TextField label="Quantity" value={quantity} sx={{ mb: 2 }} onChange={(e) => setQuantity(e.target.value)} />
                            <TextField label="With" sx={{ mb: 2 }} value={mwith} onChange={(e) => setWith(e.target.value)} />
                            <TextField type="number" label="Times per day" value={times} sx={{ mb: 2 }} onChange={(e) => setTimes(e.target.value)} />
                            <Typography>Extra medicines</Typography>
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={handleAddMedicine}>
                            Add
                        </Button>
                        {selectedMedicines.map((medicine, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                <FormControl fullWidth>
                                    <InputLabel>Select Medicine</InputLabel>
                                    <Select
                                        value={medicine}
                                        label="Select Medicine"
                                        onChange={(e) => handleMedicineChange(index, e.target.value)}
                                    >
                                        {
                                            med.map((item, key) =>
                                                <MenuItem value={item.name} key={key}>{item.generic_name}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                                <IconButton onClick={() => handleRemoveMedicine(index)}>
                                    <DeleteForeverIcon color="error" />
                                </IconButton>
                            </div>
                        ))}
                        <TextField multiline rows={3} fullWidth label="Instruction" sx={{ mb: 2, mt: 2 }} onChange={(e) => setIns(e.target.value)} />
                        <Button variant="contained" size="large" onClick={handlesubmit} disabled={pmedicine == "" || (selectedMedicines.length !== 0 && selectedMedicines.includes(''))}>Add to list</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography>Medicines added</Typography>
                        {
                            totalmed.map((item, key) => {
                                let name = med.find(element => element.medicine_ID == item.primary_medicine)
                                return (
                                    <Card key={key} sx={{ mb: 2 }}>
                                        <CardContent>
                                            <Typography><b>{name.name}</b> {name.dosage_name}: mix {item.quantity} with {item.mwith}, {item.times} times per day</Typography>
                                            <Typography>Instruction: {item.ins}</Typography>
                                            {item.extras.length !== 0 && <hr />}
                                            {item.extras.length !== 0 && <Typography><b>Extra medicines</b></Typography>}
                                            {
                                                item.extras.map((item, index) => {
                                                    return (
                                                        <div key={index}><Typography variant="p">{item}</Typography><br /></div>
                                                    )
                                                })
                                            }
                                            <br />
                                            <IconButton value={key} onClick={() => handleDelete(key)}>
                                                <DeleteForeverIcon color="error" />
                                            </IconButton>
                                        </CardContent>
                                    </Card>
                                )
                            })
                        }

                        {totalmed.length > 0 && <Button variant="contained" sx={{ mt: 2 }} onClick={handlefinalsubmit}>Submit</Button>}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}