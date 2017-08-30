const express = require('express'); // 1. express 사용요청 
const app = express();  // 2. express 사용 초기화
const morgan = require('morgan'); // 3. morgan 사용요청
const basicAuth = require('express-basic-auth') // 4. express-basic-auth 사용요청
const randomstring = require("randomstring"); // 5. 랜덤문자생성 사용 요청

const data = [
  {longUrl: 'http://google.com', id: randomstring.generate(12)}  // id에 randomstring을 생성
];

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
