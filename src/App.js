import React from "react";
import { AppBar, Container, Toolbar, Typography, Box } from "@material-ui/core";
import { HashRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";

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
          <HashRouter>
            <Switch>
              <Route
                exact
                path="/"
                name="Home Page"
                render={(props) => <HomePage {...props} />}
              />
            </Switch>
          </HashRouter>
        </Box>
      </Container>
    </>
  );
}

export default App;
