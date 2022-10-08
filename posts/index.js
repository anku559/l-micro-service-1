const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const posts = {};

app
  .route('/posts')
  .post((req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
      id,
      title,
    };

    res.status(201).send(posts[id]);
  })
  .get((req, res) => {
    res.send(posts);
  });

app.listen(4000, () => {
  console.log(`Listening Blog at: 4000`);
});
