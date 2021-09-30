import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {
  Avatar,
  Box,
  Chip,
  Grid,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { List } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import {withSnackbar} from "../../components/SnackBarHOC";
import {useParams} from "react-router-dom";
import {getProjectById} from "../../utils/Projects";

const Container = styled(Grid)`
  min-height: available;
  height: 100%;
  width: 100%;
`;

const ProjectDetails = (props) => {
    const { showMessage } = props;
    const [data] = useState({ loading: true, joined: false });
    const [details,setDetails] = useState({})
    const [tags] = useState([0, 1, 2, 3, 4, 5, 6]);
    const {id} = useParams();

    const fetchProject = async () =>{
        details && console.log(details)
        try{
            const response = await getProjectById(id);
            setDetails(response.data);
        }catch ( e ){
            showMessage("error","Oops... Something went wrong!")
        }
    }

    useEffect(()=>{
        fetchProject();
    },[id])

  return (
    <Container>
      <Box mt={10} mb={5}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">Project Name</Typography>
          </Grid>
          <Grid item>
            <LoadingButton
              variant={!data.joined ? "contained" : "outlined"}
              loading={data.loading}
              disabled={data.joined}
              disableElevation
            >
              {!data.joined ? "Join as collaborator" : "Request sent"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>

      <Grid>
        <Typography>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using, making it look like readable English.
          Many desktop publishing packages and web page editors now use Lorem
          Ipsum as their default model text, and a search for will uncover many
          web sites still in their infancy. Various versions have evolved over
          the years, sometimes by accident, sometimes on purpose (injected
          humour and the like).
        </Typography>
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
                  {tags.map((item, index) => (
                    <Box ml={1} key={index}>
                      <Chip color="primary" label={item} />
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
                  {tags.map((item, index) => (
                    <Box ml={1} key={index}>
                      <Chip color="primary" label={item} />
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
                  {tags.map((item, index) => (
                    <Box ml={1} key={index}>
                      <Link href="" label={item} />
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box mt={4}>
            <Typography>Owner: CARLOS</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ mt: 4, mb: 1 }} component="div">
            Collaborators(15)
          </Typography>
          <List dense={true}>
            {tags.map((index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar sx={{ width: 24, height: 24 }}>
                    <AccountCircle />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Single-line item" />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withSnackbar(ProjectDetails);
