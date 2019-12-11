const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
const https = require('https');
const request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  // request('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77i0orwyc6pvp2&redirect_uri=https://www.hunterz.io/about&scope=r_liteprofile', { json: true }, (err, res, body) => {
  // if (err) { return console.log(err); }
  // console.log(body);
  // console.log(res);
// });

  res.send({ express: 'this will bring you to linkedin' });
});

app.get('/api/getlinkedin', (req, response) => {
  request('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77i0orwyc6pvp2&redirect_uri=https://www.hunterz.io/about&scope=r_liteprofile', { json: true }, (err, res, body) => {
    if (err) { return console.log('ERROR'); }
    response.send({ body: body, res: res });
  })
  // console.log('in express');
})

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
