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
import { Card, CardContent, CircularProgress, Hidden, LinearProgress, Link as Links, TextField, Typography } from "@mui/material/"
import VaccinesIcon from '@mui/icons-material/Vaccines';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Paginations from '../../components/pagination/pagination';

const user = JSON.parse(sessionStorage.getItem('user'))

export default function Plist() {

  const [data, setData] = React.useState([])
  const [dataLoad, setDataLoad] = React.useState(true)
  const [reload, setReload] = React.useState(false)
  const [cured, setCured] = React.useState(0)
  const [circum, setCircum] = React.useState(0)
  const [left, setleft] = React.useState(0)
  const [dead, setdead] = React.useState(0)
  const [page, setPage] = React.useState(0)
  const [pageCount, setPageCount] = React.useState(0)

  const [curedLoad, setCuredLoad] = React.useState(true)
  const [circumLoad, setCircumLoad] = React.useState(true)
  const [leftLoad, setleftLoad] = React.useState(true)
  const [deadLoad, setdeadLoad] = React.useState(true)

  React.useEffect(() => {
    async function getData() {
      const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/index.php?get_meds=${page}`);
      const result = await response.json()
      setData(result)
      setDataLoad(false)
      setReload(false)
    }
    async function getCured() {
      const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/index.php?cured=`);
      const result = await response.json()
      setCured(result)
      setCuredLoad(false)
    }
    async function getCircum() {
      const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/index.php?circum=`);
      const result = await response.json()
      setCircum(result)
      setCircumLoad(false)
    }
    async function getLefttreat() {
      const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/index.php?left=`);
      const result = await response.json()
      setleft(result)
      setleftLoad(false)
    }
    async function getdead() {
      const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/index.php?dead=`);
      const result = await response.json()
      setdead(result)
      setdeadLoad(false)
    }
    async function getCount() {
      const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/plist.php?count=`);
      const result = await response.json()
      setPageCount(result)
    }
    getCount()
    getdead()
    getLefttreat()
    getCircum()
    getCured()
    getData()
  }, [reload, page])

  const handleSearch = (e) => {
    let searchTerm = e.target.value
    const result = data.filter(item => Object.values(item).some(value => value.toLowerCase().includes(searchTerm)))
    if (searchTerm === '') {
      setReload(true)
    } else {
      setData(result)
    }
  }

  const status = [
    {
      name: 'Not cured',
      color: 'primary'
    },
    {
      name: 'Cured',
      color: 'success'
    },
    {
      name: 'Under circumstances',
      color: 'warning'
    },
    {
      name: 'Left treatment',
      color: 'secondary'
    },
    {
      name: 'Dead',
      color: 'error'
    }
  ]

  return (
    <Box sx={{ padding: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container maxWidth="md">
        <Grid item xs={12} sx={{ pr: 1 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Patient: {dataLoad ? <CircularProgress color="primary" size={15} /> : data.length}</Typography>
              <Typography variant="h6">Patient cured: {curedLoad ? <CircularProgress color="primary" size={15} /> : cured}</Typography>
              <Typography variant="h6">Under circumstances: {circumLoad ? <CircularProgress color="primary" size={15} /> : circum}</Typography>
              <Typography variant="h6">Left treatment: {leftLoad ? <CircularProgress color="primary" size={15} /> : left}</Typography>
              <Typography variant="h6">Patient dead: {deadLoad ? <CircularProgress color="primary" size={15} /> : dead}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} sx={{ mt: 2 }}>
          <Card>
            <CardContent>
              <TextField onChange={handleSearch} label="Search record" />
            </CardContent>
          </Card>
        </Grid>
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
                {
                  !dataLoad ?
                    data.map((row) => (
                      <TableRow
                        key={row.patient_ID}
                      >
                        <TableCell component="th" scope="row">
                          {row.patient_ID}
                        </TableCell>
                        <TableCell align="right">{`${row.reg_date}`}</TableCell>
                        <TableCell align="right">
                          <Links component={Link} to={`/patient/${row.patient_ID}`} sx={{ textDecoration: 'none' }}>
                            {row.gender == 'male' ? <MaleIcon /> : row.gender == 'female' ? <FemaleIcon /> : <TransgenderIcon />} {`${row.first_name} ${row.middle_name} ${row.last_name}`}
                          </Links>
                          <br />
                          {
                            <Chip icon={<FaceIcon />} color={status[row.cured].color} label={status[row.cured].name} size="small" />
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
                                    startIcon={<TroubleshootIcon />}
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
                                    startIcon={<VaccinesIcon />}
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
                    ))
                    : <TableRow>
                      <TableCell colSpan={4}>
                        <Typography>Loading patient list...</Typography>
                        <LinearProgress color='primary' />
                      </TableCell>
                    </TableRow>
                }
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
                {
                  !dataLoad ?
                    data.map((row) => (
                      <TableRow
                        key={row.patient_ID}
                      >
                        <TableCell component="th" scope="row">
                          id: {row.patient_ID}<br />
                          reg-date: {`${row.reg_date}`}<br />
                          <Links component={Link} to={`/patient/${row.patient_ID}`} sx={{ textDecoration: 'none' }}>
                            {`${row.first_name} ${row.middle_name} ${row.last_name}`}
                          </Links>
                          <br />
                          {
                            <Chip icon={<FaceIcon />} color={status[row.cured].color} label={status[row.cured].name} size="small" />
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
                    ))
                    :
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Typography>Loading patient list...</Typography>
                        <LinearProgress color='primary' />
                      </TableCell>
                    </TableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Hidden>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Paginations count={pageCount} setPages={setPage} page={page}/>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
