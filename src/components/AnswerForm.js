import { AppButton } from '../css/Button.styled';
import { FormStyles, BodyTextarea, MarkdownPreviewArea } from "../css/Form.styled";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useContext, useRef } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import WarningModal from './WarningModal'
import { useNavigate } from 'react-router-dom';

const AnswerForm = ({ questionId, getAnswers, answersData, setAnswersData }) => {
    const navigate = useNavigate()
    const { user, errorMessenger } = useContext(UserContext)
    const currentUserId = localStorage.getItem("user")
    const [answer, setAnswer] = useState('')
    const [open, setOpen] = useState(false)

    // const [warningMessage, setWarningMessage] = useState('')
    // const { navigate } = useNavigate()

    //  adding from Sylvie :
    // const getAnswer = async (currUser) => {
    //     let data = await axios.post(`http://localhost:4200/answers/${questionId}/${currUser}`, {
    //         response: answer,
    //     })
    //     console.log('%c Post Res:', 'background: #403; color: #fff', data.data)
    //     setAnswer('')
    // }




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
        if (currentUserId &&  answer.length > 0) {
            postAnswer(currentUserId)
            navigate(`/questions/${questionId}`)
        }
        if(!currentUserId){
            errorMessenger("You must Login to Ask a Question, login or Signup here")
            setOpen(true)
        }
        setAnswer('')
        console.log('%c answer:', 'background: #555; color: #fff', answer)
    }

    return (
        < div >
            <WarningModal 
                open={open}
                setOpen={setOpen}
                title={"Login or Register"}
                error={"To Answer a Question, you must Login or Register"}
            />
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