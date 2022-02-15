import { styled } from "@mui/system"
import { TextField, Container, Typography, Grid, IconButton, Box } from "@mui/material"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { AppButton } from "../css/Button.styled";


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


const ProfileForm = () => {
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
                        margin="normal"
                    />
                    <ProfileInput
                        label="About"
                        id="about"
                        fullWidth
                        multiline
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
                        margin="normal"
                    />
                    <ProfileInput
                        label="Linkedin"
                        id="linkedin"
                        fullWidth
                        margin="normal"
                    />
                    <ProfileInput
                        label="Twitter"
                        id="twitter"
                        fullWidth
                        margin="normal"
                    />
                    <AppButton bg="hsla(90, 52%, 58%, 80%)">Edit Profile</AppButton>

                </Grid>
            </Grid>

        </Container>
    )
}

export default ProfileForm