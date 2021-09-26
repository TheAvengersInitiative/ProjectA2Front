import React from "react";
import {
  Grid,
  Link,
  Chip,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Star } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const ExpandMore = styled((props) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardMediaModify = styled(CardMedia)`
  height: 80px;
`;

export default function ProjectDetail({ project, feature = false }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 345 }}
      style={feature ? { borderColor: "#ffba08" } : {}}
    >
      {feature && (
        <Box style={{ backgroundColor: "#ffba08" }} p={0.5}>
          <Grid container alignItems="center" direction="row">
            <Star style={{ height: "15px" }} />
            <Typography style={{ marginLeft: "2px" }}>Feature</Typography>
          </Grid>
        </Box>
      )}
      <CardMediaModify image="https://cdn.slidemodel.com/wp-content/uploads/13081-01-gradient-designs-powerpoint-backgrounds-16x9-5.jpg" />
      <CardHeader
        title={project.title}
        subheader={"Owner: " + project.owner.nickname}
      />
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
                label={tag.name}
                style={{
                  marginRight: "10px",
                  color: `${feature ? "#ffba08" : "#1976D2"}`,
                  borderColor: `${feature ? "#ffba08" : "#1976D2"}`,
                }}
              />
            ))}
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing>
        <Typography variant="subtitle2" color="textSecondary">
          Show more
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>{project.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
