import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import FaceIcon from '@mui/icons-material/Face';
import Box from "@mui/material/Box"
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid"
import DeleteModal from "../../components/deletemodal/deletemodal"
import { Hidden, Link as Links } from "@mui/material/"

const user = JSON.parse(sessionStorage.getItem('user'))

export default function Plist() {

  const [data, setData] = React.useState([])
  const [reload, setReload] = React.useState(false)
  React.useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost/hospital/index.php?get_meds=");
      const result = await response.json()
      setData(result)
      setReload(false)
    }
    getData()
  }, [reload])
  return (
    <Box sx={{ padding: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container maxWidth="md">
        <Hidden smDown>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Regd No</TableCell>
                  <TableCell align="right">Date of registration</TableCell>
                  <TableCell align="right">Patient</TableCell>
                  <TableCell align="right">#</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.patient_ID}
                  >
                    <TableCell component="th" scope="row">
                      {row.patient_ID}
                    </TableCell>
                    <TableCell align="right">{`${row.reg_date}`}</TableCell>
                    <TableCell align="right">
                      <Links component={Link} to={`/patient/${row.patient_ID}`} sx={{ textDecoration: 'none' }}>
                        {`${row.first_name} ${row.middle_name} ${row.last_name}`}
                      </Links>
                      <br />
                      {
                        row.cured == '1' ?
                          <Chip icon={<FaceIcon />} color="success" label="Cured" size="small" />
                          :
                          <Chip icon={<FaceIcon />} color="error" size="small" label="Not Cured" />
                      }
                    </TableCell>
                    <TableCell align="right">
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          {
                            user.type == 2 || user.type == 1 ?
                              <Button
                                component={Link}
                                to={row.patient_ID}
                                variant="contained"
                              >
                                Diagnose
                              </Button> : ""
                          }
                        </Grid>
                        <Grid item xs={12}>
                          {
                            user.type == 3 || user.type == 1 ?
                              <Button
                                component={Link}
                                to={"/prescribe/" + row.patient_ID}
                                variant="outlined"
                                size="small"
                              >
                                Prescribe
                              </Button> : ""
                          }
                        </Grid>
                        <Grid item xs={12}>
                          {
                            user.type == 1 ?
                              <DeleteModal deleteID={row.patient_ID} reload={setReload} /> : ""
                          }
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Hidden>
        <Hidden smUp>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell align="right">#</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.patient_ID}
                  >
                    <TableCell component="th" scope="row">
                      id: {row.patient_ID}<br/>
                      reg-date: {`${row.reg_date}`}<br/>
                      <Links component={Link} to={`/patient/${row.patient_ID}`} sx={{ textDecoration: 'none' }}>
                        {`${row.first_name} ${row.middle_name} ${row.last_name}`}
                      </Links>
                      <br />
                      {
                        row.cured == '1' ?
                          <Chip icon={<FaceIcon />} color="success" label="Cured" size="small" />
                          :
                          <Chip icon={<FaceIcon />} color="error" size="small" label="Not Cured" />
                      }
                    </TableCell>
                    <TableCell align="right">
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          {
                            user.type == 2 || user.type == 1 ?
                              <Button
                                component={Link}
                                to={row.patient_ID}
                                variant="contained"
                              >
                                Diagnose
                              </Button> : ""
                          }
                        </Grid>
                        <Grid item xs={12}>
                          {
                            user.type == 3 || user.type == 1 ?
                              <Button
                                component={Link}
                                to={"/prescribe/" + row.patient_ID}
                                variant="outlined"
                                size="small"
                              >
                                Prescribe
                              </Button> : ""
                          }
                        </Grid>
                        <Grid item xs={12}>
                          {
                            user.type == 1 ?
                              <DeleteModal deleteID={row.patient_ID} reload={setReload} /> : ""
                          }
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Hidden>
      </Grid>
    </Box>
  );
}
