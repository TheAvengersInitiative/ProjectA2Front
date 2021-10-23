import React, { useEffect, useState } from "react";

import {
  Grid,
  Button,
  Typography,
  Box,
  Chip,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
} from "@mui/material";
import SubmitDialog from "./SubmitDialog";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import {
  putCommentDiscussionWithToken,
  putCommentEditDiscussionWithToken,
} from "../utils/Projects";
import { withSnackbar } from "./SnackBarHOC";

const DiscussionContainer = styled.div`
  padding-top: 30px;
  border-top-width: 1px;
  border-top-color: lightgrey;
  border-top-style: solid;
  margin-top: 100px;
  padding-bottom: 30px;
`;

const TextLink = styled.p`
  color: dodgerblue;
  cursor: pointer;
  &:hover {
    color: royalblue;
  }
  width: min-content;
`;

const CommentContainer = styled(Grid)`
  padding-left: 50px;
`;

const CardComment = styled(Card)`
  margin: 10px 0;
`;

const DateText = styled.p`
  font-size: 13px;
  margin-top: 15px;
  margin-bottom: 0px;
  color: lightgrey;
`;

const AuthorText = styled(DateText)`
  color: coral;
`;

const OptionsComment = styled.div`
  display: flex;
  flex-direction: row;
  p {
    margin-right: 20px;
    margin-bottom: 0;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  p {
    margin-right: 10px;
  }
`;

function DiscussionsList(props) {
  const { discussions, fetchProject, showMessage, user } = props;
  const { isUserLoggedIn } = useAuth();

  const [open, setOpen] = useState(false);
  const [modalAddComment, setModalAddComment] = useState(false);
  const [discussionId, setDiscussionId] = useState("");
  const [defaultText, setDefaultText] = useState("");
  const [hideActivated, setHideActivated] = useState("outlined");
  const [highlightActivated, setHighlightActivated] = useState("outlined");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onHide = () => {
    if (hideActivated === "outlined") {
      setHideActivated("contained");
      setHighlightActivated("outlined");
    } else {
      setHideActivated("outlined");
      setHighlightActivated("contained");
    }
  };

  const onHighlight = () => {
    if (highlightActivated === "outlined") {
      setHideActivated("outlined");
      setHighlightActivated("contained");
    } else {
      setHideActivated("contained");
      setHighlightActivated("outlined");
    }
  };

  const openModal = (id, discussion, text) => {
    setDiscussionId(id);
    discussion && setDefaultText(text);
    setModalAddComment(!modalAddComment);
  };

  return (
    <>
      <DiscussionContainer>
        <Grid
          justifyContent="space-between"
          container
          direction="row"
          alignItems="center"
        >
          <Typography>Discussions ({discussions?.length})</Typography>
          <Button variant="outlined" disableElevation onClick={handleClickOpen}>
            Start a discussion
          </Button>
        </Grid>
        <Grid item xs={12}>
          {discussions ? (
            discussions.map((discussion, index) => (
              <>
                <Card
                  variant="outlined"
                  key={index}
                  style={{ margin: "20px 0" }}
                >
                  <CardHeader title={discussion.title} />
                  <CardContent>
                    <Box ml={1}>
                      <Grid container direction="row">
                        <Grid>
                          <Typography>Tags: </Typography>
                        </Grid>
                        <Grid item>
                          <Grid container direction="row">
                            {discussion.forumTags.map((item, index) => (
                              <Box ml={1} key={index}>
                                <Chip
                                  variant="filled"
                                  color="secondary"
                                  size="small"
                                  label={item.name}
                                />
                              </Box>
                            ))}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid>
                        <Typography>Body: {discussion.body} </Typography>
                      </Grid>
                      <Typography>
                        User: {discussion.project.owner.nickname}
                      </Typography>
                      {isUserLoggedIn() && (
                        <Grid>
                          <TextLink onClick={() => openModal(discussion.id)}>
                            Comment
                          </TextLink>
                        </Grid>
                      )}
                    </Box>
                  </CardContent>
                </Card>
                <CommentContainer>
                  {discussion?.comments.map((item, index) => (
                    <CardComment variant="outlined" key={index}>
                      <CardContent>
                        <Grid>
                          <Stack direction={"row"}>
                            <Stack>
                              <Grid>{item.comment}</Grid>
                              <DetailsContainer direction="row">
                                <DateText>
                                  {`${new Date(item.date).getDate()}/${new Date(
                                    item.date
                                  ).getMonth()}/${new Date(
                                    item.date
                                  ).getFullYear()}`}
                                </DateText>
                                <DateText>-</DateText>
                                <AuthorText>{item.user.nickname}</AuthorText>
                              </DetailsContainer>
                              {user && user?.id === item.user.id && (
                                <OptionsComment>
                                  <TextLink
                                    onClick={() =>
                                      openModal(item.id, true, item.comment)
                                    }
                                  ></TextLink>
                                </OptionsComment>
                              )}
                            </Stack>

                            <Stack direction={"column"} spacing={1}>
                              <Button
                                variant={hideActivated}
                                disableElevation
                                onClick={onHide}
                              >
                                Hide
                              </Button>
                              <Button
                                variant={highlightActivated}
                                disableElevation
                                onClick={onHighlight}
                              >
                                Highlight
                              </Button>
                            </Stack>
                          </Stack>
                        </Grid>
                      </CardContent>
                    </CardComment>
                  ))}
                </CommentContainer>
              </>
            ))
          ) : (
            <Typography>There are no discussions</Typography>
          )}
        </Grid>
        <SubmitDialog
          open={open}
          handleClose={handleClose}
          fetchProject={fetchProject}
        />
      </DiscussionContainer>
      {modalAddComment && (
        <AddComment
          setModalReview={setModalAddComment}
          fetchProject={fetchProject}
          id={discussionId}
          showMessage={showMessage}
          isUserLoggedIn={isUserLoggedIn}
          defaultText={defaultText}
          setDefaultText={setDefaultText}
        />
      )}
    </>
  );
}

