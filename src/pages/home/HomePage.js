import React, { useEffect, useState } from "react";
import ProjectDetail from "../../components/ProjectDetail";
import { Box, Grid } from "@mui/material";
import { withSnackbar } from "../../components/SnackBarHOC";
import Search from "../../components/Search";

function HomePage(props) {
  const [projects, setProjects] = useState([]);
  const { showMessage } = props;
  const filterList = [
    { label: "Title", value: "name" },
    { label: "Tag", value: "tag" },
    { label: "Language", value: "language" },
  ];

  useEffect(() => {
    //fetchProjects(); //Delete the comments to get all projects when mount the page
  }, [projects]);

  return (
    <Grid container direction="column">
      <Search
        state={projects}
        setState={setProjects}
        showMessage={showMessage}
        filters={filterList}
      />
      <Box mt={5}>
        <Grid item>
          <Grid container spacing={4} direction="row" justifyContent="center">
            {projects.length > 0 &&
              projects.map((item, index) => {
                return (
                  <Grid item s key={index}>
                    <Grid container alignItems="center" justifyContent="center">
                      <ProjectDetail project={item} feature={item.featured} />
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
export default withSnackbar(HomePage);
