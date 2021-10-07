import React, { useState } from "react";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogContentClassKey,
  DialogTitle,
} from "@mui/material";

export const AlertDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Logga ut dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle
          sx={{ p: 3, textAlign: "center", fontSize: "1.5em" }}
          id="alert-dialog-title"
        >
          {"Vill du logga ut?"}
        </DialogTitle>

        <DialogActions sx={{ p: 2 }}>
          <Button
            sx={{ mx: 1, px: 1, color: "textSecondary" }}
            variant="outlined"
            disableElevation
            onClick={handleClose}
          >
            Tillbaka
          </Button>
          <Button
            sx={{ mx: 1, px: 3 }}
            variant="contained"
            disableElevation
            onClick={handleClose}
            autoFocus
          >
            Logga ut
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
