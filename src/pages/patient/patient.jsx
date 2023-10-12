import {
	Grid,
	Box
} from "@mui/material"

import PatientCard from "../../components/patientcard/patientcard"
import Review from "../../components/review/review"
import Details from "../../components/detail/detail"

export default function Patient(){
	return(
		<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5}}>
			<Grid container spacing={2} maxWidth={"md"}>
				<Grid item xs={12} md={6}>
					<PatientCard />
				</Grid>
				<Grid item xs={12} md={6}>
					<Review />
				</Grid>
			</Grid>
		</Box>
		)
}