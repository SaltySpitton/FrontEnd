import { InputLabel, Autocomplete, TextField } from '@mui/material';
import { AppButton } from '../css/Button.styled';
import {
  FormStyles,
  FormInput,
  BodyTextarea,
  MarkdownPreviewArea} from "../css/Form.styled";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useContext } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

const QuestionForm = () => {
  const { user, getUser } = useContext(UserContext);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [addTags, setAddTags] = useState([]);

  const [warningMessage, setWarningMessage] = useState("");
  let navigate = useNavigate();

  const loginWarning = () => {
    setWarningMessage("You must Login to Ask a Question, login or Signup here");
    setTimeout(() => {
      setWarningMessage("");
    }, 3000);
  };

  const getQuestion = async (currUser) => {
    let data = await axios.post(
      `http://localhost:4200/questions/${currUser.id}`,
      {
        title: questionTitle,
        body: questionBody,
        tags: addTags,
      }
    );
    console.log(data);
    console.log(data.data);
    setQuestionTitle("");
    setQuestionBody("");
    setAddTags([]);
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (user) {
      getQuestion(user);
    } else {
      loginWarning();
      //navigate("/login", { replace: true }, -1)
      // navigate(-1)
    }
  };

  return (
    <div>
      <h1>Ask a public question {warningMessage}</h1>
      <FormStyles action="">
        <fieldset>
          <label htmlFor="title">Title</label>
          <p>
            Be specific and imagine you're asking a question to another person
          </p>
          <FormInput
            type="text"
            value={questionTitle}
            onChange={(e) => setQuestionTitle(e.target.value)}
            id="title"
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="title">Body</label>
          <p>
            Include all the information someone would need to answer your
            question
          </p>
          <BodyTextarea
            rows={12}
            id="title"
            value={questionBody}
            onChange={(e) => setQuestionBody(e.target.value)}
            placeholder="You can use markedown here and preview below: ``` code ```, **bold**, *italic*, >quote"
          />
          <MarkdownPreviewArea>
            <ReactMarkdown
              children={questionBody}
              remarkPlugins={[remarkGfm]}
            />
          </MarkdownPreviewArea>
        </fieldset>
        <fieldset>
          <InputLabel htmlFor="tags">Select Tags</InputLabel>
          <Autocomplete
            multiple
            id="tags"
            options={tags}
            getOptionLabel={(option) => option}
            // getOptionLabel={(option) => option.tag}
            // defaultValue={[tags[1]]}
            onChange={(e, value) => setAddTags(value)}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                id="tags"
                placeholder="Add up to 5 tags to describe what your question is about"
              />
            )}
          />
        </fieldset>
        <AppButton onClick={handlePost} bg="hsla(90, 52%, 58%, 80%)">
          Post Your Question
        </AppButton>
      </FormStyles>
    </div>
  );
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const tags = [
//     { tag: 'c#' },
//     { tag: 'CSS' },
//     { tag: 'JSX' },
//     { tag: 'sql' },
//     { tag: 'HTML' },
//     { tag: 'ajax' },
//     { tag: 'ruby' },
//     { tag: 'regex' },
//     { tag: 'django' },
//     { tag: 'nodeJS' },
//     { tag: 'python' },
//     { tag: 'reactJS' },
//     { tag: 'mongoDB' },
//     { tag: 'express' },
//     { tag: 'algorithms' },
//     { tag: 'components' },
//     { tag: 'javascript' },
//     { tag: 'data structures' },
//     { tag: 'react-router-v6' },
// ];
const tags = [
  "c#",
  "CSS",
  "JSX",
  "sql",
  "HTML",
  "ajax",
  "ruby",
  "regex",
  "django",
  "nodeJS",
  "python",
  "reactJS",
  "mongoDB",
  "express",
  "algorithms",
  "components",
  "javascript",
  "data structures",
  "react-router-v6",
  "other",
];
export default QuestionForm;
                   