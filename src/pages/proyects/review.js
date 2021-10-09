import React, { useEffect, useState } from "react";
import { getProjectById } from "../../utils/Projects";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton
} from "@mui/material";
import {Assignment} from "@mui/icons-material";

const Review = (props) => {
  const { show = true, showReviewOfUser } = props;
  const [data, setData] = useState();
  const [modalReview, setModalReview] = useState(false)

  const fetchData = async () => {
    try {
      const response = getProjectById("");
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {show && (
        <Grid container direction="column">
            {
                data.collaborator.map((item,index) => <CollaboratorItem key={ index } data={ item } showReview={showReviewOfUser}/>)
            }
        </Grid>
      )}
        {
            modalReview && <Dialog
                open={open}
                onClose={()=>setModalReview(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setModalReview(false)}>Disagree</Button>
                    <Button onClick={()=>setModalReview(false)} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        }
    </>
  );
};

const CollaboratorItem = (props) => {
    const { data, showReview } = props;
    return(
        <Grid item collaborator direction='row' justifyContent="space-between">
            <Grid item>
             {data.nickname}
            </Grid>
            <Grid item>
                <IconButton aria-label="delete" size="small" onClick={() => showReview(data.id)}>
                    <Assignment fontSize="small" />
                </IconButton>
            </Grid>
        </Grid>
    )
};

export default Review;
