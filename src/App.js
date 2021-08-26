import React from "react";
import { AppBar, Container, Toolbar, Typography, Box } from "@material-ui/core";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ProjectPage from "./pages/proyects/ProjectPage";
import AddNewProject from "./pages/project/AddNewProject";
import { addProject } from "./utils/Projects";

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">A2</Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <Box mt={6}>
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                name="Home Page"
                render={(props) => <HomePage {...props} />}
              />
              <Route
                exact
                path="/my-projects"
                name="My projects"
                render={(props) => <ProjectPage {...props} />}
              />
              <Route path="/my-projects/add">
                <AddNewProject
                  title="Add new project"
                  subtitle="Enter all the information to add a new project"
                  submit={addProject}
                />
              </Route>
            </Switch>
          </Router>
        </Box>
      </Container>
    </>
  );
}

export default App;
