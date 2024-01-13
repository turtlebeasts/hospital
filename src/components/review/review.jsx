import {
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Divider,
    Switch,
    FormControlLabel,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    List,
    ListItem,
    IconButton,
    ListItemText,
    Link
} from "@mui/material"

import styled from '@emotion/styled';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import dayjs from 'dayjs';
import DeleteModalReview from "../deletemodalreview/deletemodalreview";
import DeleteMedia from "../deletemedia/deletemedia";

const user = JSON.parse(sessionStorage.getItem('user'))


export default function Review() {

    const [reload, setReload] = useState(false)
    const [reviews, setReview] = useState([])
    const [date, setDate] = useState(dayjs(''))
    const [select, setSelect] = useState("Not cured")
    const [loading, setLoading] = useState(true)

    let { id } = useParams()
    useEffect(() => {
        async function getReview(id) {
            const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/review.php?getReview=${id}`)
            const result = await response.json()
            setReview(result)
            // console.log(result)
            setLoading(false)
        }
        setReload(false)
        getReview(id)
    }, [reload])

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1
    });

    const [selectedFiles, setSelectedFiles] = useState([]);

    const fileToDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };

    const handleRemoveFile = (fileName) => {
        const updatedFiles = selectedFiles.filter((file) => file.name !== fileName);
        setSelectedFiles(updatedFiles);
    };

    const handleSubmit = async (e) => {

        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const dataURLs = await Promise.all(selectedFiles.map(fileToDataURL));
        const post_data = {
            patient_ID: id,
            review_date: `${date.$D}/${date.$M}/${date.$y}`,
            review: data.get('review'),
            status: data.get('status'),
            images: dataURLs
        }
        // console.log(post_data)
        fetch(`${import.meta.env.VITE_SITENAME}/hospital/review.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post_data)
        }).then(res => res.text()).then(data => {
            if (data == 300) {
                setReload(true)
                e.target.reset()
            } else {
                alert("Error inserting")
                console.log(data)
            }
        }).catch(error => console.error("Error", error))
    }
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">
                    Reviews
                </Typography>
                {
                    !loading ?
                        reviews.length ?
                            reviews.map((item, key) => {
                                return (
                                    <div key={key} style={{ backgroundColor: '#99c1f1', borderRadius: '15px', padding: '1rem', marginBottom: '1rem' }}>
                                        <Typography>
                                            <u>{item.review.review_date}</u>
                                            <br />{item.review.review}
                                            <br />{item.review.status}
                                        </Typography>
                                        {
                                            user.type == 4 || user.type == 1 ?
                                                <DeleteModalReview deleteID={item.review.review_ID} reload={setReload} /> : ""
                                        }
                                        {
                                            item.image.map((items, keys) =>
                                                <div key={keys}>
                                                    <DeleteMedia itemfile={items.photo} ind={keys + 1} deleteID={items.photo_ID2} reload={setReload} page={"reviewmedia"}/>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            })
                            : "No reviews added till now"
                        : <CircularProgress />
                }
                <Divider />
                {
                    user.type == 4 || user.type == 1 ?
                        <>
                            <form onSubmit={handleSubmit}>
                                <Typography component="p">
                                    Review Date
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker onChange={(newValue) => setDate(newValue)} />
                                </LocalizationProvider><br />
                                <Typography component="p">
                                    Review
                                </Typography>
                                <TextField multiline rows={3} name="review" fullWidth required /><br /><br />
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    fullWidth
                                    value={select}
                                    name="status"
                                    onChange={(e) => setSelect(e.target.value)}
                                >
                                    <MenuItem value="Not cured">Not cured</MenuItem>
                                    <MenuItem value="Cured">Cured</MenuItem>
                                    <MenuItem value="Under circumstances">Under circumstances</MenuItem>
                                    <MenuItem value="Left treatment">Left treatment</MenuItem>
                                    <MenuItem value="Dead">Dead</MenuItem>
                                </Select><br /><br />
                                <Button component="label" variant="contained"
                                    startIcon={<CloudUploadIcon />}>
                                    Upload file
                                    <VisuallyHiddenInput type="file" multiple
                                        onChange={handleFileChange} />
                                </Button><br/>
                                <List sx={{mb: 2}}>
                                    {selectedFiles.map((file) => (
                                        <ListItem key={file.name} secondaryAction={
                                            <IconButton edge="end" onClick={() => handleRemoveFile(file.name)} color="secondary">
                                                <DeleteForeverIcon color='error' />
                                            </IconButton>}>
                                            <ListItemText primary={file.name} />
                                        </ListItem>
                                    ))}
                                </List>
                                <Button variant="contained" type="submit" disabled={loading}>
                                    {
                                        loading ? <CircularProgress size={25} /> : "Submit"
                                    }
                                </Button>
                            </form>
                        </>
                        : ""
                }
            </CardContent>
        </Card>
    )
}
