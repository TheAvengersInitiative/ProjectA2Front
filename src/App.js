import React from "react";
import { Container, Box } from "@material-ui/core";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import ProjectPage from "./pages/proyects/ProjectPage";
import AddNewProject from "./pages/project/ProjectForm";
import {
  addProject,
  editProject,
  register,
    login,
  editUserInfo,
} from "./utils/Projects";
import HomePage from "./pages/home/HomePage";
import RecoverPassword from "./components/RecoverPassword";
import ResetPassword from "./components/ResetPassword";
import Register from "./pages/session/Register";
import VerifyEmail from "./components/VerifyEmail";
import Login from "./pages/session/Login";
import { AppBarMenu } from "./components/AppBarMenu";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./contexts/PrivateRoute";
import ModifyUser from "./pages/user/ModifyUser";

function App() {
  return (
    <AuthProvider>
      <AppBarMenu />

      <Container>
        <Box mt={6}>
          <Router>
            <Switch>
              <Route path="/register">
                <Register
                  title="Register"
                  subtitle="Enter the data to register to the A2 app"
                  submit={register}
                />
              </Route>
              <Route path="/login">
                <Login
                  title="Login"
                  subtitle="Please enter your credentials to login into the app"
                  submit={login}
                />
              </Route>
              <Route
                path="/profile"
                render={(props) => (
                  <ModifyUser
                    title="Profile"
                    subtitle=""
                    submit={editUserInfo}
                    {...props}
                  />
                )}
              ></Route>
              <Route
                exact
                path="/"
                name="Home Page"
                render={(props) => <HomePage {...props} />}
              />
              <PrivateRoute exact path="/my-projects" name="My projects">
                <ProjectPage />
              </PrivateRoute>
              <Route
                exact
                path="/forgot-password/:token"
                name="Recover Password"
                render={(props) => <RecoverPassword {...props} />}
              />
              <Route
                  exact
                  path="/verify/:user/:token"
                  name="Verify Email"
                  render={(props) => <VerifyEmail {...props} />}
              />

              <PrivateRoute path="/my-projects/add">
                <AddNewProject
                    title="Add new project"
                    subtitle="Enter all the information to add a new project"
                    submit={addProject}
                />
              </PrivateRoute>
              <PrivateRoute path="/my-projects/:id">
                <AddNewProject
                    title="Edit project"
                    subtitle="Edit the information of an existing project"
                    submit={editProject}
                />
              </PrivateRoute>
            </Switch>
          </Router>
        </Box>
      </Container>
    </>
  );
}

export default App;
