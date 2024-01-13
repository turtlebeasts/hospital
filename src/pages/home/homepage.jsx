import Grid from "@mui/material/Grid"
import Banner from "../../containers/banner/banner"
import Intro from "../../containers/intro/intro"
import Always from "../../containers/always/always"
import Features from "../../containers/features/features"
import About from "../../containers/about/about"
import Medicine from "../../containers/medicine/medicine"
import Services from "../../containers/services/services"
import Backstage from "../../containers/backstage/backstage"
import EverReady from "../../containers/everready/everready"
import Footer from "../../containers/footer/footer"
import Testimonials from "../../containers/testimonials/testimonials"

export default function Homepage(){
    return(
        <>
            <Grid container spacing={2} style={{display: 'flex', flexDirection: 'column'}}>
                <Banner />
                <Intro />
                <Always />
                <Features />
                <About />
                <Medicine />
                <Services />
                <Testimonials />
                {/* <Backstage /> */}
                <EverReady />
                <Footer />
            </Grid>
        </>
    )
}
