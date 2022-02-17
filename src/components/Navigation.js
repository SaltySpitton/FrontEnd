import React, { useEffect } from 'react'
import styled from "styled-components"
import { Link } from 'react-router-dom';
import { LinkButton } from '../css/Button.styled'
import logo from '../images/logo.svg'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SummaryQuestion from './SummaryQuestion'
import { useState, useContext } from 'react';
import UserContext from "./UserContext";
import { Nav, LightBg } from '../css/Nav.styled';
import { Container } from '@mui/material';


const ImgTag = styled.img`
height: 2rem;
margin: 0 0.5rem;
`
//test user -------
const userInfo = {
    id: "prof1",
    displayName: "spyBoi",
    avatar: "https://www.gravatar.com/avatar/0555bd0deb416a320a0069abef08078a?s=256&d=identicon&r=PG&f=1",
}

export default function Navigation() {
    const { user, logout, getUser, questions, setQuestions, getAllQuestions} = useContext(UserContext)
    useEffect(() => {
        getUser()
    }, [])

    const [searchString, setSearchString] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (e) => {
        setSearchString(e.target.value)
        console.log(searchString)
    }

    const handleSearch = (e) => {
        console.log(searchString)
        console.log('clicked to search')
    }

    return (
        <LightBg>
            <Container>
                <Nav>
                <Link to="/questions" onClick={()=> {
                    getAllQuestions()
                }} component={<SummaryQuestion />}>
                    <ImgTag src={logo} alt="" />
                </Link>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
value={searchString}
                onChange={handleChange}
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
                    <Link to="/dashboard">Ask Question</Link>
                    <Link to="/tags">Tags</Link>
                    <div className="nav-container">
                        {user ?
                            (<>
                                <ImgTag src={userInfo.avatar} />
                                <div>
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        {user.username}
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
                                        <MenuItem onClick={logout}>Logout</MenuItem>
                                    </Menu>
                                </div>
                            </>)
                            :
                            <>
                                <LinkButton to="/login">Login</LinkButton>
                                <LinkButton to="/" bg="hsla(90, 52%, 58%, 80%)">SignUp</LinkButton>
                            </>
                        }
                    </div>
                </Nav>
            </Container>
        </LightBg>

    )
}
