import React from 'react'
import styled from "styled-components"
import { Link } from 'react-router-dom';
import { AppButton } from '../css/Button.styled'
import logo from '../images/logo.svg'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';


const Nav = styled.nav`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 1.5rem;
background-color: hsla(90, 52%, 58%, 20%);
padding: 0.5rem 1rem;
gap: 1rem;

a {
    color: #292929;
    font-weight: 700;
}

.nav-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
`

const ImgTag = styled.img`
height: 2rem;
margin: 0 0.5rem;
`
const userInfo = {
    id: "prof1",
    displayName: "spyBoi",
    avatar: "https://www.gravatar.com/avatar/0555bd0deb416a320a0069abef08078a?s=256&d=identicon&r=PG&f=1",
}

export default function Navigation() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Nav>
            <ImgTag src={logo} alt="" />
            <TextField
                fullWidth
                id="outlined-basic"
                label="Search"
                variant="outlined"
                InputProps={{
                    style: {
                        backgroundColor: "#fff",
                    },
                    endAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
            <Link to="/tags">Tags</Link>
            <div className="nav-container">
                <ImgTag src={userInfo.avatar} />
                <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        {userInfo.displayName}
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Help</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </div>
                {/* if user is not logged in */}
                {/* <AppButton>Login</AppButton>
            <AppButton bg="hsla(90, 52%, 58%, 80%)">SignUp</AppButton> */}
            </div>


        </Nav>
    )
}