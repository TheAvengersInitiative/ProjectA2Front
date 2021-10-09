import { withSnackbar } from "../../components/SnackBarHOC";
import {
  Grid,
  LinearProgress,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
//import {List} from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import {
  acceptApplicant,
  getApplicants,
  rejectApplicant,
} from "../../utils/Projects";

const ApplicantList = (props) => {
  const { showMessage, projID } = props;
  console.log(showMessage);
  console.log(projID);

  const [applicants, setApplicants] = useState();

  const [loading, setLoading] = useState(true);

  async function fetchApplicants() {
    try {
      const response = await getApplicants(projID);
      console.log(response.data);
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

  console.log("aaaa", applicants);

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
      <div>
        {applicants.length > 0 &&
          applicants.map((item, index) => {
            console.log(item);
            return (
              <ListItem disablePadding key={index}>
                <ListItemText primary={`${item.nickname}`} />
                <ListItemButton
                  onClick={() => {
                    onReject(item.id);
                  }}
                >
                  <ListItemIcon>
                    <CancelIcon />
                  </ListItemIcon>
                </ListItemButton>
                <ListItemButton
                  onClick={() => {
                    onAccept(item.id);
                  }}
                >
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            );
          })}
      </div>
    </Grid>
  );
};
export default withSnackbar(ApplicantList);
