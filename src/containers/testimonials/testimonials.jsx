import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./testimonials.css"


export default function Testimonials() {
    const [data, setData] = useState([])
    useEffect(() => {
        async function getData() {
            const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/testimonials.php?get_data=`);
            const result = await response.json()
            setData(result)
        }
        getData()
    }, [])
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container id="Herbs" sx={{ px: 5 }} maxWidth={"md"}>
                {
                    data.map((item, index) => {
                        return (
                            index % 2 == 0 ?
                                <Grid container key={item.t_ID} sx={{ mb: 5 }}>
                                    <Grid item xs={12} md={6}>
                                        <iframe
                                            src={`https://www.youtube.com/embed/${item.link}?control=0`}
                                            allowFullScreen
                                            title="Embedded youtube"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h6"><b>{item.p_name}</b></Typography>
                                        <Typography>{item.p_desc}</Typography>
                                    </Grid>
                                </Grid>
                                :
                                <Grid container key={item.t_ID} sx={{ mb: 5 }}>
                                    <Grid item xs={12} md={6} sx={{ pr: 5 }}>
                                        <Typography variant="h6"><b>{item.p_name}</b></Typography>
                                        <Typography>{item.p_desc}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <iframe
                                            src={`https://www.youtube.com/embed/${item.link}?control=0`}
                                            allowFullScreen
                                            title="Embedded youtube"
                                        />
                                    </Grid>
                                </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}