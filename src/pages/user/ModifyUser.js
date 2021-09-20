import {
    Box,
    Button,
    Container,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Typography
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import { Formik, Form } from "formik";
import TextFieldContainer from "../../components/TextFieldContainer";
import * as yup from "yup";
import {useHistory, useParams} from "react-router-dom";

import { withSnackbar } from "../../components/SnackBarHOC";
import {getUserInfoById} from "../../utils/Projects";

const validationSchema = yup.object().shape({
    email: yup.string().email().required().nullable(),
    nickname: yup.string().required().nullable().min(3).max(24),
    bio: yup.string().nullable().max(500),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password should be of minimum 8 characters length")
        .max(31, "Password must be less than 32 characters length"),
    //.oneOf([yup.ref("repeatPassword")], "Passwords do not match"),

    passwordConfirmation: yup
        .string()
        .required("Password is required")
        .min(8, "Password should be of minimum 8 characters length")
        .max(31, "Password must be less than 32 characters length")
        .oneOf([yup.ref("password")], "Passwords do not match"),
    //chequear que las dos passwords sean iguales
});

export const ModifyUser = (props) => {

    const [initialValues, setInitialValues] = useState({
        email: "",
        nickname: "",
        bio: "",
        password: "",
        passwordConfirmation: "",
    });
    let { id } = useParams();

    const { showMessage } = props;

    useEffect(() => {
        if (id) {
            getUserInfoById(id)
                .then((res) => {
                    console.log(res.data);
                    const value = {};
                    Object.keys(res.data).forEach((key) => (value[key] = res.data[key]));

                    setInitialValues(value);
                })
                .catch(() => {
                    showMessage("error", "There was an error!");
                });
        }
    }, []);

    useEffect(() => {
        console.log("init ", initialValues);
    }, [initialValues]);

    return (
        <>{
            initialValues.email && (
            <ShowForm initialValues={initialValues} id={id} {...props} />
            )
        }
        </>
    );
};

export const ShowForm = (props) => {
    const { title, subtitle, submit, showMessage, initialValues } = props;
    const history = useHistory();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleGoHome = (values) => {
        try {
            //borrar el usuario. falta end point

            showMessage("success", `Succesfully deleted your account`);

            setTimeout(() => {
                history.push('/home');
            }, 1000);
        } catch (e) {
            showMessage("error", "An error ocurred");
        }

    };
    const handleClose = () =>{
        setOpen(false);
    }

    const onSubmit = async (values) => {
        try {
            await submit(id, values)

            showMessage("success", `Succesfully created user`);

            setTimeout(() => {
                history.push(`/login`);
            }, 1000);
        } catch (e) {
            showMessage("error", "An error ocurred");
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
                                                    id="nickname"
                                                    label="Nickname"
                                                    formikProps={formikProps}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFieldContainer
                                                    id="bio"
                                                    label="Bio"
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
                                                <TextFieldContainer
                                                    id="passwordConfirmation"
                                                    label="Password confirmation"
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
                                                    {"UPDATE"}
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    onClick={handleClickOpen}
                                                >
                                                    {"DELETE"}
                                                </Button>
                                            </Grid>
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">{"Delete your account"}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        Deleting your account is permanent and will remove all content including comments, avatars and profile settings. Are you sure you want to delete your account?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose} color="primary">
                                                        CANCEL
                                                    </Button>
                                                    <Button onClick={handleGoHome} color="primary" autoFocus>
                                                        DELETE
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
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

export default withSnackbar(ModifyUser);