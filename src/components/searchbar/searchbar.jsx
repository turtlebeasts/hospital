import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function SearchBar({ setReload, setData }) {

    const [term, setTerm] = useState("")
    const [endpoint, setEndpoint] = useState("names")
    const [search, setSearch] = useState(false)

    const handleChange = (e) => {
        setSearch(false)
        setTerm(e.target.value)
    }
    const handleSearch = async () => {
        setSearch(true)
        const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/search.php?${endpoint}=${term}`)
        const result = await response.json()
        setData(result)
    }

    const reset = () => {
        setSearch(false)
        setTerm("")
        setData([])
        setReload(true)
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField value={term} onChange={handleChange} placeholder={`Search ${endpoint}`} />
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue={"names"}
                        onChange={(e)=>setEndpoint(e.target.value)}
                    >
                        <FormControlLabel value="names" control={<Radio />} label="Name"/>
                        <FormControlLabel value="address" control={<Radio />} label="Address" />
                        <FormControlLabel value="registration" control={<Radio />} label="Regd No" />
                        <FormControlLabel value="phone" control={<Radio />} label="Phone No" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={handleSearch}>Search</Button>
                {
                    search ? <Button variant="contained" color="error" onClick={reset}>Reset</Button> : ""
                }
                {
                    search ?
                        <Typography variant="h5">Search results for: {term}</Typography> : ""
                }
            </Grid>
        </Grid>
    )
}