import React from "react";
//import { useParams } from "react-router-dom";
import { withSnackbar } from "./SnackBarHOC";
import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { deleteDiscussion } from "../utils/Projects";

function DeleteDiscussion(props) {
  const { handleClose, open, showMessage, fetchProject } = props;

  const onSubmit = async () => {
    try {
      await deleteDiscussion(open);
      fetchProject();
      showMessage("success", "Successfully deleted the discussion");
      handleClose();
    } catch (e) {
      showMessage("error", "An error occured");
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this discussion?
        </DialogContentText>
        <Grid container spacing={20}>
          <Grid item xs={6}>
            <Button onClick={handleClose}>Cancel</Button>
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" onClick={onSubmit}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default withSnackbar(DeleteDiscussion);
