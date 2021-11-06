import {Box, Container, Grid, IconButton, Typography} from "@mui/material";
import React, { useEffect } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { getNotfs, seenNotif} from "../../utils/Projects";
import { withSnackbar } from "../../components/SnackBarHOC";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { format } from "date-fns";
import TableBody from "@mui/material/TableBody";

const ManageProject = (props) => {
    const { showMessage } = props;
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState({});

    console.log(showMessage);

    async function fetchNotificationData() {
        try {
            const response = await getNotfs();
            console.log(response)
            console.log(response.data)
            setData(response.data);
            console.log(data)
            setLoading(false);
        } catch (e) {
            showMessage("error", "Opss... Something went wrong");
        }
    }

    const checkSeen = async (id) => {
        await seenNotif(id)
        fetchNotificationData();
    }

    function getRows() {
        let array = [];
        console.log(data)
        data?.forEach((
                (d) =>
                    !d?.seen && array.push({
                        id: d.id,
                        date: d.date,
                        title: d?.discussion?.title,
                        body: d?.discussion?.body,
                    })
            )
        );
        return array.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });

    }
    function getSeenRows() {
        let array = [];
        console.log(data)
        data?.forEach((
                (d) =>
                    d.seen && array.push({
                        id: d.id,
                        date: d.date,
                        title: d?.discussion?.title,
                        body: d?.discussion?.body,
                    })
            )
        );
        return array.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });

    }

    useEffect(() => {
        fetchNotificationData();
    }, []);

    const LabTabs = () => {
        const [value, setValue] = React.useState("1");

        const handleChange = (event, newValue) => {
            setValue(newValue);
        };

        return (
            <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label={`Unread (${getRows().length})`} value="1" />
                            <Tab label={`Read (${getSeenRows().length})`} value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Body</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {getRows()?.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell>{format(new Date(row.date), "PP")}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.title}
                                            </TableCell>
                                            <TableCell>{row.body}</TableCell>
                                            <TableCell>{
                                                <IconButton onClick={()=>checkSeen(row?.id)}>
                                                    <DoneAllIcon/>
                                                </IconButton>

                                            }</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel value="3">

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Body</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {getSeenRows()?.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell>{format(new Date(row.date), "PP")}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.title}
                                            </TableCell>
                                            <TableCell>{row.body}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>


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
                                <Typography variant="h4">{`Notifications (${data.length})`}</Typography>
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
