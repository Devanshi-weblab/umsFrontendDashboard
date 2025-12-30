import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

import API from "../api/api";

const DeleteSingle = ({ open, data, onClose, onSuccess }) => {
  const handleDelete = async () => {
    try {
      await API.delete(`/programs/${data._id}`);
      onSuccess();
      onClose();
    } catch (error) {
      console.error(
        "Failed to delete program:",
        error.response?.data || error.message
      );
    }
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>

      <Typography sx={{ px: 3 }}>
        Are you sure you want to delete{" "}
        <strong>{data?.programName}</strong>?
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
