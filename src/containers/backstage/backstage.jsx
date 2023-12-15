import { Grid } from "@mui/material";
import StaffCard from "../../components/staffcard/staffcard";

export default function Backstage(){
    return(
        <div id="Staff" style={{
            backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1679429321023-dff2ea455b0c?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundSize: 'cover',
        }}>
        <Grid container sx={{
            padding: '3rem 0',
            backgroundColor: 'rgba(0, 110, 189, 0.7)'
        }}>
            <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Grid container maxWidth={"md"} spacing={2}>
                    <Grid item xs={6} md={4}>
                        <StaffCard name={"name"} designation={"Medicine doctor"} image={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.corporatephotographylondon.com%2Fwp-content%2Fuploads%2F2019%2F11%2FOption-3.jpg&f=1&nofb=1&ipt=9418e2a99524b09b69941246180166065562afe86c9cc9eb78ee925b73c82497&ipo=images"}/>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <StaffCard name={"name"} designation={"Medicine doctor"} image={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.corporatephotographylondon.com%2Fwp-content%2Fuploads%2F2019%2F11%2FOption-3.jpg&f=1&nofb=1&ipt=9418e2a99524b09b69941246180166065562afe86c9cc9eb78ee925b73c82497&ipo=images"}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StaffCard name={"name"} designation={"Medicine doctor"} image={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.corporatephotographylondon.com%2Fwp-content%2Fuploads%2F2019%2F11%2FOption-3.jpg&f=1&nofb=1&ipt=9418e2a99524b09b69941246180166065562afe86c9cc9eb78ee925b73c82497&ipo=images"}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </div>
    )
}