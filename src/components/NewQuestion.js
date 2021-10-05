import React, { useState } from 'react';

import {Container, Box, Grid, Button} from "@mui/material";
import SubmitDialog from './SubmitDialog';

function NewQuestion(props){
    const {showMessage} = props;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleAdd = async () => {
        try {
          //await addTag({ name: data });
          setOpen(false);
          window.location.reload();
        } catch (e) {
          showMessage("error", "Opss... Something went wrong");
        }
    };

    return (
        <Container>
            <Box marginTop={4}>
                <Grid container item xs={12} spacing={1} alignContent="center">
                <Grid item xs={12}>
                    <Grid justifyContent="space-between" container direction="row">
                    <Button
                        variant="outlined"
                        color="black"
                        disableElevation
                        onClick={handleClickOpen}
                    >
                        Start a discusion
                    </Button>
                    </Grid>
                </Grid>
                </Grid>
            </Box>
            <SubmitDialog open={open} handleAdd={handleAdd} handleClose={handleClose} />

        </Container>
    )
}

export default NewQuestion;