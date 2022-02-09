import React from 'react'
import styled from "styled-components"
import { Button } from '../css/Button.styled'
import logo from '../images/logo.svg'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';


const Nav = styled.nav`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 1.5rem;
background-color: hsla(90, 52%, 58%, 20%);
padding: 0.5rem;
gap: 1rem;
`

const Logo = styled.img`
height: 2rem;
margin: 0 1rem;
`

export default function Navigation() {
    return (
        <Nav>
            <Logo src={logo} alt="" />
            <TextField
                fullWidth
                id="outlined-basic"
                label="Search"
                variant="outlined"
                InputProps={{
                    style: {
                        backgroundColor: "#fff",
                        border: "1px solid #292929",
                        borderRadius: '0.5rem',
                    },
                    endAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />

            <Button>Login</Button>
            <Button bg="hsla(90, 52%, 58%, 80%)">SignUp</Button>

        </Nav>
    )
}
