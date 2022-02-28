import { styled } from "@mui/system";
import { AppButton } from "../styled/Button.styled";
import { CustomInput } from "../styled/CustomInput";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Container, Typography, Grid, IconButton, Box } from "@mui/material";
import axios from "axios";
import UserContext from '../UserContext'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const PhotoInput = styled('input')({
    display: 'none',
});

//need state for name, about, github, linkedin, twitter, avatar


const ProfileForm = () => {
    const { getUser, isLoading, setIsLoading } = useContext(UserContext)
    const [profile, setProfile] = useState({})
    const [displayName, setDisplayName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [about, setAbout] = useState("")
    const [github, setGithub] = useState("")
    const [linkedin, setLinkedin] = useState("")
    const [twitter, setTwitter] = useState("")
    const navigate = useNavigate();

    const baseURL = `${process.env.REACT_APP_API}/userdata`

    const getUserProfile = async () => {
        setIsLoading(true)
        const userProfile = await axios.get(`${baseURL}/${localStorage.getItem("user")}`)
        setProfile(userProfile.data[0])
        setDisplayName(userProfile.data[0].name)
        setAbout(userProfile.data[0].about)
        setGithub(userProfile.data[0].github)
        setLinkedin(userProfile.data[0].github)
        setTwitter(userProfile.data[0].twitter)
        console.log(userProfile)
        setIsLoading(false)
    }

    useEffect(() => {
        getUser()
        getUserProfile()
    }, [])

    const handleProfileEdit = async (e) => {
        e.preventDefault()
        const updatedProfile = {
            name: displayName,
            about: about,
            github: github,
            linkedin: linkedin,
            twitter: twitter,
        }
        await axios.put(`${baseURL}/${profile._id}/${localStorage.getItem("user")}`, updatedProfile)
            .then(res => {
                console.log(res)
                navigate(`/userdata/${profile.user._id}`)
            }).catch(error => {
                console.log(error)
            })
    }


    return (
        <Container>
            <Typography variant='h4' component='h2' my={2} style={{
                fontWeight: '900', color: "secondary"
            }}>User Profile</Typography>
            {isLoading && <Typography variant="h2">Loading Profile ....</Typography>}
            {getUserProfile && <Grid container mb={4}>
                <Grid item xs={12} sm={8} >
                    <form onSubmit={handleProfileEdit}>
                        <CustomInput
                            label="Name"
                            id="name"
                            fullWidth
                            value={displayName}
                            onChangeCapture={(e) => setDisplayName(e.target.value)}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <CustomInput
                            label="About"
                            id="about"
                            fullWidth
                            multiline
                            value={about}
                            onChangeCapture={(e) => setAbout(e.target.value)}
                            maxRows={5}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Box sx={{ display: "flex", alignItems: "center", padding: "1rem 0" }}>
                            <Typography>Add a profile photo</Typography>
                            <label htmlFor="avatar">
                                <PhotoInput
                                    accept="image/*"
                                    id="avatar"
                                    type="file"
                                    onChangeCapture={(e) => {
                                        setAvatar(e.target.value)
                                    }}
                                />
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <AddAPhotoIcon />
                                </IconButton>
                            </label>
                        </Box>
                        <CustomInput
                            label="Github"
                            id="github"
                            fullWidth
                            value={github}
                            onChangeCapture={(e) => setGithub(e.target.value)}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <CustomInput
                            label="Linkedin"
                            id="linkedin"
                            fullWidth
                            value={linkedin}
                            onChangeCapture={(e) => setLinkedin(e.target.value)}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <CustomInput
                            label="Twitter"
                            id="twitter"
                            fullWidth
                            value={twitter}
                            onChangeCapture={(e) => setTwitter(e.target.value)}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <AppButton type="submit" bg="hsla(90, 52%, 58%, 80%)">Edit Profile</AppButton>
                    </form>

                </Grid>
            </Grid>}

        </Container>
    )
}

export default ProfileForm