import {
	Grid,
	Box
} from "@mui/material"

import PatientCard from "../../components/patientcard/patientcard"
import Diagnosis from "../diagnosis/diagnosis"
import Review from "../../components/review/review"

export default function DiagHome(){
	return(
		<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5}}>
			<Grid container spacing={2}>
				<Grid item xs={12} md={4}>
					<PatientCard />
				</Grid>
				<Grid item xs={12} md={4}>
					<Diagnosis />
				</Grid>
				<Grid item xs={12} md={4}>
					<Review />
				</Grid>
			</Grid>
		</Box>
		)
}