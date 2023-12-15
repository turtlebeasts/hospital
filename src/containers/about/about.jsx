import { Grid, Typography } from "@mui/material";
const image = "https://images.unsplash.com/photo-1531875456634-3f5418280d20?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
export default function About() {
    return (
        <div id="About" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container spacing={2} maxWidth="md" sx={{ mt: 5, mb: 5, pl: 5, pr: 5 }}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" style={{ fontWeight: 900 }}>About Natural Cancer Care Center</Typography>
                    <Typography variant="p">
                        At 'Natural Cancer Care Centre', we are dedicated to providing comprehensive natural care, rooted in indigenous and traditional medicine, with a special focus on addressing cancer and various systemic disorders. Our team of experts is committed to harnessing the power of ancient healing practices to support the well-being of individuals, helping them on their journey to recovery. With a deep understanding of these time-tested remedies, we offer a holistic approach to cancer care and other health challenges, ensuring a harmonious balance between the human senses and the body's natural systems.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={image} alt="plant" width={"50%"} />
                </Grid>
            </Grid>
        </div>
    )
}