import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function BasicAccordion(props) {
	
	console.log(props)
  return (
    <div>
    {
    	diag.map(diag=>
      <Accordion key={diag.diag_ID}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="p"
          >
            Date : {diag.date}
          </Typography>
          <Typography
            variant="h6"
          >
            Name : {`${diag.first_name} ${diag.middle_name} ${diag.last_name}`}
          </Typography>
          <Typography
            variant="p"
          >
            Diagnosis : {diag.diagnosis}
          </Typography><br/>
          <Typography
            variant="p"
          >
            Initial Remarks : {diag.initial_remarks}
          </Typography>
        </AccordionDetails>
      </Accordion>
  		)}
    </div>
  );
}