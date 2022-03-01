import React, { useEffect } from 'react'
import styled from "styled-components"
import { Link } from 'react-router-dom';
import { LinkButton } from '../styled/Button.styled'
import logo from '../../images/logo.svg'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SummaryQuestion from '../Questions/SummaryQuestion'
import { useState, useContext } from 'react';
import UserContext from "../UserContext";
import { Nav, LightBg } from '../styled/Nav.styled';
import { Container, Avatar } from '@mui/material';
import { useNavigate } from "react-router-dom";

const ImgTag = styled.img`
height: 2rem;
margin: 0 0.5rem;
`
export default function Navigation() {
    const loggedInUserId = localStorage.getItem("user")
    const navigate = useNavigate()
    const {
        user,
        logout,
        getUser,
        searchTag,
        searchByTag,
        setSearchTag,
    } = useContext(UserContext)

    useEffect(() => {
        getUser()
        console.log("this is user:", user)
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
    }

    const handleSearch = (e) => {
        setSearchTag(searchString)
        searchByTag(searchTag)
        navigate('/questions')
        setSearchString("")
    }

    return (
        <LightBg>
            <Container>
                <Nav>
                    <Link to="/questions" onClick={() => {
                        setSearchTag("")
                        searchByTag()
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
                                <InputAdornment onClick={handleSearch} position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                    <Link to="/ask">Ask</Link>
                    <Link to="/tags">Tags</Link>
                    <div className="nav-container">
                        {loggedInUserId ?
                            (<>
                                <Avatar variant='rounded' src={user.avatar} />
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
                                        <MenuItem onClick={handleClose}><Link to={`/userdata/${loggedInUserId}`}>My account</Link></MenuItem>
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
