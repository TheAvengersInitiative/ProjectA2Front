import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import TextFieldContainer from "../../components/TextFieldContainer";
import * as yup from "yup";
import  {useHistory}  from "react-router-dom";

import { withSnackbar } from "../../components/SnackBarHOC";

const validationSchema = yup.object().shape({
    email: yup.string().email().required().nullable(),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password should be of minimum 8 characters length")
        .max(31, "Password must be less than 32 characters length"),

});

export const Login = (props) => {
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

export const ShowForm = (props) => {
    const { title, subtitle, submit, showMessage, initialValues } = props;
    const history = useHistory();

    const onSubmit = async (values) => {
        try {
            await submit(values);

            showMessage("success", `Succesfully logged in`);

            setTimeout(() => {
                history.push(`/login`);
            }, 1000);
        } catch (e) {
            showMessage("error", e.response?.data?.errors || "Ocurrio un error");
            //la cuenta no está activa??
        }
    };
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