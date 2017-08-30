const express = require('express'); // express 사용요청
const morgan = require('morgan'); // morgan 사용요청
const basicAuth = require('express-basic-auth') // express-basic-auth 사용요청
const app = express();  // express 사용 초기화

const data = [
  {longUrl: 'http://google.com', id: '189dsls38'}
];
// http://localhost:3000/38nzei39
// 302 응답
// 

app.set('view engine', 'ejs');  // ejs 설정
app.use('/static', express.static('public')); // static 설정
app.use(morgan('tiny'));  // morgan 설정
app.use(basicAuth({ // basicAuth 설정
  users: { 'admin': 'admin' },
  challenge: true,
  realm: 'Imb4T3st4pp'
}))

app.get('/', (req, res) => {
  res.render('index', {data});
});

app.listen(3000, () => {
  console.log('listening...');
});
