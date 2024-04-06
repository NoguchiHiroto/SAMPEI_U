/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const api = require('../firebase/index');

// app.use(bodyParser.urlencoded({ extended: true }))
// JSONリクエストのサイズ制限を変更
app.use(express.json());
app.use(cors());
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

// app.get('/api/getComments', (req, res, next) => {
//   api.getComments().then((data) => {
//     res.json(data);
//   });
// });



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