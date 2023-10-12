import {
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Divider
} from "@mui/material"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import dayjs from 'dayjs';

const user = JSON.parse(sessionStorage.getItem('user'))


export default function Review() {

    const [reload, setReload] = useState(false)
    const [reviews, setReview] = useState([])
    const [date, setDate] = useState(dayjs(''))

    let { id } = useParams()
    useEffect(() => {
        async function getReview(id) {
            const response = await fetch("http://localhost/hospital/review.php?getReview=" + id)
            const result = await response.json()
            // console.log(result)
            setReview(result)
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
            review: data.get('review')
        }

        fetch('http://localhost/hospital/review.php', {
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
                    reviews.length ?
                        reviews.map((item, key) => <Typography key={key}><u>{item.review_date}</u><br />{item.review}</Typography>)
                        : "No reviews added till now"
                }
                <Divider />
                {
                    user.type == 4 || user.type == 1?
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
                            <Button variant="contained" type="submit">Add</Button>
                        </form>
                        : ""
                }
            </CardContent>
        </Card>
    )
}
