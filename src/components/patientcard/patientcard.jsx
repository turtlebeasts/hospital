import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useParams } from "react-router-dom"

export default function PatientCard() {

  let { id } = useParams()
  const [expanded, setExpanded] = React.useState(false);
  const [detail, setDetail] = React.useState([])
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
          <IconButton aria-label="settings">
            <MoreVertIcon />
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


      </CardContent>
    </Card>
  );
}
