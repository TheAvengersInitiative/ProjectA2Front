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
  Link,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Stack,
  CardActions,
} from "@mui/material";
import SubmitDialog from "./SubmitDialog";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import {
  putCommentDiscussionWithToken,
  putCommentEditDiscussionWithToken,
} from "../utils/Projects";
import { withSnackbar } from "./SnackBarHOC";
import LilComment from "./LilComment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModifyDiscussion from "./ModifyDiscussion";
import DeleteDiscussion from "./DeleteDiscussion";

const DiscussionContainer = styled.div`
  padding-top: 30px;
  border-top-width: 1px;
  border-top-color: lightgrey;
  border-top-style: solid;
  margin-top: 100px;
  padding-bottom: 30px;
`;

const CommentContainer = styled(Grid)`
  padding-left: 50px;
`;

function DiscussionsList(props) {
  const { discussions, fetchProject, showMessage, user, owner } = props;
  const { isUserLoggedIn } = useAuth();

  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [modalAddComment, setModalAddComment] = useState(false);
  const [discussionId, setDiscussionId] = useState("");
  const [defaultText, setDefaultText] = useState("");

  const isOwner = () => user?.id === owner?.id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenUpdate = (discussion) => {
    setOpenUpdate(discussion);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleClickOpenDelete = (id) => {
    setOpenDelete(id);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
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
            {isUserLoggedIn() && (
                <Button
                    variant="outlined"
                    disableElevation
                    onClick={handleClickOpen}
                >
                  Start a discussion
                </Button>
            )}
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
                          <Stack spacing={2}>
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
                              User:
                              <Link href={`/user/${discussion.project.owner.id}`}>
                                {discussion.owner.nickname}
                              </Link>
                            </Typography>
                          </Stack>
                        </CardContent>
                        <CardActions>
                          <Stack direction="row" spacing={2}>
                            {isUserLoggedIn() && (
                                <Grid>
                                  <Button
                                      size="small"
                                      color="primary"
                                      onClick={() => openModal(discussion.id)}
                                  >
                                    Comment
                                  </Button>
                                </Grid>
                            )}
                            {isOwner() && (
                                <>
                                  <IconButton
                                      aria-label="delete"
                                      color="primary"
                                      size="small"
                                      onClick={() => handleClickOpenDelete(discussion.id)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>

                                  <IconButton
                                      aria-label="edit"
                                      color="primary"
                                      size="small"
                                      onClick={() => handleClickOpenUpdate(discussion)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </>
                            )}
                          </Stack>
                        </CardActions>
                      </Card>
                      <CommentContainer>
                        {discussion?.comments
                            .map(
                                (item, index) =>
                                    ((user && user?.id === owner?.id) || !item?.hidden) && (
                                        <LilComment
                                            key={index}
                                            item={item}
                                            user={user}
                                            openModal={openModal}
                                            fetchProject={fetchProject}
                                            projectOwner={owner}
                                            isUserLoggedIn={isUserLoggedIn}
                                        />
                                    )
                            )
                            .sort((value) => {
                              return value?.props?.item?.highlighted ? -1 : 1; // `true` values first
                            })}
                      </CommentContainer>
                    </>
                ))
            ) : (
                <Typography>There are no discussions</Typography>
            )}
          </Grid>
          <ModifyDiscussion
              fetchProject={fetchProject}
              open={openUpdate}
              handleClose={handleCloseUpdate}
          />
          <DeleteDiscussion
              fetchProject={fetchProject}
              open={openDelete}
              handleClose={handleCloseDelete}
          />
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
        showMessage(
            "error",
            e.response.data || "Oops... Something went wrong!"
        );
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
