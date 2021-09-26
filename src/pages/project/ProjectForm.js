import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  Chip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import TextFieldContainer from "../../components/TextFieldContainer";
import * as yup from "yup";
import { useHistory, useParams } from "react-router-dom";

import { withSnackbar } from "../../components/SnackBarHOC";
import { getLanguages, getProjectById } from "../../utils/Projects";
import { Autocomplete } from "@material-ui/lab";

const validationSchema = yup.object().shape({
  title: yup.string().required().nullable().min(5).max(25).label("Title"),
  description: yup.string().required().nullable(),
  links: yup.string().required().nullable(),
  tags: yup.string().required().nullable(),
});

export const ProjectForm = (props) => {
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    links: "",
    tags: "",
  });
  let { id } = useParams();

  const { showMessage } = props;

  useEffect(() => {
    if (id) {
      getProjectById(id)
        .then((res) => {
          const value = {};
          Object.keys(res.data).forEach((key) => (value[key] = res.data[key]));

          value["tags"] = value["tags"].join();
          value["links"] = value["links"].join();
          setInitialValues(value);
        })
        .catch(() => {
          showMessage("error", "There was an error!");
        });
    }
  }, []);

  return (
    <>
      {id ? (
        initialValues.title && (
          <ShowForm initialValues={initialValues} id={id} {...props} />
        )
      ) : (
        <ShowForm initialValues={initialValues} {...props} />
      )}
    </>
  );
};

export const ShowForm = (props) => {
  const { title, subtitle, submit, showMessage, initialValues, id } = props;
  const history = useHistory();

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

  const [tags, setTags] = useState([]);

  async function fetchTags() {
    try {
      const response = await getLanguages();
      setTags(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <Container>
      <Box marginTop={6}>
        <Grid container justifyContent="center">
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
                          helperText="Separate values using commas"
                          formikProps={formikProps}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Autocomplete
                          multiple
                          size="medium"
                          options={tags}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip
                                key={index}
                                variant="outlined"
                                label={option}
                                size="small"
                                {...getTagProps({ index })}
                              />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="filled"
                              label="Tags"
                              helperText="Choose a maximum of three tags"
                            />
                          )}
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
};

/*
const availableTags = [
  "Java",
  "C",
  "C++",
  "Python",
  "Visual Basic .NET",
  "PHP",
  "JavaScript",
  "TypeScript",
  "Delphi/Object Pascal",
  "Swift",
  "Perl",
  "Ruby",
  "Assembly language",
  "R",
  "Visual Basic",
  "Objective-C",
  "Go",
  "MATLAB",
  "PL/SQL",
  "Scratch",
  "SAS",
  "D",
  "Dart",
  "ABAP",
  "COBOL",
  "Ada",
  "Fortran",
  "Transact-SQL",
  "Lua",
  "Scala",
  "Logo",
  "F#",
  "Lisp",
  "LabVIEW",
  "Prolog",
  "Haskell",
  "Scheme",
  "Groovy",
  "RPG (OS/400)",
  "Apex",
  "Erlang",
  "MQL4",
  "Rust",
  "Bash",
  "Ladder Logic",
  "Q",
  "Julia",
  "Alice",
  "VHDL",
  "Awk",
  "(Visual) FoxPro",
  "ABC",
  "ActionScript",
  "APL",
  "AutoLISP",
  "bc",
  "BlitzMax",
  "Bourne shell",
  "C shell",
  "CFML",
  "cg",
  "CL (OS/400)",
  "Clipper",
  "Clojure",
  "Common Lisp",
  "Crystal",
  "Eiffel",
  "Elixir",
  "Elm",
  "Emacs Lisp",
  "Forth",
  "Hack",
  "Icon",
  "IDL",
  "Inform",
  "Io",
  "J",
  "Korn shell",
  "Kotlin",
  "Maple",
  "ML",
  "NATURAL",
  "NXT-G",
  "OCaml",
  "OpenCL",
  "OpenEdge ABL",
  "Oz",
  "PL/I",
  "PowerShell",
  "REXX",
  "Ring",
  "S",
  "Smalltalk",
  "SPARK",
  "SPSS",
  "Standard ML",
  "Stata",
  "Tcl",
  "VBScript",
  "Verilog",
];
*/

export default withSnackbar(ProjectForm);
