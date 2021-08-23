import React from "react";
import { AppBar, Container, Toolbar, Typography, Box } from "@material-ui/core";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ProjectPage from "./pages/proyects/ProjectPage";

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
            </Switch>
          </Router>
        </Box>
      </Container>
    </>
  );
}

export default App;
