import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import {useEffect, useState} from "react"

export default function Prescription( {diag_ID, reload} ){
	const [pres, setPres] = useState([])
	useEffect(()=>{
		async function getPres(diag_ID){
			const response = await fetch("http://localhost/hospital/prescribe.php?diag_ID="+diag_ID)
			const result = await response.json()
			setPres(result)
		}
		getPres(diag_ID)
	},[diag_ID, reload])
	return(
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography variant="h6">Previous prescriptions</Typography>
			</Grid>
		{
			pres.length?
			pres.map((item, index)=>{
				return(
					<Grid item xs={12} key={item.pres_ID}>
						<Typography variant="p">{item.name}({item.generic_name}) with {item.water_quantity} cup of water {item.times_perday} times per day</Typography>
					</Grid>
					)
			})
			:
			<Grid item xs={12}>
				No prescriptions added
			</Grid>
		}
		</Grid>
		)
}