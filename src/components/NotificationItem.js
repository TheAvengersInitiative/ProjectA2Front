import React, { useEffect, useState } from "react";
import { Grid, MenuItem } from "@mui/material";
import styled from "styled-components";
import {
  NEW_COMMENT_CREATOR_MESSAGE,
  NEW_DISCUSSION_MESSAGE,
  NEW_POSTULATE_MESSAGE,
  NEW_REVIEW_MESSAGE,
} from "../utils/const";
import { useHistory } from "react-router-dom";

const MenuItemSeen = styled(MenuItem)`
  background-color: ${(props) => props.seen && "ghostwhite"};
  color: ${(props) => props.seen && "darkgray !important"};
  padding: 5px 0;
`;

const NotificationText = styled.p`
  font-size: 18px;
  margin: 0px;
  max-width: 300px;
  white-space: normal;
`;

const DateText = styled.p`
  font-size: 14px !important;
  color: lightgrey;
  margin: 0;
`;

const NotificationContainer = styled(Grid)`
  padding: 10px 20px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: whitesmoke;
`;

export const NotificationItem = (props) => {
  const { item, setNotification } = props;
  const [message, setMessage] = useState("");
  const [route, setRoute] = useState("");
  const history = useHistory();

  /*
    Alta de discusion
    Alta de comentario en discusiones de la cual soy creador
    Alta de comentario en discusiones de cuyo proyecto soy owner
    Alta de review de usuario (que le llega a la persona que recibe la review)
    Postulacion de un nuevo colaborador
*/

  const manageBehavior = () => {
    switch (item.type) {
      case "DISCUSSION":
        sendNewDiscussion();
        break;
      case "COMMENT":
        sendNewCommentCreator();
        break;
      case "REVIEW":
        sendNewReview();
        break;
      case "APPLICANT":
        sendNewCandidate();
        break;
    }
  };

  const sendNewDiscussion = () => {
    setMessage(
      `${item.user.nickname} ${NEW_DISCUSSION_MESSAGE} ${item.project.title}!`
    );
    const routeBuilder = `/project/${item.project.id}?discussion=${item.discussion.id}`;
    setRoute(routeBuilder);
  };

  const sendNewCommentCreator = () => {
    setMessage(
      `${item.user.nickname} ${NEW_COMMENT_CREATOR_MESSAGE} ${item.project.title}`
    );
    const routeBuilder = `/project/${item.project.id}?comment=${item.comment.id}`;
    setRoute(routeBuilder);
  };

  const sendNewReview = () => {
    setMessage(`${NEW_REVIEW_MESSAGE} ${item.project.title}!`);
    const routeBuilder = `/user/${item.userToNotify.id}?review=${item.project.title}`;
    setRoute(routeBuilder);
  };

  const sendNewCandidate = () => {
    setMessage(
      `${item.user.nickname} ${NEW_POSTULATE_MESSAGE} ${item.project.title}!`
    );
    const routeBuilder = `/project/${item.project.id}/manage?user=${item.user.id}`;
    setRoute(routeBuilder);
  };

  const handleOpen = () => {
    history.replace(route);
    setNotification(null);
  };

  useEffect(() => {
    manageBehavior();
  }, []);

  return (
    <MenuItemSeen seen={item.seen} onClick={handleOpen}>
      <NotificationContainer container direction="column">
        <Grid item container direction="row">
          <Grid item>
            <DateText>{new Date(item.date).toDateString()}</DateText>
          </Grid>
          <Grid item>{item.seen && <DateText>{` - Seen`}</DateText>}</Grid>
        </Grid>
        <Grid>
          <NotificationText>{message}</NotificationText>
        </Grid>
      </NotificationContainer>
    </MenuItemSeen>
  );
};
