import { withSnackbar } from "../../components/SnackBarHOC";
import {
  IconButton,
  Grid,
  LinearProgress,
  Link,
  ListItem,
  ListItemText,
  List,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { Close, Check } from "@mui/icons-material";

import {
  acceptApplicant,
  getApplicants,
  rejectApplicant,
} from "../../utils/Projects";

const ApplicantList = (props) => {
  const { showMessage, projID, updateList } = props;

  const [applicants, setApplicants] = useState();

  const [loading, setLoading] = useState(true);

  async function fetchApplicants() {
    try {
      const response = await getApplicants(projID);

      setApplicants(response.data);
    } catch (e) {
      showMessage("error", "Opss... Something went wrong");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchApplicants();
  }, []);

  useEffect(() => {}, [applicants]);

  const onReject = async (values) => {
    try {
      await rejectApplicant(values, projID);

      showMessage("success", `User was rejected succesfully`);

      fetchApplicants();
    } catch (e) {
      showMessage(
        "error",
        typeof e?.response?.data === "string"
          ? e?.response?.data
          : "There was an error!"
      );
    }
  };
  const onAccept = async (values) => {
    try {
      await acceptApplicant(values, projID);
      await updateList()
      showMessage("success", `User was rejected succesfully`);

      fetchApplicants();
    } catch (e) {
      showMessage(
        "error",
        typeof e?.response?.data === "string"
          ? e?.response?.data
          : "There was an error!"
      );
    }
  };

  if (loading) return <LinearProgress />;
  return (
    <Grid
      container
      spacing={4}
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
    >
      <List container direction="column">
        {applicants?.length ? (
          applicants.map((item, index) => {
            return (
              <ListItem
                key={index}
                secondaryAction={
                  <Stack direction="row" spacing={2}>
                    <IconButton onClick={() => onReject(item.id)}>
                      <Close />
                    </IconButton>
                    <IconButton onClick={() => onAccept(item.id)}>
                      <Check />
                    </IconButton>
                  </Stack>
                }
              >
                <Link href={`/user/${item.id}`}>
                  <ListItemText primary={`${item.nickname}`} />
                </Link>
              </ListItem>
            );
          })
        ) : (
          <ListItem>
            <ListItemText primary={`There are no applicants`} />
          </ListItem>
        )}
      </List>
    </Grid>
  );
};
export default withSnackbar(ApplicantList);
