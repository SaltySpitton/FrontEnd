import { styled } from "@mui/system"
import { TextField, Container, Typography, Grid, IconButton, Box } from "@mui/material"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { AppButton } from "../css/Button.styled";
import { useState, useContext, useEffect } from "react";
import Axios from "axios";
import UserContext from './UserContext'


const ProfileInput = styled(TextField)({
    '& label.Mui-focused': {
        color: 'secondary.dark',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'secondary.main',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'secondary',
            border: '2px solid',
        },
        '&:hover fieldset': {
            borderColor: 'secondary',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'secondary',
        },
    },
});


const PhotoInput = styled('input')({
    display: 'none',
});

//need state for name, about, github, linkedin, twitter, avatar


const ProfileForm = () => {
    const { user, profile, setProfile, } = useContext(UserContext)
    const [displayName, setDisplayName] = useState()
    const [about, setAbout] = useState()
    const [github, setGithub] = useState()
    const [linkedin, setLinkedin] = useState()
    const [twitter, setTwitter] = useState()


    const getUserProfile = () => {
        console.log(user)
        Axios({
            method: "GET",
            withCredentials: true,
            url: `http://localhost:4200/userdata/${user.id}`,
        }).then((res) => {
            // setDisplayName(res.data.name)
            setAbout(res.data[0].about)
            // setGithub(res.data.github || "")
            // setLinkedin(res.data.linkedin || "")
            // setTwitter(res.data.twitter || "")
            setProfile(res.data)
            console.log(about)
        });

    }
    // useEffect(() => {
    //     getUserProfile()
    // }, [])

    const handleProfileEdit = () => {
        getUserProfile()
        // user id will be user.id
        // post id will 
        // let profile = await axios.put()
    }

    return (
        <Container>
            <Typography variant='h4' component='h2' my={2} style={{
                fontWeight: '900', color: "secondary"
            }}>User Profile</Typography>

            <Grid container mb={4}>
                <Grid item xs={12} sm={8} >
                    <ProfileInput
                        label="Name"
                        id="name"
                        fullWidth
                        placeholder={displayName}
                        value={displayName}
                        onChangeCapture={(e) => setDisplayName(e.target.value)}
                        margin="normal"
                    />
                    <ProfileInput
                        label="About"
                        id="about"
                        fullWidth
                        multiline
                        value={about}
                        onChangeCapture={(e) => setAbout(e.target.value)}
                        maxRows={5}
                        margin="normal"
                    />
                    <Box sx={{ display: "flex", alignItems: "center", padding: "1rem 0" }}>
                        <Typography>Add a profile photo</Typography>
                        <label htmlFor="avatar">
                            <PhotoInput
                                accept="image/*"
                                id="avatar"
                                type="file" />
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <AddAPhotoIcon />
                            </IconButton>
                        </label>
                    </Box>
                    <ProfileInput
                        label="Github"
                        id="github"
                        fullWidth
                        value={github}
                        onChangeCapture={(e) => setGithub(e.target.value)}
                        margin="normal"
                    />
                    <ProfileInput
                        label="Linkedin"
                        id="linkedin"
                        fullWidth
                        value={linkedin}
                        onChangeCapture={(e) => setLinkedin(e.target.value)}
                        margin="normal"
                    />
                    <ProfileInput
                        label="Twitter"
                        id="twitter"
                        fullWidth
                        value={twitter}
                        onChangeCapture={(e) => setTwitter(e.target.value)}
                        margin="normal"
                    />
                    <AppButton onClick={handleProfileEdit} bg="hsla(90, 52%, 58%, 80%)">Edit Profile</AppButton>

                </Grid>
            </Grid>

        </Container>
    )
}

export default ProfileForm