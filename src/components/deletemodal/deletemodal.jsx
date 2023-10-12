import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const DeleteConfirmationModal = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this entry?
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

const DeleteModal = ({ deleteID, reload }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const response = await fetch("http://localhost/hospital/delete.php?id="+deleteID)
    const result = await response.json()
    if(result===200){
      reload(true)
    }else{
      console.log("Error occured")
      console.log(result)
    }
    setIsModalOpen(false); // Close the modal after confirming delete
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="error" onClick={handleDelete}>
        Delete
      </Button>

      <DeleteConfirmationModal
        open={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default DeleteModal;
