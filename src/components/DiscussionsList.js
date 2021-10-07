import React, { useState } from "react";

import { Grid, Button, Typography } from "@mui/material";
import SubmitDialog from "./SubmitDialog";

function DiscussionsList(props) {
  const { discussions } = props;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid
        justifyContent="space-between"
        container
        direction="row"
        alignItems="center"
      >
        <Typography>Discussions (3)</Typography>
        <Button variant="outlined" disableElevation onClick={handleClickOpen}>
          Start a discusion
        </Button>
      </Grid>
      <Grid item xs={12}>
        {discussions ? (
          discussions.map((element, key) => (
            <Typography key={key}>{element}</Typography>
          ))
        ) : (
          <Typography>There are no discussions</Typography>
        )}
      </Grid>
      <SubmitDialog open={open} handleClose={handleClose} />
    </div>
  );
}

export default DiscussionsList;
