import styled from 'styled-components'

export const FormStyles = styled.form`
margin: 1rem;
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
background-color: hsla(90, 52%, 58%, 20%);
border-radius: 0.5rem;
margin: 0.5rem 0;

a {
    color: #408000;
    font-weight: 600;
}

pre {
    background: #f4f4f4;
    border: 1px solid #ddd;
    border-left: 3px solid #72b035;
    color: rgb(75, 87, 74);
    page-break-inside: avoid;
    font-family: monospace;
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 1.6em;
    max-width: 100%;
    overflow: auto;
    padding: 1em 1.5em;
    display: block;
    word-wrap: break-word;
}


code {
    background: #f4f4f4;
    color: rgb(53, 58, 53);;
    font-family: monospace;
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 1.6em;
    word-wrap: break-word;
    padding: 5px;
}

p {
    margin-bottom: 0.5rem;
    color: #001300;
}
h1 {
    color: rgb(75, 87, 74);
    font-size: 1.3rem;
}
h2 {
    color: rgb(75, 87, 74);
    font-size: 1.1rem;
}
h3 {
    color: rgb(75, 87, 74);
    font-size: 0.9rem;
}

blockquote {
    color: rgb(75, 87, 74);
    background: rgba(185, 214, 182, 0.3);
    margin-bottom: 10px;
    border-left: 3px solid #72b035;
}

a

`
