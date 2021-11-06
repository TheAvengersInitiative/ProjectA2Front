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
import styled from "styled-components";
import { useQuery } from "../../utils/globalfunction";
import { css, keyframes } from "@mui/styled-engine";

const highlightColor = keyframes`
  from {
    background-color: #dcdcdc;
  }

  to {
    background-color: white;
  }
`;

const AplicantList = styled(ListItem)`
  ${(props) => {
    if (props.highlight) {
      return css`
        animation-name: ${highlightColor};
        animation-duration: 2s;
      `;
    }
  }}
`;

const ApplicantList = (props) => {
  const { showMessage, projID, updateList } = props;

  const [applicants, setApplicants] = useState();

  const [loading, setLoading] = useState(true);

  let query = useQuery();

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

      await fetchApplicants();
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
      showMessage("success", `User was rejected succesfully`);
      await updateList();

      setTimeout(() => {
        //updateList();
        fetchApplicants();
      }, 1000);
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
              <AplicantList
                key={index}
                highlight={query.get("user") && query.get("user") === item.id}
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
              </AplicantList>
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
