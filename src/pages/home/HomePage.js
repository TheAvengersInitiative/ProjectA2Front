import React, { useEffect, useState } from "react";
import ProjectDetail from "../../components/ProjectDetail";
import { getAllProject } from "../../utils/Projects";
import { Grid } from "@material-ui/core";

export default function HomePage() {
  const [projects, setProjects] = useState([]);

  async function fetchProjects() {
    try {
      const response = await getAllProject();
      setProjects(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
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
  );
}
