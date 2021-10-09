import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Avatar,
  Box,
  Chip,
  Grid,
  Link,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { List } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { withSnackbar } from "../../components/SnackBarHOC";
import { useParams } from "react-router-dom";
import {
  getProjectById,
  getUserInfoById,
  putJoinToProject,
} from "../../utils/Projects";
import { useAuth } from "../../contexts/AuthContext";

const Container = styled(Grid)`
  min-height: available;
  height: 100%;
  width: 100%;
`;

const CollaboratorName = styled(Typography)`
  font-weight: 500;
`;

const ProjectButton = styled(LoadingButton)`
  cursor: pointer;
  font-weight: 600;
`;

const ProjectDetails = (props) => {
  const { isUserLoggedIn } = useAuth();
  const [userLogged, setUserLogged] = useState();
  const { showMessage } = props;
  const [details, setDetails] = useState();
  const { id } = useParams();
  const [user, setUser] = useState();
  const [buttonType, setButtonType] = useState({ type: "join", loading: true });

  useEffect(() => {
    setUserLogged(isUserLoggedIn());
  }, []);

  useEffect(() => {
    fetchProject();
  }, [userLogged, id]);

  const fetchProject = async () => {
    try {
      const response = await getProjectById(id);
      if (userLogged) {
        const profile = await getUserInfoById();
        setUser(profile.data);
      }
      setDetails(response.data);
    } catch (e) {
      console.log(e);
      showMessage("error", "Oops... Something went wrong!");
    }
  };

  useEffect(() => {
    if (user && details && userLogged) {
      const UserIsCollaborator = details?.collaborators.find(
        (item) => item.id === user.id
      );
      const UserIsApplicant = details?.applicants.find(
        (item) => item.id === user.id
      );

      details?.owner?.id === user?.id
        ? setButtonType({ type: "owner", loading: false })
        : UserIsCollaborator
        ? setButtonType({ type: "collaborator", loading: false })
        : UserIsApplicant
        ? setButtonType({ type: "applicant", loading: false })
        : setButtonType({ type: "join", loading: false });
    }
  }, [details, user]);

  const handleJoinToProject = async () => {
    try {
      setButtonType({ ...buttonType, loading: true });
      await putJoinToProject(id);
      showMessage("success", "Request sent successfully!");
      setButtonType({ type: "applicant", loading: false });
    } catch (e) {
      setButtonType({ ...buttonType, loading: false });
      showMessage("error", "Oops... Something went wrong");
    }
  };

  const getTypeOfButton = (type) => {
    switch (type) {
      case "join":
        return (
          <ProjectButton
            variant="contained"
            loading={buttonType.loading}
            disableElevation
            onClick={handleJoinToProject}
          >
            Join as collaborator
          </ProjectButton>
        );
      case "collaborator":
        return (
          <ProjectButton
            variant="outlined"
            loading={buttonType.loading}
            disabled
            disableElevation
          >
            You are a collaborator
          </ProjectButton>
        );
      case "applicant":
        return (
          <ProjectButton
            variant="outlined"
            loading={buttonType.loading}
            disabled
            disableElevation
          >
            Request sent
          </ProjectButton>
        );
      case "owner":
        return (
          <ProjectButton
            variant="outlined"
            loading={buttonType.loading}
            disabled
            disableElevation
          >
            You are owner
          </ProjectButton>
        );
    }
  };

  return (
    <>
      {isUserLoggedIn() && (
        <Container>
          <Box mt={10} mb={5}>
            <Grid container direction="row" justifyContent="space-between">
              <Grid item>
                <Typography variant="h4">{details?.title}</Typography>
              </Grid>
              <Grid item>
                {details &&
                  userLogged &&
                  user &&
                  getTypeOfButton(buttonType.type)}
              </Grid>
            </Grid>
          </Box>

          <Grid>
            <Typography>{details?.description}</Typography>
          </Grid>
          <Grid container direction="row">
            <Grid item xs={6}>
              <Box mt={4}>
                <Grid container direction="row">
                  <Grid>
                    <Typography>Tags: </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row">
                      {details?.tags &&
                        details?.tags.length > 0 &&
                        details?.tags.map((item, index) => (
                          <Box ml={1} key={index}>
                            <Chip color="primary" label={item.name} />
                          </Box>
                        ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Box mt={4}>
                <Grid container direction="row">
                  <Grid>
                    <Typography>Languages: </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row">
                      {details?.languages &&
                        details?.languages.length > 0 &&
                        details?.languages.map((item, index) => (
                          <Box ml={1} key={index}>
                            <Chip color="primary" label={item.name} />
                          </Box>
                        ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Box mt={4}>
                <Grid container direction="row">
                  <Grid>
                    <Typography>Links: </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row">
                      {details?.links &&
                        details?.links.length > 0 &&
                        details?.links.map((item, index) => (
                          <Box ml={1} key={index}>
                            <Link href={item}>{item}</Link>
                          </Box>
                        ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Box mt={4}>
                <Typography>Owner: {details?.owner?.nickname}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              {details?.collaborators?.length > 0 && (
                <>
                  <Typography sx={{ mt: 4, mb: 1 }} component="div">
                    Collaborators({details?.collaborators.length})
                  </Typography>
                  <List dense={true}>
                    {details?.collaborators &&
                      details?.collaborators.length > 0 &&
                      details?.collaborators.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemAvatar>
                            <Avatar sx={{ width: 24, height: 24 }}>
                              <AccountCircle />
                            </Avatar>
                          </ListItemAvatar>
                          <CollaboratorName>{item.nickname}</CollaboratorName>
                        </ListItem>
                      ))}
                  </List>
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default withSnackbar(ProjectDetails);
