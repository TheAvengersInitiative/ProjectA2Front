import {withSnackbar} from "./SnackBarHOC";
import {Grid, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import React from "react";
import {List} from "@mui/icons-material";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';

const ApplicantList =(props)=>{

    const { showMessage, applicants } = props;
    console.log(showMessage);

    return(

        <Grid
            container
            spacing={4}
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
        >
            <List>
            {applicants.length > 0 &&
            applicants.map((item, index) => {
                return (
                    <ListItem disablePadding key={index}>
                        <ListItemButton>
                            <ListItemText primary={`${item}`} />
                            <ListItemIcon>
                                <CancelIcon />
                            </ListItemIcon>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                );
            })}
            </List>
        </Grid>
    );
}
export default withSnackbar(ApplicantList);