import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { PROJECTS } from "../../utils/ConstForTest";
import ProjectItem from "../../components/ProjectItem";
import ShimmerItemProject from "../../components/ShimmerItemProject";

function ProjectPage() {
  const [project, setProject] = useState();

  useEffect(() => {
    /*
    try{
      axios.get(`${BASE_URL}/api/route`).then((res)=>{
      setProject(res)}).catch(e){console.log(e)}
    }
     */
    setTimeout(() => {
      setProject(PROJECTS);
    }, 2000);
  }, []);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Grid justifyContent="space-between" container direction="row">
          <Box fontWeight={500} fontSize={30}>
            My project
          </Box>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            startIcon={<AddCircleIcon />}
          >
            Add project
          </Button>
        </Grid>
      </Grid>
      {project ? (
        project.length > 0 ? (
          <Grid item>
            <Box mt={3}>
              <Grid container spacing={2} direction="column">
                {}
                {project?.map((item, index) => (
                  <ProjectItem key={index} item={item} />
                ))}
              </Grid>
            </Box>
          </Grid>
        ) : (
          <Grid container justifyContent="center">
            <Grid item alignItems="stretch">
              <Grid alignItems="center">
                <Box minHeight="100vh">
                  Oops... You forget to add a project!
                </Box>
              </Grid>
            </Grid>
          </Grid>
        )
      ) : (
        [...Array(5).keys()].map((item, index) => (
          <Box mt={3} key={index}>
            <ShimmerItemProject />
          </Box>
        ))
      )}
    </Grid>
  );
}

export default ProjectPage;
