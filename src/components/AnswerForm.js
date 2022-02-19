import { AppButton } from '../css/Button.styled';
import { FormStyles, BodyTextarea, MarkdownPreviewArea } from "../css/Form.styled";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useContext, useRef } from "react";
// import UserContext from "./UserContext";
import axios from "axios";
// import { useNavigate } from 'react-router-dom';

const AnswerForm = ({ questionId, getAnswers, answersData, setAnswersData }) => {

    const currentUserId = localStorage.getItem("user")
    const [answer, setAnswer] = useState('')

    // const [warningMessage, setWarningMessage] = useState('')
    // const { navigate } = useNavigate()

    const postAnswer = async (currUser) => {
        let data = await axios.post(`http://localhost:4200/answers/${questionId}/${currUser}`, {
            response: answer,
        })
        setAnswer('')
        getAnswers()
        console.log('%c Post Res:', 'background: #403; color: #fff', data.data)
    }


    const handlePost = (e) => {
        e.preventDefault()
        if (currentUserId) {
            postAnswer(currentUserId)
        } else {
            alert("please login or register")
        }
        setAnswer('')
        console.log('%c answer:', 'background: #555; color: #fff', answer)
    }

    return (
        < div >
            {/* {warningMessage} */}
            <FormStyles onSubmit={handlePost}>
                <BodyTextarea
                    rows={12}
                    id='response'
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder='You can use markedown here and preview below: ``` code ```, **bold**, *italic*, >quote' />
                <MarkdownPreviewArea>
                    <ReactMarkdown children={answer} remarkPlugins={[remarkGfm]} />
                </MarkdownPreviewArea>
                <AppButton type='submit' bg="hsla(90, 52%, 58%, 80%)">Post Your Answer</AppButton>

            </FormStyles>
        </div>
    )
}


export default AnswerForm