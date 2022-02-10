
Current Question Routes : -> All question routes starting route is ‘/questions ---------------
GET -  /    : Get all questions
POST - /:userId    : Post New question to the user’s profile : *** Once we have login  passport/sessions will be updated to just posting to ‘/ ’
GET -  /:questionId      : View a specific question
DELETE -  /:questionId      : Delete Question
PUT -    /:questionId       :Edit Question (edited) 

date:{
       type:String, 
        required: true
    },

    tags: {
        type: String,
        enum: [
          'html',
          'css',
          'java',
          'javascript',
          'node.js',
          'mongoose',
          'mongodb',
          'react',
          'jquery',
          "jsx",
          'python',
          'json',
          'django',
          'ejs',
          'other',
        ],
        require: true,
    },
    title: {
        type: String, 
        required: true
    }, 
    body: {
        type: String, 
        required: true
    }, 
    votes: {
        type: Number, 
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }

    [
    {
        "id": "ques1", 
        "date" : "11/05/2021",
        "tags" : ["python"], 
        "title" : "Traverse a list in reverse order in Python",
        "body":"So I can start from collection[len(collection)-1] and end in collection[0]. I also want to be able to access the loop index.",
        "votes" : 906,
        "user" : "1"
    },
    {
        "id": "ques2", 
        "date" : "10/20/2021",
        "tags" : ["javascript"], 
        "title" : "Creating multiline strings in JavaScript",
        "body":"I have A Sentence broken into 4 seperate lines in Ruby. I want to convert this code into JavaScript. How can I have multiline strings in JS??",
        "votes" : 3101,
        "user" : "2"
    },
    {
        "id": "ques3", 
        "date" : "06/15/2020",
        "tags" : ["node", "mongoose"], 
        "title"  : "How to paginate with Mongoose in Node.js?",
        "body":"I am writing a webapp with Node.js and mongoose. How can I paginate the results I get from a .find() call? I would like a functionality comparable to 'LIMIT 50,100' in SQL.",
        "votes" : 287,
        "userId" : "3"
    },
    {
        "id": "ques4", 
        "date" : "12/21/2021",
        "tags" : ["jsx", "react"], 
        "title"  : "Loop inside React JSX",
        "body" : "I'm trying to do something like the following in React JSX (where ObjectRow is a separate component): <tbody> for (var i=0; i < numrows; i++) {<ObjectRow/>} </tbody>  I realize and understand why this isn't valid JSX, since JSX maps to function calls. However, coming from template land and being new to JSX, I am unsure how I would achieve the above (adding a component multiple times).",
        "votes" : 73,
        "userId" : "1"
    }
]