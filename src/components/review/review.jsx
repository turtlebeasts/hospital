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
    CircularProgress
} from "@mui/material"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import dayjs from 'dayjs';
import DeleteModalReview from "../deletemodalreview/deletemodalreview";

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
            setLoading(false)
        }
        setReload(false)
        getReview(id)
    }, [reload])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const post_data = {
            patient_ID: id,
            review_date: `${date.$D}/${date.$M}/${date.$y}`,
            review: data.get('review'),
            status: data.get('status')
        }
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
                    !loading?
                    reviews.length ?
                        reviews.map((item, key) => {
                            return (
                                <div key={key} style={{backgroundColor: '#99c1f1', borderRadius: '15px', padding: '1rem', marginBottom: '1rem'}}>
                                    <Typography>
                                        <u>{item.review_date}</u>
                                        <br />{item.review}
                                        <br />{item.status}
                                    </Typography>
                                    {
                                        user.type == 4 || user.type == 1 ?
                                        <DeleteModalReview deleteID={item.review_ID} reload={setReload} />:""
                                    }
                                </div>
                            )
                        })
                        : "No reviews added till now"
                    :<CircularProgress />
                }
                <Divider />
                {
                    user.type == 4 || user.type == 1 ?
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
                                onChange={(e)=>setSelect(e.target.value)}
                            >
                                <MenuItem value="Not cured">Not cured</MenuItem>
                                <MenuItem value="Cured">Cured</MenuItem>
                                <MenuItem value="Under circumstances">Under circumstances</MenuItem>
                                <MenuItem value="Left treatment">Left treatment</MenuItem>
                                <MenuItem value="Dead">Dead</MenuItem>
                            </Select><br/><br/>
                            <Button variant="contained" type="submit" disabled={loading}>
                                {
                                    loading?<CircularProgress size={25}/>:"Add"
                                }
                            </Button>
                        </form>
                        : ""
                }
            </CardContent>
        </Card>
    )
}
