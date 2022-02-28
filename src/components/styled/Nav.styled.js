import styled from "styled-components"


export const Nav = styled.nav`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 1.5rem;
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

export const LightBg = styled.div`
background-color: hsla(90, 52%, 58%, 20%);
width: 100%;
`