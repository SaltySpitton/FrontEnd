import logoWhite from '../../images/logo-white.svg'
import styled from "styled-components"
import { FooterStyles } from '../styled/Footer.styled'
// import { Box } from '@mui/system';
import { Container, Grid, Typography } from '@mui/material';


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
                            <li>Questions</li>
                            <li>Jobs</li>
                            <li>User Directory</li>
                            <li>Open Source</li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="https://developer.mozilla.org/en-US/" target="_blank">MDN</a></li>
                            <li><a href="https://www.w3schools.com/" target="_blank">W3 Schools</a></li>
                            <li><a href="https://medium.com/" target="_blank">Medium</a></li>
                            <li><a href="https://thehackernews.com/" target="_blank">Hacker News</a></li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <h4>Creators</h4>
                        <ul>
                            <li><a href="http://www.andrewurquhart.com" target="_blank">Andrew</a></li>
                            <li>Ali</li>
                            <li><a href="http://dlongo.dev/" target="_blank">Daniele</a></li>
                            <li>Sylvie</li>
                        </ul>
                    </Grid>
                </Grid>
            </Container>
        </FooterStyles>
    )
}
