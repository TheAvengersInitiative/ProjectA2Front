import React, {useEffect, useState} from 'react';
import {MenuItem} from "@mui/material";
import styled from "styled-components";
import {
    NEW_COMMENT_CREATOR_MESSAGE,
    NEW_COMMENT_OWNER_MESSAGE,
    NEW_DISCUSSION_MESSAGE,
    NEW_POSTULATE_MESSAGE, NEW_REVIEW_MESSAGE
} from "../utils/const";
import {useHistory} from "react-router-dom";

const MenuItemSeen = styled(MenuItem)`
  background-color: ${(props) => props.seen && "ghostwhite"};
  color: ${(props) => props.seen && "darkgray"};
  padding: 5px 20px;
`;

export const NotificationItem = (props) => {

    const { item } = props;
    const [ message, setMessage ] = useState('');
    const [ route, setRoute ] = useState('');
    const history = useHistory();

/*
    Alta de discusion
    Alta de comentario en discusiones de la cual soy creador
    Alta de comentario en discusiones de cuyo proyecto soy owner
    Alta de review de usuario (que le llega a la persona que recibe la review)
    Postulacion de un nuevo colaborador
*/


    const manageBehavior = () => {
        switch ( item.type ) {
            case 0:
                sendNewDiscussion();
                break;
            case 1:
                sendNewCommentCreator();
                break;
            case 2:
                sendNewCommentOwner();
                break;
            case 3:
                sendNewReview();
                break;
            case 4:
                sendNewCandidate();
                break;
        }
    }

    const sendNewDiscussion = ( ) => {
        setMessage(NEW_DISCUSSION_MESSAGE);
        const routeBuilder = `project/${item.project}?discussion=${item.discussion}`;
        setRoute(routeBuilder);
    }

    const sendNewCommentCreator = ( ) => {
        setMessage(NEW_COMMENT_CREATOR_MESSAGE);
        const routeBuilder = `project/${item.project}?comment=${item.comment}`;
        setRoute(routeBuilder);
    }

    const sendNewCommentOwner = ( ) => {
        setMessage(NEW_COMMENT_OWNER_MESSAGE);
        const routeBuilder = `project/${item.project}?comment=${item.comment}`;
        setRoute(routeBuilder);
    }

    const sendNewReview = ( ) => {
        setMessage(NEW_REVIEW_MESSAGE);
        const routeBuilder = `project/${item.project}?review=${item.review}`;
        setRoute(routeBuilder);
    }

    const sendNewCandidate = ( ) => {
        setMessage(NEW_POSTULATE_MESSAGE);
        const routeBuilder = `project/${item.project}/manage?user=${item.user}`;
        setRoute(routeBuilder);
    }

    useEffect(( ) => {
        manageBehavior();
    }, [])

    return (
        <MenuItemSeen seen={item === 2} onClick={() => history.push(route)}>
            {message}
        </MenuItemSeen>
    );
}

