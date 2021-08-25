//import { useHistory } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid, IconButton,
  Link,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, {useState} from "react";
import ItemOptions from "./ItemOptions";

const ProjectItem = (props) => {
  const { item } = props;
  const [anchorEl, setAnchorEl] = useState(false);
  //const history = useHistory();

  const shrinkText = (text) => {
    let nText = text;
    if (nText.length > 340) {
      if (nText.substring(340) !== "") {
        nText = nText.substring(0, 340);
        return `${nText.substring(0, nText.lastIndexOf(" "))}...`;
      }
    }
    return nText;
  };

/*  const redirectItem = () => {
    history.push(`/my-projects/${item.id}`);
  };*/

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item >
      <Card variant="outlined">
          <CardContent>
            <Grid justifyContent="space-between" container direction="row">
              <Box mb={2} fontSize={22} fontWeight={500} color="textPrimary">
                Project {item.title}
              </Box>
              <Box>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <ItemOptions id={item.id} handleClose={handleClose} anchorEl={anchorEl} />
              </Box>
            </Grid>

            <Grid container spacing={2} direction="row">
              {item?.tags.map((item, index) => (
                  <Grid item key={index}>
                    <Chip label={item} color="primary" />
                  </Grid>
              ))}
            </Grid>
            <Box my={2}>
              <Typography color="textSecondary">
                {shrinkText(item.description)}
              </Typography>
            </Box>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <Typography>Link: </Typography>
              </Grid>
              <Grid item>
                <Box ml={0.5}>
                  <Link>link.com.ar</Link>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
      </Card>
    </Grid>
  );
};
export default ProjectItem;
