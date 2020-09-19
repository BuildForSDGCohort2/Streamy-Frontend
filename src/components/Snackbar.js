import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackBar({ isOpen, variant, message }) {
  const [open, setOpen] = useState(isOpen);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(!isOpen);
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      //   key={vertical + horizontal}
    >
      <Alert onClose={handleClose} severity={variant}>
        {message}
      </Alert>
    </Snackbar>
  );
}
