
import React, {useEffect, useState} from "react";

import {Chip, Grid, LinearProgress, Typography} from "@mui/material";
import { withSnackbar } from "../../components/SnackBarHOC";
import ProjectDetail from "../../components/ProjectDetail";
import {getOtherUsersInfoById} from "../../utils/Projects";
import {useParams} from "react-router-dom";


const Profile = (props) => {
    const { showMessage } = props;
    const [userInfo, setUserinfo] = useState();
    const [loading, setLoading] = useState(true);



    let { id } = useParams();
        console.log(id);
    async function fetchUserInfo() {

        try {
            const response = await getOtherUsersInfoById(id);
            setUserinfo(response.data);

        } catch (e) {
            showMessage("error", "Opss... Something went wrong");
        }
        setLoading(false)
    }


    useEffect(() => {
        fetchUserInfo();

    }, []);

    if(loading)return <LinearProgress/>
    return (
        <Grid container item xs={12} spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4">{userInfo.nickname}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">{
                    userInfo?.biography
                }</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <Typography variant="h6">{"Tags: "}</Typography>
                    <Grid item xs={12}>
                        {userInfo?.preferredTags?.map((tag, index) => (
                            <Chip
                                key={index}
                                variant="outlined"
                                label={tag.name}
                                color="primary"
                                style={{ marginRight: "10px" }}
                            />
                        ))}
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6">{"Language: "}</Typography>
                    <Grid item xs={12}>
                        {userInfo?.preferredLanguages?.map((tag, index) => (
                            <Chip
                                key={index}
                                variant="outlined"
                                label={tag.name}
                                color="primary"
                                style={{ marginRight: "10px" }}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <Typography variant="h6">{"Owned Projects"}</Typography>
                </Grid>
                <Grid
                    container
                    spacing={4}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                >
                    {userInfo?.ownedProjects?.length > 0 &&
                    userInfo?.ownedProjects?.map((item, index) => {
                        return (
                            <Grid key={index} item xs={4}>
                                <ProjectDetail project={item} feature={item.featured} />
                            </Grid>
                        );
                    })}
                </Grid>
                <Grid item xs={12}>

                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <Typography variant="h6">{"Project that the user has collaborated in"}</Typography>
                </Grid>
                <Grid
                    container
                    spacing={4}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                >
                    {userInfo?.collaboratedProjects?.length > 0 &&
                    userInfo?.collaboratedProjects?.map((item, index) => {
                        return (
                            <Grid key={index} item xs={4}>
                                <ProjectDetail project={item} feature={item.featured} />
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>

        </Grid>
    );
}
export default withSnackbar(Profile);

