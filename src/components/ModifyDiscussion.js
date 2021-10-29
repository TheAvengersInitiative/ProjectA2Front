import React, { useState } from "react";
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
  Autocomplete,
  Chip,
  TextField,
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { modifyDiscussion } from "../utils/Projects";

function ModifyDiscussion(props) {
  const { handleClose, open, showMessage, id, fetchProject } = props;

  const [tags] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);

  const filter = createFilterOptions();

  const initialValues = {
    title: "",
    tags: "",
    body: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required().min(3).max(32).label("Title"),

    body: Yup.string().min(10).max(750).label("Body"),
  });

  const onSubmit = async (formData) => {
    try {
      formData.forumTags = selectedTags;
      await modifyDiscussion(id, formData);
      fetchProject();
      showMessage("success", "Successfully modified the discussion");
      handleClose();
    } catch (e) {
      showMessage(
        "error",
        typeof e?.response?.data === "string"
          ? e?.response?.data
          : "There was an error!"
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Modify Discussion</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formikProps) => (
            <Form>
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
                  <Autocomplete
                    noOptionsText="Tag must have at least 1 character and at most 24 charaters"
                    multiple
                    size="medium"
                    options={tags}
                    onChange={(_, newValue) => {
                      setSelectedTags(newValue);
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);

                      const input = params.inputValue;
                      if (
                        input !== "" &&
                        input.length >= 1 &&
                        input.length <= 24
                      ) {
                        filtered.push(input);
                      }

                      return filtered;
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={index}
                          label={option}
                          size="small"
                          color="success"
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        label="Tags"
                        helperText="Choose a minimum of 1 and a maximum of 5 tags"
                      />
                    )}
                  />
                  <Grid item xs={12}>
                    <TextFieldContainer
                      id="body"
                      label="Body"
                      formikProps={formikProps}
                      type="body"
                      multiline
                      rows={5}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={10}>
                  <Button onClick={() => handleClose()} variant="outlined">
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button variant="outlined" type="submit">
                    Update
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

export default withSnackbar(ModifyDiscussion);
