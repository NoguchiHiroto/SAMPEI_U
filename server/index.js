const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const api = require('./firebase/index');

// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
// static built-in middleware
// app.use(express.static('public'))

// body-parser
const createBodyObj = (body) => {
  const bodyObj = {};
  body.forEach(elm => {
    bodyObj[elm[0]] = elm[1];
  })
  return bodyObj;
}
app.get('/api/getData', (req, res, next) => {
    addData.addData().then(() => {
      addData.getData().then((data) => {
      res.json(data);
    });
  })
})

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