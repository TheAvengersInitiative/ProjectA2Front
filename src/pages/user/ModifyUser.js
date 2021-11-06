import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import TextFieldContainer from "../../components/TextFieldContainer";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

import { withSnackbar } from "../../components/SnackBarHOC";
import {
  getUserInfoById,
  deleteUser,
  editUserPrivacy,
} from "../../utils/Projects";
import { useAuth } from "../../contexts/AuthContext";

const validationSchema = yup.object().shape({
  email: yup.string().email().required().nullable().label("Email"),
  nickname: yup.string().required().nullable().min(3).max(24).label("Nickname"),
  biography: yup.string().nullable().max(500).label("Biography"),
  password: yup.string().min(8).max(32).label("Password"),

  passwordConfirmation: yup
    .string()
    .min(8)
    .max(31)
    .oneOf([yup.ref("password")], "Passwords do not match")
    .label("Password confirmation"),
});

const ModifyUser = (props) => {
  const [user, setUser] = useState(true);
  const [loading, setLoading] = useState(true);

  const { logOut } = useAuth();
  const initialValues = {
    email: "",
    nickname: "",
    biography: "",
    password: "",
    passwordConfirmation: "",
  };

  const { showMessage, submit, subtitle, title } = props;

  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [checkedTags, setCheckedTags] = React.useState(true);
  const [checkedLanguages, setCheckedLanguages] = React.useState(true);
  const [checkedOwnedProjects, setCheckedOwnedProjects] = React.useState(true);
  const [checkedCollabProjects, setCheckedCollabProjects] = React.useState(true);
  const [checkedEmail, setCheckedEmail] = React.useState(true);

  useEffect(() => {
    getUserInfoById()
      .then((res) => {
        setUser(res.data);
        console.log("holaa", user["tagsPrivacy"]);
        const response = res.data;
        setCheckedTags(response["tagsPrivacy"] === "PRIVATE" ? false : true);
        setCheckedLanguages(
          response["languagesPrivacy"] === "PRIVATE" ? false : true
        );
        setCheckedOwnedProjects(
          response["ownedProjectsPrivacy"] === "PRIVATE" ? false : true
        );
        setCheckedCollabProjects(
          response["collabProjectsPrivacy"] === "PRIVATE" ? false : true
        );
        setCheckedEmail(response['allowsNotifications'])
        setLoading(false);
      })
      .catch((e) => {
        showMessage("error", e.response?.data?.errors || "An error ocurred");
      });
  }, [
    setLoading,
    setCheckedCollabProjects,
    setCheckedOwnedProjects,
    setCheckedLanguages,
    setCheckedTags,
    setCheckedEmail
  ]);

  if (user) {
    Object.keys(initialValues).forEach(
      (key) => (initialValues[key] = user[key])
    );
  }

  const backCall = async (a, b, c, d, e) => {
    console.log(e);
    try {
      let body = {
        tagsPrivacy: a ? "PUBLIC" : "PRIVATE",
        languagesPrivacy: b ? "PUBLIC" : "PRIVATE",
        ownedProjectsPrivacy: c ? "PUBLIC" : "PRIVATE",
        collaboratedProjectsPrivacy: d ? "PUBLIC" : "PRIVATE",
        allowsNotifications: e
      };
      console.log(body)
      await editUserPrivacy(body);
      showMessage("success", "Success!");
    } catch (e) {
      showMessage("error", "Oops... Something went wrong!");
    }
  };

  const handleChangeTags = async (event) => {
    console.log(event.target.checked);
    setCheckedTags(event.target.checked);
    console.log(checkedTags);
    await backCall(
      event.target.checked,
      checkedLanguages,
      checkedOwnedProjects,
      checkedCollabProjects,
        checkedEmail
    );
  };
  const handleChangeLanguages = async (event) => {
    setCheckedLanguages(event.target.checked);
    await backCall(
      checkedTags,
      event.target.checked,
      checkedOwnedProjects,
      checkedCollabProjects,
        checkedEmail
    );
  };
  const handleChangeOwnedProjects = async (event) => {
    setCheckedOwnedProjects(event.target.checked);
    await backCall(
      checkedTags,
      checkedLanguages,
      event.target.checked,
      checkedCollabProjects,
        checkedEmail
    );
  };
  const handleChangeCollabProjects = async (event) => {
    setCheckedCollabProjects(event.target.checked);
    await backCall(
      checkedTags,
      checkedLanguages,
      checkedOwnedProjects,
      event.target.checked,
        checkedEmail
    );
  };

  const handleChangeEmail = async (event) => {
    console.log(event.target.checked);
    setCheckedEmail(event.target.checked);
    await backCall(
        checkedTags,
        checkedLanguages,
        checkedOwnedProjects,
        checkedCollabProjects,
        event.target.checked
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleGoHome = async () => {
    try {
      await deleteUser();
      showMessage("success", `Succesfully deleted your account`);

      logOut();

      setTimeout(() => {
        history.push("/");
      }, 1000);
    } catch (e) {
      showMessage("error", e.response?.data?.errors || "An error ocurred");
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (values) => {
    try {
      await submit(values);

      showMessage("success", "Succesfully modified user");

      setTimeout(() => {
        history.push(`/login`);
      }, 1000);
    } catch (e) {
      showMessage("error", e.response?.data || "An error ocurred");
    }
  };

  if (loading) return <LinearProgress />;
  return (
    <Container>
      <Box marginTop={6}>
        <Grid container justifyContent="center">
          <Grid container item xs={6} justifyContent="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">{title}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>{subtitle}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formikProps) => (
                  <Form onSubmit={formikProps.handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextFieldContainer
                          id="email"
                          label="Email"
                          formikProps={formikProps}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextFieldContainer
                          id="nickname"
                          label="Nickname"
                          formikProps={formikProps}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextFieldContainer
                          id="biography"
                          label="Biography"
                          formikProps={formikProps}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextFieldContainer
                          id="password"
                          label="New password"
                          formikProps={formikProps}
                          type="password"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextFieldContainer
                          id="passwordConfirmation"
                          label="New password confirmation"
                          formikProps={formikProps}
                          type="password"
                        />
                      </Grid>
                      <Grid
                        container
                        item
                        xs={12}
                        justifyContent={"space-between"}
                      >
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            {"UPDATE"}
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleClickOpen}
                          >
                            {"DELETE"}
                          </Button>
                        </Grid>
                      </Grid>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Delete your account"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Deleting your account is permanent and will remove
                            all content including projects and profile settings.
                            Are you sure you want to delete your account?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            CANCEL
                          </Button>
                          <Button
                            onClick={handleGoHome}
                            color="primary"
                            autoFocus
                          >
                            DELETE
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Stack direction={"column"} spacing={2}>
                <Stack direction={"row"}>
                  <Typography variant="h5">{"Configure Profile"}</Typography>
                </Stack>
                <Stack direction={"row"} alignItems="center">
                  <Typography>{"Tags: "}</Typography>
                  <Switch
                    checked={checkedTags}
                    onChange={handleChangeTags}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Stack>
                <Stack direction={"row"} alignItems="center">
                  <Typography>{"Languages: "}</Typography>
                  <Switch
                    checked={checkedLanguages}
                    onChange={handleChangeLanguages}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Stack>
                <Stack direction={"row"} alignItems="center">
                  <Typography>{"Owned Projects: "}</Typography>
                  <Switch
                    checked={checkedOwnedProjects}
                    onChange={handleChangeOwnedProjects}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Stack>
                <Stack direction={"row"} alignItems="center">
                  <Typography>{"Projects that I collaborate in: "}</Typography>
                  <Switch
                    checked={checkedCollabProjects}
                    onChange={handleChangeCollabProjects}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Stack>
                <Stack direction={"row"} alignItems="center">
                  <Typography>{"Allow email notifications"}</Typography>
                  <Switch
                    checked={checkedEmail}
                    onChange={handleChangeEmail}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default withSnackbar(ModifyUser);
