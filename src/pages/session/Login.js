import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Formik, Form } from "formik";
import TextFieldContainer from "../../components/TextFieldContainer";
import * as yup from "yup";
import { useHistory, Redirect } from "react-router-dom";

import { withSnackbar } from "../../components/SnackBarHOC";
import { useAuth } from "../../contexts/AuthContext";

const validationSchema = yup.object().shape({
  email: yup.string().email().required().nullable().label("Email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8)
    .max(31)
    .label("Password"),
});

const Login = (props) => {
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <>
      <ShowForm initialValues={initialValues} {...props} />
    </>
  );
};

const ShowForm = (props) => {
  const { title, subtitle, submit, showMessage, initialValues } = props;
  const history = useHistory();
  const { setUserInfo, isUserLoggedIn } = useAuth();

  const onSubmit = async (values) => {
    try {
      const response = await submit(values);
      setUserInfo(response);
      showMessage("success", `Succesfully logged in`);

      setTimeout(() => {
        history.push(`/home`);
      }, 1000);
    } catch (e) {
      showMessage("error", e.response?.data?.errors || "Invalid credentials");
      //la cuenta no está activa??
    }
  };
  if (isUserLoggedIn()) return <Redirect to={"/home"} />;
  return (
    <Container>
      <Box marginTop={6}>
        <Grid container justify="center">
          <Grid container item xs={6} justify="center" spacing={2}>
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
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextFieldContainer
                          id="password"
                          label="Password"
                          formikProps={formikProps}
                          type="password"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          {"Login"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default withSnackbar(Login);