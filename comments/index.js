const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const app = express();
const axios = require('axios')

app.use(bodyParser.json())


const comments = {};

const commentsByPostId = {};
app.use(cors())


app.get('/posts/:id/comments',(req,res)=>{
    console.log('working');
    res.send(commentsByPostId[req.params.id] || [])
})


app.post('/posts/:id/comments',async(req,res)=>{
    console.log('working');
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body
    
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id: commentId,content})
    
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events',{
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    })

    res.status(201).send(comments);
})

app.listen(4001,()=>{
    console.log('Listening on 8000');
})