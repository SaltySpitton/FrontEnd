import { InputLabel, Autocomplete, TextField } from '@mui/material';
import { AppButton } from '../css/Button.styled';
import { FormStyles, FormInput, BodyTextarea, MarkdownPreviewArea } from '../css/Form.styled';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useState } from 'react';



const QuestionForm = () => {
    const [questionTitle, setQuestionTitle] = useState('')
    const [questionBody, setQuestionBody] = useState('')

    return (
        <div>
            <h1>Ask a public question</h1>
            <FormStyles action="">
                <fieldset>
                    <label htmlFor="title">Title</label>
                    <p>Be specific and imagine you're asking a question to another person</p>
                    <FormInput
                        type="text"
                        value={questionTitle}
                        onChange={(e) => setQuestionTitle(e.target.value)}
                        id="title"
                        placeholder='e.g. Is there an R function for finding the index of an element in a vector?' />
                </fieldset>
                <fieldset>
                    <label htmlFor="title">Body</label>
                    <p>Include all the information someone would need to answer your question</p>
                    <BodyTextarea
                        rows={12}
                        id='title'
                        value={questionBody}
                        onChange={(e) => setQuestionBody(e.target.value)}
                        placeholder='You can use markedown here and preview below: ``` code ```, **bold**, *italic*, >quote' />
                    <MarkdownPreviewArea>
                        <ReactMarkdown children={questionBody} remarkPlugins={[remarkGfm]} />
                    </MarkdownPreviewArea>
                </fieldset>
                <fieldset>
                    <InputLabel htmlFor='tags'>Select Tags</InputLabel>
                    <Autocomplete
                        multiple
                        id="tags"
                        options={tags}
                        getOptionLabel={(option) => option.tag}
                        defaultValue={[tags[1]]}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                id='tags'
                                placeholder="Add up to 5 tags to describe what your question is about"
                            />
                        )}
                    />
                </fieldset>
                <AppButton bg="hsla(90, 52%, 58%, 80%)">Post Your Question</AppButton>



                {/* <InputLabel htmlFor='title'>Question Title</InputLabel>
                <TextField
                    id='title'
                    variant='outlined'
                    color='secondary'
                    margin='normal'
                    fullWidth
                    helperText='Be specific and imagine you’re asking a question to another person'
                />

                <InputLabel htmlFor='tags'>Select Tags</InputLabel>
                <Autocomplete
                    multiple
                    id="tags"
                    options={tags}
                    getOptionLabel={(option) => option.tag}
                    defaultValue={[tags[1]]}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            id='tags'
                            placeholder="Add up to 5 tags to describe what your question is about"
                        />
                    )}
                /> */}

            </FormStyles>
        </div>
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const tags = [
    { tag: 'Javascript' },
    { tag: 'HTML' },
    { tag: 'CSS' },
    { tag: 'ReactJS' },
    { tag: 'MongoDB' },
    { tag: 'Express' },
    { tag: 'NodeJS' },
    { tag: 'Other' },
];

export default QuestionForm