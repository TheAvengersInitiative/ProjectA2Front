import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import TextFieldContainer from "../../components/TextFieldContainer";
import * as yup from "yup";
import { useHistory, useParams } from "react-router-dom";

import { withSnackbar } from "../../components/SnackBarHOC";
import { getProjectById } from "../../utils/Projects";

const validationSchema = yup.object().shape({
  title: yup.string().required().nullable().min(5).max(25).label("Title"),
  description: yup.string().required().nullable(),
  links: yup.string().required().nullable(),
  tags: yup.string().required().nullable(),
});

function ProjectForm(props) {
  const initialValues = {
    title: "",
    description: "",
    links: "",
    tags: "",
  };
  const history = useHistory();
  let { id } = useParams();

  const { title, subtitle, submit, showMessage } = props;

  useEffect(() => {
    if (id) {
      getProjectById(id)
        .then((res) => {
          Object.keys(res.data).forEach(
            (key) => (initialValues[key] = res.data[key])
          );

          initialValues["tags"] = initialValues["tags"].join();
          initialValues["links"] = initialValues["links"].join();
        })
        .catch(() => {
          showMessage("error", "There was an error!");
        });
    }
  }, []);

  const onSubmit = async (values) => {
    const array = values.tags.split(",");
    values.tags = array;

    const array2 = values.links.split(",");
    values.links = array2;

    try {
      id ? await submit(id, values) : await submit(values);

      showMessage(
        "success",
        `Project was ${id ? "edited" : "created"} successfully`
      );

      setTimeout(() => {
        history.push(`/my-projects`);
      }, 1000);
    } catch (e) {
      showMessage("error", "There was an error!");
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
                          id="title"
                          label="Title"
                          formikProps={formikProps}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextFieldContainer
                          id="description"
                          label="Description"
                          formikProps={formikProps}
                          multiline
                          rows={6}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextFieldContainer
                          id="links"
                          label="Links"
                          formikProps={formikProps}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextFieldContainer
                          id="tags"
                          label="Tags"
                          formikProps={formikProps}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          {id ? "Edit" : "Add"}
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

export default withSnackbar(ProjectForm);
