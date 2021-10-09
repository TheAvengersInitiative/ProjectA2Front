import {
    Box,
    Container,
    Grid, LinearProgress,
    Typography,
} from "@mui/material";
import React, {useEffect, useState} from "react";

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { withSnackbar } from "../../components/SnackBarHOC";
import ApplicantList from "../../components/ApplicantList";

import {getApplicants} from "../../utils/Projects";
import {useParams} from "react-router-dom";

const ManageProject = (props) => {

    const [applicants, setApplicants] = useState();


    const { showMessage } = props;
    const [loading, setLoading] = useState(true);

    let { id } = useParams();
    console.log(id);
    async function fetchApplicants() {

        try {
            const response = await getApplicants(id);
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

    if (loading) return <LinearProgress />;






    const LabTabs = () =>{
        const [value, setValue] = React.useState('1');

        const handleChange = (event, newValue) => {
            setValue(newValue);
        };

        return (
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Apllicants" value="1" />
                            <Tab label="Discussions" value="2" />
                            <Tab label="Collaborators" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"><ApplicantList applicants={applicants}/></TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
            </Box>
        );
    }


    return (
        <Container>
            <Box marginTop={6}>
                <Grid container justifyContent="center">
                    <Grid container item xs={12} justifyContent="center" spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4">{`Manage `}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <LabTabs/>
                        </Grid>


                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default withSnackbar(ManageProject);