import React from "react";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import 
{ Grid, Link, Chip, Card, CardHeader, CardMedia, 
  CardContent, CardActions, Collapse, IconButton, 
  Typography, makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function ProjectDetail({ project }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://i.pinimg.com/564x/12/6d/6a/126d6a772d8c617371646cea80851342.jpg"
      />
      <CardHeader title={project.title} subheader={"Owner: " + project.owner} />
      <CardContent>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            {project.links.map((link, index) => (
              <Typography key={index}>
                <Link href={link}>{link}</Link>
              </Typography>
            ))}
          </Grid>
          <Grid item xs={12}>
            {project.tags.map((tag, index) => (
              <Chip
                key={index}
                variant="outlined"
                color="primary"
                label={tag}
                style={{ marginRight: "10px" }}
              />
            ))}
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing>
        <Typography variant="subtitle2" color="textSecondary">
          Show more
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>{project.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
