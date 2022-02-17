import { styled } from "@mui/system"
import { TextField } from "@mui/material"

export const CustomInput = styled(TextField)({
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