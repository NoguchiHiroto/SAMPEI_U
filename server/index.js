const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const api = require('./firebase/index');
const getRawBody = require('raw-body');

// app.use(bodyParser.urlencoded({ extended: true }))
// JSONリクエストのサイズ制限を変更
app.use(bodyParser.json({ limit: '100mb' }));

// URLエンコードされたリクエストのサイズ制限を変更
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
// static built-in middleware
// app.use(express.static('public'))
// app.use((req, res, next) => {
//   // console.log('body', req.body)
//   // console.log('headers', req.headers);
//   getRawBody(req, {
//     length: req.headers['content-length'],
//     limit: '100mb',
//   }, (err, string) => {
//     if (err) return next(err);
//     req.text = string;
//     console.log('ERR')
//     next();

//   });
//   next();
//   // console.log('getRawBody!!!')
// });

// body-parser
const createBodyObj = (body) => {
  console.log('create', body)
  const bodyObj = {};
  body.forEach(elm => {
    bodyObj[elm[0]] = elm[1];
  })
  return bodyObj;
}
app.get('/api/getData', (req, res, next) => {
  api.getData().then((data) => {
    // console.log(data);
    res.json(data);
  });
});
app.post('/api/setProfileImg', (req, res, next) => {
  console.log('BODY');
  const body = createBodyObj(req.body._parts);
  api.setProfileImg(body)
});

app.post('/api/setData', (req, res, next) => {
  const body = createBodyObj(req.body._parts);
  console.log('---post()---');
  console.log(body);
  console.log('---end---')
  api.addData(body).then(() => {
    res.json({result: 'Done'});
  })
})

const server = app.listen(8000, () => {
  console.log('Node.js is listening to PORT:' + server.address().port);

})