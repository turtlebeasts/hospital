import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Input, List, ListItem, ListItemText, Modal, Typography } from '@mui/material';
import styled from '@emotion/styled';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const FileUploadComponent = ({reload}) => {

    const {id} = useParams()

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

    const [open, setOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };

    const handleRemoveFile = (fileName) => {
        const updatedFiles = selectedFiles.filter((file) => file.name !== fileName);
        setSelectedFiles(updatedFiles);
    };

    const fileToDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };
    const handleSubmit = async () => {
        const dataURLs = await Promise.all(selectedFiles.map(fileToDataURL));
        // console.log('Data URLs:', dataURLs);
        
        const backendEndpoint = `${import.meta.env.VITE_SITENAME}/hospital/mediaupload.php`;

        fetch(backendEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dataURLs, id: id }),
        })
            .then((response) => response.text())
            .then((data) => {
                if(data=='300'){
                    reload(true)
                    setOpen(false)
                }else{
                    console.log(data)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error
            });

    };

    return (
        <div>
            <Button onClick={handleOpen} color="primary" size='small' variant='contained' startIcon={<CloudUploadIcon />}>
                Add files
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle minWidth={400}>
                    Add attachments for {id}
                </DialogTitle>
                <DialogContent >
                    <Button component="label" variant="contained"
                        startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput type="file" multiple
                            onChange={handleFileChange} />
                    </Button>
                    <List >
                        {selectedFiles.map((file) => (
                            <ListItem key={file.name} secondaryAction={
                                <IconButton edge="end" onClick={() => handleRemoveFile(file.name)} color="secondary">
                                    <DeleteForeverIcon color='error' />
                                </IconButton>}>
                                <ListItemText primary={file.name} />
                            </ListItem>
                        ))}
                    </List>
                    <Button onClick={handleSubmit} variant="contained" color="primary" disabled={selectedFiles.length == 0}>
                        Submit
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FileUploadComponent;
