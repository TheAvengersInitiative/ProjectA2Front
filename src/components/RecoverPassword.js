import React from 'react';
import { Form, Formik } from "formik"; 
import * as Yup from "yup";
import { Grid, Button, Typography, Container, Box } from '@material-ui/core'
import TextFieldContainer from './TextFieldContainer';

function RecoverPassword() {

    const initialValues = {
      password: "",
      repeatPassword: ""
    } 
    
    
    const validationSchema = Yup.object({
      password: Yup
      .string()
      .required("Password is required")
      .min(8, 'Password should be of minimum 8 characters length')
      .max(31, "Password must be less than 32 characters length")
      .oneOf([Yup.ref("repeatPassword")], "Passwords do not match"),
      
      repeatPassword: Yup
      .string()
      .required("Password is required")
      .min(8, 'Password should be of minimum 8 characters length')
      .max(31, "Password must be less than 32 characters length")
      .oneOf([Yup.ref("password")], "Passwords do not match")
    })

    const onSubmit = (formData) => {
        console.log(formData);
    }


  return (
    <Container>
      <Box marginTop={4}>
        <Grid container item xs = {6} spacing={1} alignContent="center" alignItems="rigth">
          <Grid item xs = {12}>
            <Typography variant="h5">Forgot Password</Typography>
          </Grid>
          <Grid item xs = {12}>
            <Typography variant="subtitle2">Please enter your new password</Typography>
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
                          id="password"
                          label="Password"
                          formikProps={formikProps}
                          type="password"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextFieldContainer
                          id="repeatPassword"
                          label="Repeat Password"
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
                        RECOVER
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
            {/* <form onSubmit={formik.handleSubmit}>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  variant="filled"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="repeatPassword"
                  name="repeatPassword"
                  label="Repeat Password"
                  type="password"
                  variant="filled"
                  value={formik.values.repeatPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                  helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <Button color="primary" variant="contained" type="submit">
                  RECOVER
                </Button>
              </Grid>
            </form> */}
        </Grid>
      </Box>
    </Container>

 
  );
}

export default RecoverPassword;

/*style = {{
  textAlign: "center", 
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  height: "100vh"
}}>
<h1>Forgot Password</h1>
<Form style={{width: "30%"}} onSubmit = {formik.handleSubmit}>
  <Form.Input type = "password" placeholder = "Password" name = "password" onChange = {formik.handleChange} error = {formik.errors.password} value = {formik.values.password}/>
  <Form.Input type = "password" placeholder = "Password Confirmation" name = "repeatPassword" onChange = {formik.handleChange} error = {formik.errors.repeatPassword} value = {formik.values.repeatPassword}/>
  <Button type = "submit" color = "violet">RECOVER</Button>
</Form>*/