const AddComment = (props) => {
  const {
    setModalReview,
    fetchProject,
    showMessage,
    isUserLoggedIn,
    id,
    defaultText,
    setDefaultText,
  } = props;

  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setText(defaultText ?? "");
  }, [defaultText]);

  const addComment = async () => {
    if (text && text.trim().length < 500 && text.trim().length > 0) {
      setError(false);
      try {
        const body = {
          comment: text,
        };
        if (defaultText) {
          await putCommentEditDiscussionWithToken(body, id, isUserLoggedIn());
        } else {
          await putCommentDiscussionWithToken(body, id, isUserLoggedIn());
        }
        showMessage("success", "Review added!");
        setDefaultText("");
        fetchProject();
        setModalReview(false);
      } catch (e) {
        showMessage("error", "Oops... Something went wrong!");
      }
    } else {
      setError(true);
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
        <DialogTitle id="alert-dialog-title">{`${
          defaultText ? "Edit" : "Add"
        } comment `}</DialogTitle>
        <DialogContent>
          <Grid container direction="column" alignItems="center">
            <Grid item minWidth={530}>
              <Box mt={2} mb={1}>
                <TextField
                  fullWidth={true}
                  id="outlined-multiline-static"
                  error={error}
                  multiline
                  rows={6}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  defaultValue="Default Value"
                  inputProps={{ maxLength: 500 }}
                  placeholder="Write your comment..."
                  helperText="Max 500 words"
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogContent>
          <Grid container justifyContent="space-between">
            <Button
              onClick={() => (setModalReview(false), setDefaultText(""))}
              color="error"
            >
              Cancel
            </Button>
            <Button onClick={() => addComment()} autoFocus>
              {defaultText ? "Edit" : "Add"}
            </Button>
          </Grid>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default withSnackbar(DiscussionsList);
