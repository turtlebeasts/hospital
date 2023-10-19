import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useParams } from "react-router-dom"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button'
import Edit from '../edit/edit';

export default function PatientCard() {

  let { id } = useParams()
  const [detail, setDetail] = React.useState([])
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    async function getDiagnosis(id) {
      const response = await fetch("http://localhost/hospital/index.php?getDetail=" + id)
      const result = await response.json()
      setDetail(result)
    }
    getDiagnosis(id)
  }, [])

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {
              detail.length ?
                detail[0].first_name[0]
                : "loading..."
            }
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={() => { setOpen(!open) }}>
            <BorderColorIcon />
          </IconButton>
        }
        title={detail.length ? `${detail[0].first_name} ${detail[0].middle_name} ${detail[0].last_name}` : "loading..."}
        subheader="September 14, 2016"
      />
      {
        detail.length ?
          detail[0].image === undefined ?
            <div style={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No images
              </Typography>
            </div>
            :
            detail.map((item, key) =>
              <CardMedia
                key={key}
                component="img"
                image={item.image}
                alt="Paella dish"
              />
            )
          : "Loading..."
      }
      <CardContent>
        {
          detail.length ?
            <>
              <Typography variant="h6">Age: {detail[0].age}</Typography>
              <Typography variant="h6">Email: {detail[0].email}</Typography>
              <Typography variant="h6">Phone: {detail[0].phone}</Typography>
              <Typography variant="h6">
                Address: {detail[0].address}
              </Typography>
            </>
            : "No details found"
        }
        <Dialog open={open} onClose={()=>setOpen(!open)}>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <Edit detail={detail[0]}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setOpen(!open)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

      </CardContent>
    </Card>
  );
}
