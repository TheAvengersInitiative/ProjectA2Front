import React from "react";
import { AppBar, Container, Toolbar, Typography, Box } from "@material-ui/core";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import ProjectPage from "./pages/proyects/ProjectPage";
import AddNewProject from "./pages/project/ProjectForm";
import { addProject, editProject } from "./utils/Projects";
import HomePage from "./pages/home/HomePage";
import RecoverPassword from "./components/RecoverPassword";
import ResetPassword from "./components/ResetPassword";
import TagList  from "./components/TagList";
import VerifyEmail  from "./components/VerifyEmail";


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
              <Route
                exact
                path="/forgot-password/:token"
                name="Recover Password"
                render={(props) => <RecoverPassword {...props} />}
              />
              <Route
                exact
                path="/reset-password"
                name="Reset Password"
                render={(props) => <ResetPassword {...props} />}
              />
              <Route
                exact
                path="/verify/:user/:token"
                name="Verify Email"
                render={(props) => <VerifyEmail {...props} />}
              />
              <Route
                exact
                path="/tags"
                name="Tag List"
                render={(props) => <TagList {...props} />}
              />
              <Route path="/my-projects/add">
                <AddNewProject
                  title="Add new project"
                  subtitle="Enter all the information to add a new project"
                  submit={addProject}
                />
              </Route>
              <Route path="/my-projects/:id">
                <AddNewProject
                  title="Edit project"
                  subtitle="Edit the information of an existing project"
                  submit={editProject}
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
