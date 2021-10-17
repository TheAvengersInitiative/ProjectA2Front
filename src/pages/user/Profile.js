import React, { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { withSnackbar } from "../../components/SnackBarHOC";
import ProjectDetail from "../../components/ProjectDetail";
import { getOtherUsersInfoById } from "../../utils/Projects";
import { useParams } from "react-router-dom";
import ChipGroup from "../../components/ChipGroup";
import ReviewTable from "./ReviewTable";
import { mean } from "lodash";
import { Rating } from "@mui/lab";

const Profile = (props) => {
  const { showMessage } = props;
  const [userInfo, setUserinfo] = useState();
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  async function fetchUserInfo() {
    try {
      const response = await getOtherUsersInfoById(id);
      setUserinfo(response.data);
    } catch (e) {
      showMessage("error", "Opss... Something went wrong");
    }
    setLoading(false);
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (loading) return <LinearProgress />;
  return (
    <Grid container item xs={12} spacing={3}>
      <Grid
        item
        container
        xs={12}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">{userInfo?.nickname}</Typography>
        <Button variant="outlined" onClick={handleClickOpen}>
          Check user reputation
        </Button>
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>{`${userInfo?.nickname} reputation`}</DialogTitle>
        <DialogContent>
          <Grid container justifyContent="center">
            <Stack direction="row" spacing={2}>
              <Typography>
                {mean(
                  userInfo?.collaboratedProjects?.map(
                    (project) =>
                      project.reviews[project.reviews.length - 1].score
                  )
                )}
              </Typography>
              <Rating
                name="read-only"
                value={mean(
                  userInfo?.collaboratedProjects?.map(
                    (project) =>
                      project.reviews[project.reviews.length - 1].score
                  )
                )}
                readOnly
              />
            </Stack>
          </Grid>
        </DialogContent>
        <DialogTitle>{`${userInfo?.nickname} last reviews`}</DialogTitle>
        <DialogContent>
          <ReviewTable
            rows={userInfo?.collaboratedProjects?.flatMap((project) => {
              let review = project.reviews;
              review.title = project.title;

              return review;
            })}
          />
        </DialogContent>
      </Dialog>
      <Grid item xs={12}>
        <Typography variant="h6">{userInfo?.biography}</Typography>
      </Grid>

      {userInfo?.preferredTags && userInfo?.preferredTags?.length > 0 && (
        <Grid item container xs={12} spacing={2} alignItems={"center"}>
          <Grid item>
            <Typography>{"Tags: "}</Typography>
          </Grid>
          <Grid item>
            <ChipGroup array={userInfo?.preferredTags} color={"success"} />
          </Grid>
        </Grid>
      )}

      {userInfo?.preferredLanguages &&
        userInfo?.preferredLanguages?.length > 0 && (
          <Grid item container xs={12} spacing={2} alignItems={"center"}>
            <Grid item>
              <Typography>{"Languages: "}</Typography>
            </Grid>
            <Grid item>
              <ChipGroup
                array={userInfo?.preferredLanguages}
                color={"primary"}
              />
            </Grid>
          </Grid>
        )}

      <Grid item xs={12}>
        <Grid item xs={12}>
          {userInfo?.ownedProjects && (
            <Typography variant="h6">{"Owned Projects"}</Typography>
          )}
        </Grid>
        <Grid
          container
          spacing={4}
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
        >
          {userInfo?.ownedProjects?.length &&
            userInfo?.ownedProjects?.map((item, index) => {
              return (
                <Grid key={index} item xs={4}>
                  <ProjectDetail project={item} feature={item.featured} />
                </Grid>
              );
            })}
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={12}>
          {userInfo?.collaboratedProjects && (
            <Typography variant="h6">
              {"Projects that the user has collaborated in"}
            </Typography>
          )}
        </Grid>
        <Grid
          container
          spacing={4}
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
        >
          {userInfo?.collaboratedProjects?.length &&
            userInfo?.collaboratedProjects?.map((item, index) => {
              return (
                <Grid key={index} item xs={4}>
                  <ProjectDetail project={item} feature={item.featured} />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default withSnackbar(Profile);
