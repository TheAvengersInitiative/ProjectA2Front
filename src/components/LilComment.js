import React, {useEffect, useState} from "react";
import {Button, Card, CardContent, Grid, Stack} from "@mui/material";
import styled from "styled-components";
import {

    hideComment, highlightComment
} from "../utils/Projects";

const TextLink = styled.p`
  color: dodgerblue;
  cursor: pointer;
  &:hover {
    color: royalblue;
  }
  width: min-content;
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
const LilComment = (props) => {
    const { key, item, user,openModal, fetchProject, projectOwner } = props;
    const [hideActivated, setHideActivated] = useState("outlined");
    const [highlightActivated, setHighlightActivated] = useState("outlined");



    useEffect(() => {
        if(item.hidden){
            setHideActivated("contained")
        }
        if(item.highlighted){
            setHighlightActivated("contained")
        }
    }, []);

    const onHide = async () =>{
        try{if (hideActivated === "outlined") {
            setHideActivated("contained");

        } else {
            setHideActivated("outlined");

        }
            await hideComment(item.id);
        fetchProject()
        } catch (e) {
            console.log(e);
        }

    };

    const onHighlight = async () =>{
        try{
            if (highlightActivated === "outlined") {
                setHighlightActivated("contained");
                await highlightComment(item.id);
            } else {
                setHighlightActivated("outlined");
                await highlightComment(item.id);
            }
            fetchProject()
        }catch (e) {
            console.log(e);
        }
    };

    return (
            <CardComment variant="outlined" key={key}>
                <CardContent>
                    <Grid>
                        <Stack direction={"row"} justifyContent='space-between'>
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
                                        >Edit</TextLink>
                                    </OptionsComment>
                                )}
                            </Stack>

                            {user && user?.id === projectOwner?.id &&(<Stack direction={"column"} spacing={1}>
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
                            </Stack>)}
                        </Stack>
                    </Grid>
                </CardContent>
            </CardComment>

    );
};

export default LilComment;