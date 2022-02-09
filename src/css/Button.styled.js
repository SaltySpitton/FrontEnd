import styled from "styled-components"

export const AppButton = styled.button`
border-radius: 0.8rem;
border: 2px solid #292929;
box-shadow: 0 4px #292929;
align-items: center;
text-align: center;
background-color: ${({ bg }) => bg || '#fff'};
color: ${({ color }) => color || '#292929'};
font-size: 0.9rem;
font-weight: 700;
padding: 0.8rem 1.5em;
margin: 0.3rem;

&:active {
    box-shadow: 0 1px #292929;
    transform: translateY(3px)
}
`