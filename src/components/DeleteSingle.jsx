import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

import API from "../api/api";

const DeleteSingle = ({ open, id, onClose, onSuccess }) => {

  const handleDelete = async () => {
    try {
      await API.delete(`/programs/${id}`);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>

      <Typography sx={{ px: 3 }}>
        Are you sure you want to delete?
      </Typography>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteSingle;
