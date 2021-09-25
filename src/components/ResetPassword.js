import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Grid, Button, Typography, Container, Box } from "@material-ui/core";
import TextFieldContainer from "./TextFieldContainer";
import { withSnackbar } from "./SnackBarHOC";
import { resetPassword } from "../utils/Projects";

function ResetPassword(props) {
  const { showMessage } = props;

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const onSubmit = async (formData) => {
    try {
      await resetPassword(formData);
      showMessage("success", "Your password was successfuly reseted");
      setTimeout(() => {
        history.push("my-proyects");
      }, 1000);
    } catch (e) {
      showMessage("error", "An error occured");
    }
  };

  return (
    <Container>
      <Box marginTop={4}>
        <Grid container justify="center">
          <Grid container item xs={6} spacing={1} alignContent="center">
            <Grid item xs={12}>
              <Typography variant="h5">Reset password</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">
                Please enter your email to receive instructions to reset your
                password{" "}
              </Typography>
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
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          RESET
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
}

export default withSnackbar(ResetPassword);