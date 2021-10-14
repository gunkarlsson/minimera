import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

export const AlertDialog = ({ handleLogout, title }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        sx={{ my: "10px", border: "1px solid" }}
        variant="outlined"
        onClick={handleClickOpen}
        disableElevation
      >
        {title}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ p: 3, textAlign: "center", fontSize: "1.5em" }}>
          Vill du logga ut?
        </DialogTitle>

        <DialogActions sx={{ px: 3.5, py: 2.5, display: "flex" }}>
          <Button
            sx={{
              px: 1,
              mr: "10px",
            }}
            color="secondary"
            variant="outlined"
            disableElevation
            onClick={handleClose}
          >
            Tillbaka
          </Button>
          <Button
            sx={{
              px: 3,
            }}
            color="secondary"
            variant="contained"
            disableElevation
            onClick={handleLogout}
            autoFocus
          >
            Logga ut
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
