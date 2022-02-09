import logoWhite from '../images/logo-white.svg'
import styled from "styled-components"
import { FooterStyles } from '../css/Footer.styled'


const FooterLogo = styled.img`
height: 2.5rem;
opacity: 0.5;
display: block;
`

export default function Footer() {
    return (
        <FooterStyles>

            <div>
                <FooterLogo src={logoWhite} alt="Stack Dev Logo" />
                <ul>
                    <li>Questions</li>
                    <li>Jobs</li>
                    <li>User Directory</li>
                    <li>Open Source</li>
                </ul>
            </div>

            <div>
                <h4>Resources</h4>
                <ul>
                    <li><a href="https://developer.mozilla.org/en-US/" target="_blank">MDN</a></li>
                    <li><a href="https://www.w3schools.com/" target="_blank">W3 Schools</a></li>
                    <li><a href="https://medium.com/" target="_blank">Medium</a></li>
                    <li><a href="https://thehackernews.com/" target="_blank">Hacker News</a></li>
                </ul>
            </div>

            <div>
                <h4>Creators</h4>
                <ul>
                    <li><a href="http://www.andrewurquhart.com" target="_blank">Andrew</a></li>
                    <li>Ali</li>
                    <li><a href="http://dlongo.dev/" target="_blank">Daniele</a></li>
                    <li>Sylvie</li>
                </ul>
            </div>
        </FooterStyles>
    )
}
