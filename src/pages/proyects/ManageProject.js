import { Box, Container, Grid, Typography } from "@mui/material";
import React, {useContext, useEffect} from "react";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ApplicantList from "./ApplicantList";

import { useHistory, useParams } from "react-router-dom";
import Review from "./review";
import {getProjectById, getUserInfoByIdWithToken} from "../../utils/Projects";
import { withSnackbar } from "../../components/SnackBarHOC";
import {AuthContext} from "../../contexts/AuthContext";

const ManageProject = (props) => {
  const { showMessage } = props;
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const { token } = useContext(AuthContext);

  let history = useHistory();

  let { id } = useParams();
  console.log(id);
  console.log(showMessage);

  async function fetchProjectData() {
    try {
      const response = await getProjectById(id);
      const user = await getUserInfoByIdWithToken(token);

      if (user.data.id !== response.data.owner.id) {
        history.push("/");
      }
      setData(response.data);
      setLoading(false);
    } catch (e) {
      showMessage("error", "Opss... Something went wrong");
    }
  }

  useEffect(()=>{

  },[token])

  useEffect(() => {
    fetchProjectData();
  }, []);

  const LabTabs = ({ data }) => {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Applicants" value="1" />
              <Tab label="Discussions" value="2" />
              <Tab label="Collaborators" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ApplicantList projID={id} updateList={fetchProjectData} />
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">
            <Review data={data} projectId={id} />
          </TabPanel>
        </TabContext>
      </Box>
    );
  };

  return (
    <Container>
      <Box marginTop={6}>
        {!loading && (
          <Grid container justifyContent="center">
            <Grid container item xs={12} justifyContent="center" spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4">{`Manage `}</Typography>
              </Grid>
              <Grid item xs={12}>
                <LabTabs data={data} />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default withSnackbar(ManageProject);
