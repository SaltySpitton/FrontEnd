import logoWhite from '../../images/logo-white.svg'
import styled from "styled-components"
import { FooterStyles } from '../styled/Footer.styled'
import { Link } from 'react-router-dom'
import { Container, Grid } from '@mui/material';


const FooterLogo = styled.img`
height: 2.5rem;
opacity: 0.5;
display: inline-block;
`

export default function Footer() {
    return (
        <FooterStyles>
            <Container>
                <Grid container p={4} style={{ alignItems: "center", justifyContent: "center" }}>
                    <Grid item xs={12} md={4}>
                        <FooterLogo src={logoWhite} alt="Stack Dev Logo" />
                        <ul>
                            <li><Link to='/questions'>Questions</Link></li>
                            <li><a href='https://stackoverflow.com/jobs' target="_blank" rel="noreferrer">Jobs</a></li>
                            <li><a href='https://stackoverflow.com/users' target="_blank" rel="noreferrer">User Directory</a></li>
                            <li><a href='https://github.com/SaltySpitton' target="_blank" rel="noreferrer">Open Source</a></li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="https://developer.mozilla.org/en-US/" target="_blank" rel="noreferrer">MDN</a></li>
                            <li><a href="https://www.w3schools.com/" target="_blank" rel="noreferrer">W3 Schools</a></li>
                            <li><a href="https://medium.com/" target="_blank" rel="noreferrer">Medium</a></li>
                            <li><a href="https://thehackernews.com/" target="_blank" rel="noreferrer">Hacker News</a></li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <h4>Creators</h4>
                        <ul>
                            <li><a href="http://www.andrewurquhart.com" target="_blank" rel="noreferrer">Andrew</a></li>
                            <li><a href="https://github.com/AlhakeemALI" target="_blank" rel="noreferrer">Ali</a></li>
                            <li><a href="http://dlongo.dev/" target="_blank" rel="noreferrer">Daniele</a></li>
                            <li><a href="https://github.com/izztwiggy" target="_blank" rel="noreferrer">Sylvie</a></li>
                        </ul>
                    </Grid>
                </Grid>
            </Container>
        </FooterStyles>
    )
}
