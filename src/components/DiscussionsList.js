import React, { useState } from "react";

import {
  Grid,
  Button,
  Typography,
  Box,
  Chip,
  Card,
  CardContent,
  CardHeader,
  CardActions,
} from "@mui/material";
import SubmitDialog from "./SubmitDialog";
import DeleteDiscussion from "./DeleteDiscussion";

function DiscussionsList(props) {
  const { discussions, fetchProject } = props;

  const [openSubmitD, setOpenSubmitD] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpenSubmitD = () => {
    setOpenSubmitD(true);
  };

  const handleCloseSumbmitD = () => {
    setOpenSubmitD(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <div>
      <Grid
        justifyContent="space-between"
        container
        direction="row"
        alignItems="center"
      >
        <Typography>Discussions ({discussions?.length})</Typography>
        <Button variant="outlined" disableElevation onClick={handleClickOpenSubmitD}>
          Start a discussion
        </Button>
      </Grid>
      <Grid item xs={12}>
        {discussions ? (
          discussions.map((discussion, index) => (
            <Card variant="outlined" key={index}>
              <CardHeader title={discussion.title} />
              <CardContent>
                <Box ml={1}>
                  <Grid container direction="row">
                    <Grid>
                      <Typography>Tags: </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row">
                        {discussion.forumTags.map((item, index) => (
                          <Box ml={1} key={index}>
                            <Chip
                              variant="filled"
                              color="secondary"
                              size="small"
                              label={item.name}
                            />
                          </Box>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Typography>Body: {discussion.body} </Typography>
                  </Grid>
                  <Typography>
                    User: {discussion.project.owner.nickname}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
              <Button size="small" onClick={handleClickOpenDelete}>
                Delete 
              </Button>
              <DeleteDiscussion open={openDelete} handle={handleCloseDelete}/>
              <Button size="small">Edit</Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography>There are no discussions</Typography>
        )}
      </Grid>
      <SubmitDialog
        open={openSubmitD}
        handleClose={handleCloseSumbmitD}
        fetchProject={fetchProject}
      />
    </div>
  );
}

export default DiscussionsList;
