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
import { CircularProgress, LinearProgress, Link } from '@mui/material';
import DeleteMedia from '../deletemedia/deletemedia';
import FileUploadComponent from '../fileuploadcomponent/fileuploadcomponent';

export default function PatientCard() {

  let { id } = useParams()
  const [detail, setDetail] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [reload, setReload] = React.useState(false)

  React.useEffect(() => {
    async function getDiagnosis(id) {
      const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/index.php?getDetail=${id}`)
      const result = await response.json()
      setDetail(result)
      setReload(false)
    }
    getDiagnosis(id)
  }, [reload])

  const handleDelete = () => {
    setReload(true)
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {
              detail.length ?
                detail[0].first_name[0]
                : <CircularProgress size={20} />
            }
          </Avatar>
        }
        action={
          detail.length ?
            <IconButton aria-label="settings" onClick={() => { setOpen(!open) }}>
              <BorderColorIcon />
            </IconButton> : ""
        }
        title={detail.length ? `${detail[0].first_name} ${detail[0].middle_name} ${detail[0].last_name}` : <LinearProgress />}
        subheader={detail.length ? "September 14, 2016" : ""}
      />
      {
        detail.length ?
          detail[0].file === undefined ?
            <div style={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No images
              </Typography>
            </div>
            :
            detail[0].type === 1 ?
              detail.map((item, key) =>
                <CardMedia
                  key={key}
                  component="img"
                  image={item.file}
                  alt="Paella dish"
                />
              )
              : detail.map((item, key) => {
                return (
                  <div style={{ textAlign: 'center' }} key={key}>
                    <DeleteMedia itemfile={item.file} ind={key + 1} deleteID={item.photo_ID} reload={setReload} page={"mediadelete"} />
                  </div>
                )
              })
          :
          <div style={{ padding: '3rem' }}>
            Loading attachments...
            <LinearProgress />
          </div>
      }

      <CardContent>
        {
          detail.length ?
            <>
              <FileUploadComponent reload={setReload} />
              <Typography variant="h6" sx={{ mt: 2 }}>Age: {detail[0].age}</Typography>
              <Typography variant="h6">Email: {detail[0].email}</Typography>
              <Typography variant="h6">Phone: {detail[0].phone}</Typography>
              <Typography variant="h6">
                Address: {detail[0].address}
              </Typography>
            </>
            :
            <>
              <Typography variant="h6">Age: <CircularProgress size={15} /></Typography>
              <Typography variant="h6">Email: <CircularProgress size={15} /></Typography>
              <Typography variant="h6">Phone: <CircularProgress size={15} /></Typography>
              <Typography variant="h6">
                Address: <CircularProgress size={15} />
              </Typography>
            </>
        }
        <Dialog open={open} onClose={() => setOpen(!open)}>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <Edit detail={detail[0]} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(!open)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}
