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

const CollaboratorName = styled(Typography)`
  font-weight: 500;
`

const ProjectDetails = (props) => {
    const { showMessage } = props;
    const [data] = useState({ loading: true, joined: false });
    const [details,setDetails] = useState({})
    const {id} = useParams();

    const fetchProject = async () =>{
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

    useEffect(() =>{

    },[details])

  return (
    <Container>
      <Box mt={10} mb={5}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">{details.title}</Typography>
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
            {details.description}
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
                  {(details?.tags && details?.tags.length > 0) && details?.tags.map((item, index) => (
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
                  {(details?.languages && details?.languages.length > 0) && details?.languages.map((item, index) => (
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
                  {(details?.links && details?.links.length > 0) && details?.links.map((item, index) => (
                    <Box ml={1} key={index}>
                        <Link href={item} >{item}</Link>
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
          <Typography sx={{ mt: 4, mb: 1 }} component="div">
            Collaborators(15)
          </Typography>
          <List dense={true}>
            {(details?.applicants && details?.applicants.length > 0) && details?.applicants.map((item,index) => (
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default withSnackbar(ProjectDetails);
