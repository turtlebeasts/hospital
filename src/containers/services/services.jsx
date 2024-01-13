import { Grid, Typography } from "@mui/material";
import bone from "./images/Groupbone.png"
import brain from "./images/Groupbrain.png"
import kidney from "./images/Groupkidney.png"
import lung from "./images/Grouplung.png"
import stomach from "./images/Groupstomach.png"
import Vectorblood from "./images/Vectorblood.png"

const cancers = [
    {
        name: 'Bone',
        image: bone
    },
    // {
    //     name: 'Kidney',
    //     image: kidney
    // },
    {
        name: 'Brain',
        image: brain
    },
    {
        name: 'Lung',
        image: lung
    },
    {
        name: 'Stomach',
        image: stomach
    },
    {
        name: 'Blood',
        image: Vectorblood
    },
]

export default function Services() {
    return (
        <Grid container pb={5}>
            <Grid item xs={12} sx={{ textAlign: 'center', mt: '5rem' }}>
                <Typography variant="h3" sx={{ fontWeight: 900 }}>
                    TYPES OF CANCER
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid container maxWidth={"md"} spacing={2} sx={{ mt: '4rem' }}>
                        {cancers.map(item =>
                            <Grid key={item.name} item xs={6} md={4} sx={{ height: '8rem', textAlign: 'center' }}>
                                <img src={item.image}/>
                                <Typography variant="h6">
                                    {item.name} cancer
                                </Typography>
                            </Grid>)}
                    </Grid>
                </div>
            </Grid>
        </Grid>
    )
}