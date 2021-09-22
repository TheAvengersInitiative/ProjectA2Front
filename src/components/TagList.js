import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Container,
  Box,
  Chip,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import { withSnackbar } from "./SnackBarHOC";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { addTag, getTags } from "../utils/Projects";
import TagDialog from "./TagDialog";

function TagList(props) {
  const { showMessage } = props;

  const [open, setOpen] = useState(false);

  const [tags, setTags] = useState([]);

  const [loading, setLoading] = useState(true);

  const handleDelete = () => {
    showMessage("error", "Not allowed");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAdd = async (data) => {
    try {
      await addTag({ name: data });
      setOpen(false);
      window.location.reload();
    } catch (e) {
      showMessage("error", "Opss... Something went wrong");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function fetchTags() {
    try {
      const response = await getTags();
      setTags(response.data);
    } catch (e) {
      showMessage("error", "Opss... Something went wrong");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <Container>
      <Box marginTop={4}>
        {loading ? (
          <LinearProgress />
        ) : (
          <Grid container justify="left">
            <Grid container item xs={12} spacing={1} alignContent="center">
              <Grid item xs={12}>
                <Grid justifyContent="space-between" container direction="row">
                  <Box fontWeight={500} fontSize={30}>
                    Tags
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={handleClickOpen}
                    startIcon={<AddCircleIcon />}
                  >
                    Add Tag
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {tags.length ? (
                  tags.map((tag, index) => (
                    <Chip
                      key={index}
                      variant="outlined"
                      color="primary"
                      label={tag}
                      style={{ marginRight: "10px" }}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <Typography>You don´t have any tags created!</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>
      <TagDialog open={open} handleAdd={handleAdd} handleClose={handleClose} />
    </Container>
  );
}

export default withSnackbar(TagList);
