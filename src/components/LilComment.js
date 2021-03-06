import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Grid, Stack } from "@mui/material";
import styled from "styled-components";
import { hideComment, highlightComment } from "../utils/Projects";
import DeleteComment from "./DeleteComment";
import { css, keyframes } from "@mui/styled-engine";

const TextLink = styled.p`
  color: dodgerblue;
  cursor: pointer;
  &:hover {
    color: royalblue;
  }
  width: min-content;
`;

const highlightColor = keyframes`
  from {
    background-color: #d5d5d5;
  }

  to {
    background-color: white;
  }
`;

const CardComment = styled(Card)`
  margin: 10px 0;
  box-shadow: 0 0 8px 3px
    ${(props) => (props.highlight ? "rgba(42,42,42,0.13)" : "white")};
  ${(props) => {
    if (props.highlight) {
      return css`
        animation-name: ${highlightColor};
        animation-duration: 2s;
        animation-delay: 1.5s;
      `;
    }
  }}
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

const LilComment = (props) => {
  const {
    key,
    item,
    user,
    openModal,
    fetchProject,
    projectOwner,
    isUserLoggedIn,
    highlight,
  } = props;
  const [hideActivated, setHideActivated] = useState("outlined");
  const [highlightActivated, setHighlightActivated] = useState("outlined");
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    if (item.hidden) {
      setHideActivated("contained");
    }
    if (item.highlighted) {
      setHighlightActivated("contained");
    }
  }, []);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const onHide = async () => {
    try {
      await hideComment(item.id, isUserLoggedIn());
      if (hideActivated === "outlined") {
        setHideActivated("contained");
      } else {
        setHideActivated("outlined");
      }
      fetchProject();
    } catch (e) {
      console.log(e);
    }
  };

  const onHighlight = async () => {
    try {
      await highlightComment(item.id, isUserLoggedIn());
      if (highlightActivated === "outlined") {
        setHighlightActivated("contained");
      } else {
        setHighlightActivated("outlined");
      }
      fetchProject();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CardComment
      variant="outlined"
      name={item.id}
      key={key}
      highlight={highlight}
    >
      <CardContent>
        <Grid>
          <Stack direction={"row"} justifyContent="space-between">
            <Stack>
              <Grid>{item.comment}</Grid>
              <DetailsContainer direction="row">
                <DateText>
                  {`${new Date(item.date).getDate()}/${new Date(
                    item.date
                  ).getMonth()}/${new Date(item.date).getFullYear()}`}
                </DateText>
                <DateText>-</DateText>
                <AuthorText>{item.user.nickname}</AuthorText>
              </DetailsContainer>
              <Grid container direction="row">
                {((user && user?.id === item.user.id) ||
                  (user && user?.id === projectOwner?.id)) && (
                  <OptionsComment>
                    <TextLink onClick={handleClickOpenDelete}>Delete</TextLink>
                    <DeleteComment
                      open={openDelete}
                      handleClose={handleCloseDelete}
                      id={item.id}
                      fetchProject={fetchProject}
                    ></DeleteComment>
                  </OptionsComment>
                )}
                {user && user?.id === item.user.id && (
                  <OptionsComment>
                    <TextLink
                      onClick={() => openModal(item.id, true, item.comment)}
                    >
                      Edit
                    </TextLink>
                  </OptionsComment>
                )}
              </Grid>
            </Stack>

            {user && user?.id === projectOwner?.id && (
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
            )}
          </Stack>
        </Grid>
      </CardContent>
    </CardComment>
  );
};

export default LilComment;
