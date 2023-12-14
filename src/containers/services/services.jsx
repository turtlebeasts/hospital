import { Grid, Typography } from "@mui/material";


const cancers = [
    {
        name: 'Bone'
    },
    {
        name: 'Kidney'
    },
    {
        name: 'Brain'
    },
    {
        name: 'Lung'
    },
    {
        name: 'Stomach'
    },
    {
        name: 'Blood'
    },
]

export default function Services() {
    return (
        <Grid container>
            <Grid item xs={12} sx={{ textAlign: 'center', mt: '5rem' }}>
                <Typography variant="h3" sx={{ fontWeight: 900 }}>
                    OUR SERVICES
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid container maxWidth={"md"} spacing={2} sx={{ mt: '4rem' }}>
                        {cancers.map(item =>
                            <Grid key={item.name} item xs={6} md={4} sx={{ height: '8rem', textAlign: 'center' }}>
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