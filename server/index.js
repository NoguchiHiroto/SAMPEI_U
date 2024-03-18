const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./firebase/index');

// app.use(bodyParser.urlencoded({ extended: true }))
// JSONリクエストのサイズ制限を変更
app.use(bodyParser.json({ limit: '100mb' }));

// URLエンコードされたリクエストのサイズ制限を変更
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

const createBodyObj = (body) => {
  const bodyObj = {};
  body.forEach(elm => {
    bodyObj[elm[0]] = elm[1];
  })
  return bodyObj;
}
app.get('/api/getComments', (req, res, next) => {
  api.getComments().then((data) => {
    res.json(data);
  });
});

app.get('/api/getComments', (req, res, next) => {
  api.getComments().then((data) => {
    res.json(data);
  });
});



app.post('/api/setProfileImg', (req, res, next) => {
  console.log('BODY');
  const body = createBodyObj(req.body._parts);
  api.setProfileImg(body).then(() => {
    res.json({result: 'OK'});
  });
});

app.get('/api/getProfileImgs', (req, res, next) => {
  api.getProfileImgs().then((data) => {
    res.json(data);
  })
});

app.post('/api/setComment', (req, res, next) => {
  const body = createBodyObj(req.body._parts);
  console.log('---post---');
  console.log(body);
  console.log('---end----');
  api.addComment(body).then(() => {
    res.json({result: 'Done'});
  });
});

const server = app.listen(8000, () => {
  console.log('Node.js is listening to PORT:' + server.address().port);
});