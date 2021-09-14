import React, {useState} from "react";
import {TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';


export default function TagDialog (props) {

    const {handleClose, handleAdd, open} = props;
    
    const [name, setName] = useState("");
    
    const handleChange = (event) => {
        setName(event.target.value);
      };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Tag</DialogTitle>
          <DialogContent>
            <DialogContentText>To add a new tag, please enter the name here. </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="name"
              fullWidth
              onChange={handleChange}
              value={name}
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleAdd(name)} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
    );
}
