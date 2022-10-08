const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const commentsByPostId = {};

app
  .route('/posts/:id/comments')
  .post((req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
  })
  .get((req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
  });

app.listen(4001, () => {
  console.log(`Listening Comments at: 4001`);
});
