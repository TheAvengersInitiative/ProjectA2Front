import React from "react";
import { withSnackbar } from "./SnackBarHOC";
import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { deleteComment } from "../utils/Projects";

function DeleteDiscussion(props) {
  const { handleClose, open, showMessage, fetchProject, id } = props;

  const onSubmit = async () => {
    try {
      await deleteComment(id);
      fetchProject();
      showMessage("success", "Successfully deleted the comment");
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
          Are you sure you want to delete this comment?
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
