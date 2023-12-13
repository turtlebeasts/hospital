import { Grid, Typography } from "@mui/material"
import "./always.css"

export default function Always(){
    return(
        <div style={{width: '100vw'}}>
            <Grid sx={{textAlign: 'center', margin: 'auto', padding: '5vh 0'}} maxWidth={"md"}>
                <Typography variant="h3" sx={{fontWeight: 900}}>ALWAYS AT YOUR SERVICE</Typography>
                <Typography variant="p">
                Natural Cancer Care Center pioneers herbal and natural treatments, offering hope and healing. Our integrative approach prioritizes holistic well-being, providing personalized care for those navigating the journey to recovery. Embrace nature's remedies on your path to renewed health
                </Typography>
            </Grid>
        </div>
    )
}