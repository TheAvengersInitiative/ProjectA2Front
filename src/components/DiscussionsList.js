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
} from "@mui/material";
import SubmitDialog from "./SubmitDialog";
import styled from "styled-components";

const DiscussionContainer = styled.div`
  padding-top: 30px;
  border-top-width: 1px;
  border-top-color: lightgrey;
  border-top-style: solid;
  margin-top: 100px;
  padding-bottom: 30px;
`;

function DiscussionsList(props) {
  const { discussions, fetchProject } = props;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DiscussionContainer>
      <Grid
        justifyContent="space-between"
        container
        direction="row"
        alignItems="center"
      >
        <Typography>Discussions ({discussions?.length})</Typography>
        <Button variant="outlined" disableElevation onClick={handleClickOpen}>
          Start a discussion
        </Button>
      </Grid>
      <Grid item xs={12}>
        {discussions ? (
          discussions.map((discussion, index) => (
            <Card variant="outlined" key={index} style={{ margin: "20px 0" }}>
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
            </Card>
          ))
        ) : (
          <Typography>There are no discussions</Typography>
        )}
      </Grid>
      <SubmitDialog
        open={open}
        handleClose={handleClose}
        fetchProject={fetchProject}
      />
    </DiscussionContainer>
  );
}

export default DiscussionsList;
