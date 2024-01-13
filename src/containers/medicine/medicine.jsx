import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import "./medicine.css"


export default function Medicine() {
    const [data, setData] = useState([])
    useEffect(() => {
        async function getData() {
            const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/herb.php?get_data=`);
            const result = await response.json()
            setData(result)
        }
        getData()
    }, [])
    return (
        <Grid container id="Herbs">
            {
                data.map(item =>
                    <Grid item xs={12} md={3} key={item.herb_ID} sx={{ width: '40%', height: '20vh', backgroundImage: `url('${item.photo}')`, backgroundSize: 'cover' }}>
                        <div className="hover-card" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <h3>{item.herb_name}</h3>
                            <p>{item.description}</p>
                        </div>
                    </Grid>
                )
            }
        </Grid>
    )
}