import React from 'react';
import { Form, Formik } from "formik";
import TextFieldContainer from "./TextFieldContainer";
import { withSnackbar } from "./SnackBarHOC";
import * as Yup from "yup";
import {
    Grid,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
  } from "@mui/material";

function SubmitDialog (props) {

  const { handleClose, handleAdd, open, showMessage } = props;

  const initialValues = {
    title: "",
    tags:"",
    description: "",
  };
  /*
  const [setTitle] = useState("");

  const [setTags] = useState("");

  const [setDescription] = useState("");

  const handleChange = (event) => {
    setTitle(event.target.value);
    setTags(event.target.value);
    setDescription(event.target.value);
  };
  */

  const validationSchema = Yup.object({
    title: Yup.string()
      .required()
      .min(3)
      .max(32)
      .label("Title"),

    description: Yup.string()
      .min(10)
      .max(750)
      .label("Description")
  });

  const onSubmit = async () => {
    try {
      /*formData["title"] = title;
      await recoverPassword(formData);*/
      showMessage("success", "Successfully updated the password");
    } catch (e) {
      showMessage("error", "An error occured");
    }
  };


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Start a discusion</DialogTitle>
      <DialogContent>
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
                          id="title"
                          label="Title"
                          formikProps={formikProps}
                          type="title"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextFieldContainer
                          id="tags"
                          label="Tags"
                          formikProps={formikProps}
                          type="tags"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextFieldContainer
                          id="description"
                          label="Description"
                          formikProps={formikProps}
                          type="description"
                        />
                      </Grid> 
                      <Grid item xs={9}>
                       <Button onClick={() => handleClose()} color="black" variant='outlined'>
                         Cancel
                       </Button>
                       </Grid>
                       <Grid item xs={3}>
                       <Button onClick={() => handleAdd()} color="black" variant='outlined' type='submit'>
                         Submit
                       </Button>
                       </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default withSnackbar(SubmitDialog);

/* 
       <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="title"
          fullWidth
          onChange={handleChange}
          value={title}
        />
        <TextField
          autoFocus
          margin="dense"
          id="tags"
          label="Tags"
          type="tags"
          fullWidth
          onChange={handleChange}
          value={tags}
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="description"
          fullWidth
          onChange={handleChange}
          value={description}
          multiline
        />*/