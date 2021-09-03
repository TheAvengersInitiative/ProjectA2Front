import React, { useEffect, useState } from "react";
import ProjectDetail from "../../components/ProjectDetail";
import { searchProjectByName } from "../../utils/Projects";
import { Box, Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { withSnackbar } from "../../components/SnackBarHOC";

function HomePage(props) {
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");
  const { showMessage } = props;

  /*  async function fetchProjects() {
    try {
      const response = await getAllProject();
      setProjects(response.data);
    } catch (e) {
      showMessage("error", "Opss... Something went wrong!");
    }
  }*/

  const timer = async () => {
    setTimeout(async () => {
      try {
        await searchProject(query);
      } catch (e) {
        showMessage("error", "Opss... Something went wrong!");
      }
      timer();
    }, 2000);
  };

  //timer()

  useEffect(() => {
    //fetchProjects(); //Delete the comments to get all projects when mount the page
  }, []);

  const searchProject = async (queryName) => {
    const response = await searchProjectByName(queryName);
    setQuery(queryName);
    setProjects(response.data);
  };

  const handleKeyDown = async (event) => {
    try {
      await searchProject(event.target.defaultValue);
      timer();
    } catch (e) {
      showMessage("error", "Opss... Something went wrong!");
    }
  };

  return (
    <Grid container direction="column">
      <Box mb={5}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          options={projects ? projects.map((item) => item.title) : "No results"}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search project"
              margin="normal"
              variant="outlined"
              onKeyUp={handleKeyDown}
              InputProps={{ ...params.InputProps, type: "search" }}
            />
          )}
        />
        <Box mb={5}>
          <Typography color="textSecondary">
            {projects && projects.length === 0
              ? "No results"
              : `${projects.length} Results`}
          </Typography>
        </Box>
      </Box>
      <Grid item>
        <Grid container spacing={4} direction="row">
          {projects.length > 0 &&
            projects.map((item, index) => {
              return (
                <Grid item xs key={index}>
                  <Grid container alignItems="center" justifyContent="center">
                    <ProjectDetail project={item} />
                  </Grid>
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
}
export default withSnackbar(HomePage);
