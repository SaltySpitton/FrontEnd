import styled from "styled-components"

export const FooterStyles = styled.footer`
background-color: #292929;
color:#8D8F8A;
display: flex;
justify-content: space-between;
padding: 1rem 4rem 2rem 2rem;
text-align: center;

h4 {
    font-size: 1.6rem;
    margin: 0.5rem 0 1rem 0;
    padding: 0;
}

ul {
    list-style: none;
    padding-left: 0;
}
li{
    margin-bottom: 1rem;
}

a{
color: #8D8F8A;
text-decoration: none;

&:hover {
    text-decoration: underline;
}
}
`
