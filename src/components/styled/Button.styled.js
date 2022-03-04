import styled from "styled-components"
import { Link } from "react-router-dom"

export const AppButton = styled.button`
border-radius: 0.8rem;
border: 2px solid #273817;
border-color: ${({ bcolor }) => bcolor} ;
box-shadow: 0 4px;
align-items: center;
text-align: center;
background-color: ${({ bg }) => bg || '#fff'};
color: ${({ color }) => color || '#273817'};
font-size:${({ fs }) => fs || "0.9rem"};
font-weight: 700;
padding: ${({ p }) => p || "0.8rem 1.5em"};
margin: ${({ m }) => m || "0.3rem"};

&:active {
    box-shadow: 0 1px #273817;
    transform: translateY(3px)
}
`

export const LinkButton = styled(Link)`
border-radius: 0.8rem;
border: 2px solid #273817;
box-shadow: 0 4px #273817;
align-items: center;
text-align: center;
background-color: ${({ bg }) => bg || '#fff'};
color: ${({ color }) => color || '#273817'};
font-size: 0.7rem;
font-weight: 700;
padding: ${({ p }) => p || "0.8rem 1.5em"};
margin: ${({ m }) => m || "0.3rem"};
text-decoration: none;
display: inline-block;

&:active {
    box-shadow: 0 1px #273817;
    transform: translateY(3px)
}
`