import Grid from "@mui/material/Grid"
import Banner from "../../containers/banner/banner"
import Intro from "../../containers/intro/intro"
import Always from "../../containers/always/always"
import Features from "../../containers/features/features"
import About from "../../containers/about/about"
import Medicine from "../../containers/medicine/medicine"

export default function Homepage(){
    return(
        <>
            <Grid container spacing={2}>
                <Banner />
                <Intro />
                <Always />
                <Features />
                <About />
                <Medicine />
            </Grid>
        </>
    )
}
