import React from "react";
import { Container, Box } from "@mui/material";
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
import AppBarMenu from "./components/AppBarMenu";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./contexts/PrivateRoute";
import ModifyUser from "./pages/user/ModifyUser";
import Profile from "./pages/user/Profile";
import ManageProject from "./pages/proyects/ManageProject";
import ProjectDetails from "./pages/project/ProjectDetails";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppBarMenu />

        <Container>
          <Box mt={6} mb={4}>
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
              <PrivateRoute path="/profile">
                <ModifyUser title="Profile" subtitle="" submit={editUserInfo} />
              </PrivateRoute>
              <PrivateRoute path="/project/:id/manage">
                <ManageProject />
              </PrivateRoute>

              <Route
                exact
                path="/"
                name="Home Page"
                render={(props) => <HomePage {...props} />}
              />
              <Route
                exact
                path="/user/:id"
                name="Profile"
                render={(props) => <Profile {...props} />}
              />
              <Route
                exact
                path="/forgot-password/:user/:token"
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
                path="/project/:id"
                name="Project Detail"
                render={(props) => <ProjectDetails {...props} />}
              />
              <PrivateRoute exact path="/my-projects" name="My projects">
                <ProjectPage />
              </PrivateRoute>
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
          </Box>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
