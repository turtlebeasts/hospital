import styled from "@emotion/styled";
import { Button, Card, CardContent, CardHeader, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteHerbs from "../../components/deleteherbs/deleteherbs";

export default function MediaDashboard() {

    const [images, setImages] = useState([]);
    const [images2, setImages2] = useState([]);
    const [reload, setReload] = useState(false)
    const [data, setData] = useState([])

    const [herb, setHerb] = useState('')
    const [sciname, setSciname] = useState('')
    const [desc, setDesc] = useState('')
    const [disableSubmit, setSubmit] = useState(true)


    useEffect(() => {
        async function getData() {
            const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/herb.php?get_data=`);
            const result = await response.json()
            setData(result)
            setReload(false)
        }
        getData()
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

    const handleImageUpload = (e) => {
        const files = e.target.files;
        const imageArray = [];
        const imageArray2 = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const imageUrl = URL.createObjectURL(file);
            imageArray.push(imageUrl);

            const reader = new FileReader();
            reader.onload = (e) => {
                imageArray2.push(e.target.result);
            };

            reader.readAsDataURL(file);
        }
        setImages2(imageArray2);
        setImages(imageArray);
        setSubmit(false)
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const post_data = {
            name: herb,
            sciname: sciname,
            desc: desc,
            image: images2[0]
        }

        // console.log(post_data);
        fetch(`${import.meta.env.VITE_SITENAME}/hospital/herb.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post_data)
        }).then(res => res.text()).then(data => {
            if (data == 200) {
                setReload(true)
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
                                Add herbs to the front page
                            </Typography>
                            <TextField
                                required
                                label="Herb name"
                                fullWidth
                                onChange={(e) => { setHerb(e.target.value) }}
                            />
                            <TextField
                                sx={{ mt: 2 }}
                                label="Scientific name"
                                fullWidth
                                onChange={(e) => { setSciname(e.target.value) }}
                            />
                            <TextField
                                required
                                multiline
                                rows={3}
                                sx={{ mt: 2 }}
                                label="Description"
                                fullWidth
                                onChange={(e) => { setDesc(e.target.value) }}
                            />
                            <Button sx={{ mt: 2 }} component="label" variant="contained"
                                startIcon={<CloudUploadIcon />}>
                                Upload file
                                <VisuallyHiddenInput type="file"
                                    onChange={handleImageUpload}
                                    name="images" />
                            </Button>
                            {
                                images.map((imageUrl, index) => (
                                    <Grid item
                                        key={index}>
                                        <img src={imageUrl}
                                            alt={
                                                `Image ${index}`
                                            }
                                            width='100px'
                                            height="100px" />
                                    </Grid>
                                ))
                            }
                            <br />
                            <br />
                            <Button variant="contained" type="submit" disabled={disableSubmit}>Submit</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardHeader title="Herb list" subheader={`${data.length} herbs in the list`} />
                        {data.map((item, key) => (
                            <CardContent key={key}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <img src={item.photo} alt={item.photo} width={'100%'} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h6">{item.herb_name} {item.sci_name!==''?`(${item.sci_name})`:""}</Typography>
                                        <Typography variant="body1">{item.description}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <DeleteHerbs itemfile={item.photo} photoID={item.photo_ID3} deleteID={item.herb_ID} reload={setReload} page={"herb"} />
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