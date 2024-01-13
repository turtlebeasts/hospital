import styled from "@emotion/styled";
import { Button, Card, CardContent, CardHeader, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteHerbs from "../../components/deleteherbs/deleteherbs";

export default function Testimonials() {

    const [link, setLink] = useState('')
    const [reload, setReload] = useState(false)
    const [data, setData] = useState([])

    const [herb, setHerb] = useState('')
    const [sciname, setSciname] = useState('')
    const [desc, setDesc] = useState('')


    useEffect(() => {
        async function getData() {
            const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/testimonials.php?get_data=`);
            const result = await response.json()
            setData(result)
            setReload(false)
        }
        getData()
    }, [reload])

    function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const embedID = youtube_parser(link)
        // console.log(embedID)
        if(embedID==false){
            alert("Please enter a valid Youtube link")
            return
        }
        const post_data = {
            name: herb,
            address: sciname,
            desc: desc,
            link: embedID
        }

        // console.log(post_data);
        fetch(`${import.meta.env.VITE_SITENAME}/hospital/testimonials.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post_data)
        }).then(res => res.text()).then(data => {
            if (data == 200) {
                setReload(true)
                setHerb('')
                setSciname('')
                setDesc('')
                setLink('')
            } else {
                alert("Error inserting")
                console.log(data)
            }

            // console.log(data)
        }).catch(error => console.error("Error", error))
    }

    return (
        <center>
            <Grid container spacing={2} maxWidth={"md"} mt={2}>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent component={"form"} onSubmit={handleSubmit}>
                            <Typography variant="h6">
                                Add patient testimonials to the front page
                            </Typography>
                            <TextField
                                required
                                label="Patient name"
                                fullWidth
                                value={herb}
                                onChange={(e) => { setHerb(e.target.value) }}
                            />
                            <TextField
                                sx={{ mt: 2 }}
                                label="Address name"
                                fullWidth
                                value={sciname}
                                onChange={(e) => { setSciname(e.target.value) }}
                            />
                            <TextField
                                required
                                multiline
                                rows={3}
                                sx={{ mt: 2 }}
                                label="Description"
                                value={desc}
                                fullWidth
                                onChange={(e) => { setDesc(e.target.value) }}
                            />
                            <TextField
                                required
                                multiline
                                rows={3}
                                sx={{ mt: 2 }}
                                label="Link to YouTube video"
                                fullWidth
                                value={link}
                                onChange={(e) => { setLink(e.target.value) }}
                            />
                            <br />
                            <br />
                            <Button variant="contained" type="submit">Submit</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardHeader title="Testimonials" subheader={`${data.length} testimonials`} />
                        {data.map((item, key) => (
                            <CardContent key={key}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} lg={4}>
                                        <iframe
                                            src={`https://www.youtube.com/embed/${item.link}?control=0`}
                                            allowFullScreen
                                            title="Embedded youtube"
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Typography variant="h6">{item.p_name} {item.p_address !== '' ? `(${item.p_address})` : ""}</Typography>
                                        <Typography variant="body1">{item.description}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <DeleteHerbs deleteID={item.t_ID} reload={setReload} page={"testimonials"} />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        ))}
                    </Card>
                </Grid>
            </Grid>
        </center>
    )
}