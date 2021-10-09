import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Assignment, ExpandMore } from "@mui/icons-material";
import styled from "styled-components";
import { AddReviewById, getReviewById } from "../../utils/Projects";
import { Rating } from "@mui/lab";
import { useParams } from "react-router-dom";

const Review = (props) => {
  const { show = true, data, projectId } = props;
  const [info] = useState(data);
  const [modalReview, setModalReview] = useState(false);
  const [modalAddReview, setModalAddReview] = useState(false);

  const [userInfo, setUserInfo] = useState();

  const openModalAndShowReviews = async (data) => {
    setModalAddReview(false);
    try {
      const response = await getReviewById(data.id, projectId);
      setUserInfo({
        review: response?.data,
        data,
      });
      setModalReview(true);
    } catch (e) {
      console.log(e);
    }
  };
  const openModalAddReview = () => {
    setModalReview(false);
    setModalAddReview(true);
  };

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <>
      {show && (
        <Grid container direction="column">
          {info?.collaborators?.map((item, index) => (
            <CollaboratorItem
              key={index}
              data={item}
              setModalReview={openModalAndShowReviews}
            />
          ))}
        </Grid>
      )}
      {modalReview && (
        <ReviewOfCollaborators
          userInfo={userInfo}
          setModalReview={setModalReview}
          openAdd={openModalAddReview}
        />
      )}
      {modalAddReview && (
        <AddNewReview setModalReview={setModalAddReview} userInfo={userInfo} />
      )}
    </>
  );
};

const GridItem = styled(Grid)`
  border-bottom-color: lightgrey;
  border-bottom-width: 1.5px;
  border-bottom-style: solid;
  padding: 15px 10px;
`;

const CollaboratorItem = (props) => {
  const { data, setModalReview } = props;
  return (
    <GridItem item container direction="row" justifyContent="space-between">
      <Grid item>{data.nickname}</Grid>
      <Grid item>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => setModalReview(data)}
        >
          <Assignment fontSize="small" />
        </IconButton>
      </Grid>
    </GridItem>
  );
};

const AddNewReview = (props) => {
  const { userInfo, setModalReview } = props;
  const [value, setValue] = useState(0);
  const [text, setText] = useState("");
  let { id } = useParams();

  const addReview = async () => {
    try {
      await AddReviewById(
        {
          collaboratorID: userInfo.data.id,
          comment: text,
          score: value,
        },
        id
      );
      setModalReview(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setModalReview(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
    >
      <Box p={1}>
        <DialogTitle id="alert-dialog-title">
          {`Qualify ${userInfo.data.nickname} work in `}
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Grid>
            <Grid item minWidth={530}>
              <Box mt={2} mb={1}>
                <Typography mb={1}>Comments (optional)</Typography>
                <TextField
                  fullWidth={true}
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  defaultValue="Default Value"
                  inputProps={{ maxLength: 500 }}
                  helperText="Max 500 words"
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="space-between">
            <Button onClick={() => setModalReview(false)} color="error">
              Cancel
            </Button>
            <Button onClick={() => addReview()} autoFocus>
              Add review
            </Button>
          </Grid>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

const AccordionItem = styled(Accordion)`
  border-width: 1.5px;
  border-color: lightgrey;
  border-style: solid;
  margin: 5px 0;
`;

const ReviewOfCollaborators = (props) => {
  const { userInfo, setModalReview, openAdd } = props;

  const ReviewItem = ({ data, key }) => {
    const [date, setDate] = useState();

    useEffect(() => {
      if (data && data.time) {
        const time = new Date(data.time);
        setDate(
          `${time.getDate()}-${time.getMonth() + 1}-${time.getFullYear()}`
        );
      }
    }, [data]);

    return (
      <Grid>
        <AccordionItem elevation={0}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`panel${key}a-content`}
            id={`panel${key}a-header`}
          >
            <Grid justifyContent="space-between" direction="row" container>
              <Typography>{date}</Typography>

              <Rating name="read-only" value={data.score} readOnly />
            </Grid>
          </AccordionSummary>
          {data?.comment.length > 0 && (
            <AccordionDetails>
              <Typography>{data.comment}</Typography>
            </AccordionDetails>
          )}
        </AccordionItem>
      </Grid>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={() => setModalReview(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
    >
      <Box p={1}>
        <DialogTitle id="alert-dialog-title">
          {`Qualification history for ${userInfo.data.nickname} in `}
        </DialogTitle>
        <DialogContent>
          <Button onClick={openAdd}>Add new review</Button>
          <Grid maxHeight={600}>
            {[
              { time: "2021-10-09T13:48:31.1886002", score: 2, comment: "" },
              { time: "2021-05-09T13:48:31.1886002", score: 5, comment: "DDDDDDDDDDDDDDDDDDDD" },
              { time: "2021-08-09T13:48:31.1886002", score: 1, comment: "SSSSSSSSSSSSSSSSSSSSSSs" },
              { time: "2021-12-09T13:48:31.1886002", score: 0, comment: "" },
            ]
              .sort()
              .map((item, index) => (
                <ReviewItem key={index} data={item} />
              ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid>
            <Button color="error" onClick={() => setModalReview(false)}>
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default Review;
