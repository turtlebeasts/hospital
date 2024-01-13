import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from '@mui/material';

const DeleteConfirmationModal = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this Item?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          No
        </Button>
        <Button onClick={onConfirm} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteHerbs = ({ photoID, deleteID, reload, page }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/${page}.php?del_id=${deleteID}`)
    const result = await response.json()
    if (result === 200) {
      reload(true)
    } else {
      console.log("Error occured")
      console.log(result)
    }
    setIsModalOpen(false); // Close the modal after confirming delete
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <IconButton variant="contained" color="error" onClick={handleDelete}>
        <DeleteForeverIcon />
      </IconButton>
      <DeleteConfirmationModal
        open={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default DeleteHerbs;
