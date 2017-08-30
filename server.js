const express = require('express'); // 1. express 사용요청 
const app = express();  // 2. express 사용 초기화
const morgan = require('morgan'); // 3. morgan 사용요청
const basicAuth = require('express-basic-auth') // 4. express-basic-auth 사용요청
const randomstring = require("randomstring"); // 5. 랜덤문자생성 사용 요청

const data = [
  {longUrl: 'http://google.com', id: randomstring.generate(6)}  // id에 randomstring을 생성
];

app.set('view engine', 'ejs');  // ejs 설정
app.use('/static', express.static('public')); // static 설정
app.use(morgan('tiny'));  // morgan 설정
app.use(basicAuth({ // basicAuth 설정
  users: { 'admin': 'admin' },
  challenge: true,
  realm: 'Imb4T3st4pp'
}));

// 6. index.ejs를 렌더링 해준다.
app.get('/', (req, res) => {
  res.render('index', {data});
});

// localhost/xxx 뒤에 id 값을 입력하면 입력한 id에 해당하는 객체의 url 값으로 리다이렉션 해준다.
app.get('/:id', (req, res) => {
  const id = req.params.id;
  const matched = data.find(item => item.id === id);  // 데이터를 요청한 id값과 data에 있는 id값과 일치하는지 찾는다.
  if (matched) {
    res.redirect(301, matched.longUrl); // 일치하면 301 status로 보내주고 matched된 longurl로 리다이렉션한다.
  } else {
    res.status(404);
    res.send('기분이 안좋다');  // 일치하지 않으면 에러메시지 띄운다.
  }
});

app.listen(3000, () => {
  console.log('listening...');  // 7. 3000포트로 listen을 한다. 
});
