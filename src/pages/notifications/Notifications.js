import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import React, {useContext, useEffect} from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { getNotfs, seenNotif } from "../../utils/Projects";
import { withSnackbar } from "../../components/SnackBarHOC";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { format } from "date-fns";
import TableBody from "@mui/material/TableBody";
import {AuthContext} from "../../contexts/AuthContext";
import {
  NEW_COMMENT_CREATOR_MESSAGE,
  NEW_DISCUSSION_MESSAGE,
  NEW_POSTULATE_MESSAGE,
  NEW_REVIEW_MESSAGE,
} from "../../utils/const";
import { useHistory } from "react-router-dom";

const ManageProject = (props) => {
  const { showMessage } = props;
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({});
  const { fetchNotification } = useContext(AuthContext);
  const history = useHistory();

  console.log(showMessage);

  async function fetchNotificationData() {
    try {
      const response = await getNotfs();
      console.log(response);
      console.log(response.data);
      setData(response.data);
      console.log(data);
      setLoading(false);
    } catch (e) {
      showMessage("error", "Opss... Something went wrong");
    }
  }

  const checkSeen = async (id) => {
    await seenNotif(id);
    fetchNotificationData();
    fetchNotification();
  };

  //3 columnas, sacar la de body

  function getRows() {
    let array = [];
    console.log(data);
    data?.forEach(
      (d) =>
        !d?.seen &&
        array.push({
          id: d.id,
          date: d.date,
          title: manageBehavior(d).message,
          url: manageBehavior(d).route,
        })
    );
    return array.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  }

  const manageBehavior = (item) => {
    switch (item.type) {
      case "DISCUSSION":
        return sendNewDiscussion(item);

      case "COMMENT":
        return sendNewCommentCreator(item);

      case "REVIEW":
        return sendNewReview(item);

      case "APPLICANT":
        return sendNewCandidate(item);
    }
  };

  const sendNewDiscussion = (item) => {
    const msg = `${item.user.nickname} ${NEW_DISCUSSION_MESSAGE} ${item.project.title}!`;
    const routeBuilder = `/project/${item.project.id}?discussion=${item.discussion.id}`;
    return { message: msg, route: routeBuilder };
  };

  const sendNewCommentCreator = (item) => {
    const msg = `${item.user.nickname} ${NEW_COMMENT_CREATOR_MESSAGE} ${item.project.title}`;
    const routeBuilder = `/project/${item.project.id}?comment=${item.comment.id}`;
    return { message: msg, route: routeBuilder };
  };

  const sendNewReview = (item) => {
    const msg = `${NEW_REVIEW_MESSAGE} ${item.project.title}!`;
    const routeBuilder = `/user/${item.userToNotify.id}?review=${item.project.title}`;
    return { message: msg, route: routeBuilder };
  };

  const sendNewCandidate = (item) => {
    const msg = `${item.user.nickname} ${NEW_POSTULATE_MESSAGE} ${item.project.title}!`;
    const routeBuilder = `/project/${item.project.id}/manage?user=${item.user.id}`;
    return { message: msg, route: routeBuilder };
  };

  function getSeenRows() {
    let array = [];
    console.log(data);
    data?.forEach(
      (d) =>
        d.seen &&
        array.push({
          id: d.id,
          date: d.date,
          title: manageBehavior(d).message,
          url: manageBehavior(d).route,
        })
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

    const handleOpen = (route) => {
      history.replace(route);
      console.log(route);
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
                      <TableCell
                        component="th"
                        scope="row"
                        /*onClick={() => handleOpen(row.url)}*/
                      >
                        <Link
                          href={`${row.url}`}
                          color={"inherit"}
                          underline={"none"}
                        >
                          {row.title}
                        </Link>
                      </TableCell>

                      <TableCell>
                        {
                          <IconButton onClick={() => checkSeen(row?.id)}>
                            <DoneAllIcon />
                          </IconButton>
                        }
                      </TableCell>
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getSeenRows()?.map((row) => (
                    <TableRow
                      onClick={() => handleOpen(row.url)}
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {console.log(row)}

                      <TableCell>{format(new Date(row.date), "PP")}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
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
