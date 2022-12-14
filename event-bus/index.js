const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
  const events = req.body;

  await axios.post('http://localhost:4000/events', events); // Posts
  await axios.post('http://localhost:4001/events', events); // Comments
  // axios.post('http://localhost:4002/events', events); // Query Service

  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('Events on: 4005');
});
