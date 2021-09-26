import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, { useState } from "react";
import ItemOptions from "./ItemOptions";
import DeleteDialog from "./DeleteDialog";

const ProjectItem = (props) => {
  const { item } = props;
  const [anchorEl, setAnchorEl] = useState(false);
  const [open, setOpen] = useState(false);

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid item>
        <Card variant="outlined">
          <CardContent>
            <Grid justifyContent="space-between" container direction="row">
              <Box mb={2} fontSize={22} fontWeight={500} color="textPrimary">
                Project {item?.title}
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
                <ItemOptions
                  id={item?.id}
                  handleClose={handleClose}
                  anchorEl={anchorEl}
                  setDelete={setOpen}
                />
              </Box>
            </Grid>

            <Grid container spacing={2} direction="row">
              {item?.tags &&
                item?.tags.map((item, index) => (
                  <Grid item key={index}>
                    <Chip label={item} color="primary" />
                  </Grid>
                ))}
            </Grid>
            <Box my={2}>
              <Typography color="textSecondary">
                {shrinkText(item?.description)}
              </Typography>
            </Box>
            <Grid container direction="column" alignItems="left">
              <Grid item>
                <Typography>Link: </Typography>
              </Grid>
              <Grid container direction="row">
                {item?.links &&
                  item.links.map((item, index) => (
                    <Grid item key={index}>
                      <Box ml={0.5}>
                        <Link>{item}</Link>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <DeleteDialog open={open} setOpen={setOpen} id={item?.id} />
    </>
  );
};
export default ProjectItem;
