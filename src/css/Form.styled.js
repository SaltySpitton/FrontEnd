import styled from 'styled-components'

export const FormStyles = styled.form`
margin: 3rem 1rem;
width: 90%;

label {
    font-weight: 700;
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
}
p {
    color: #8D8F8A;
    font-weight: 200;
    font-size: 0.8rem;
    margin: 0.5rem;
}
input::placeholder, textarea::placeholder {
   font-family: inherit;
   color: #bbb;
}
input[type=text]{
    font-family: inherit;
    color: #292929;
    font-weight: 500;
}
fieldset {
    border: none;
    margin-bottom: 2rem;
}
`

export const FormInput = styled.input`
background-color: #fff;
border: 2px solid #292929;
border-radius: 0.5rem;
display: block;
width: ${({ width }) => width || '100%'};
padding: 0.8rem;
`

export const BodyTextarea = styled.textarea`
background-color: #fff;
border: 2px solid #292929;
border-radius: 0.5rem;
display: block;
width: 100%;
padding: 0.8rem;
`

export const MarkdownPreviewArea = styled.div`
padding: 1.3rem;
background-color: hsla(90, 52%, 58%, 10%);
border-radius: 0.5rem;
margin: 1rem 0;
`

