/*
[주의!]
watch 옵션으로 서버를 시작할 경우, 형태소 분석기능을 실행할 때 마다 서버가 재시직될 수 있다.
(형태소 분석 내부에서 파일을 만들고 지우는 경우가 존재 할 수 있음)
*/
const path = require('path'); 
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
//const cors = require('cors');
//const cookieParser = require('cookie-parser');
const env = require(path.resolve(__dirname, './config/env'));
const mongodb = require(path.resolve(__dirname, './databases/mongodb'));

// express app
const app = express();

// express 미들웨어 설정
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//app.use(cors()); // cors 관련 정책
//app.use(cookieParser());

// 템플릿 
app.set('view engine', 'ejs'); // 사용할 템플릿 설정
app.set('views', __dirname + '/view'); // view 관련 파일이 모여있는 폴더 경로
app.engine('html', require('ejs').renderFile); // html 에서 ejs 사용가능하도록 설정

// 이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일 경로 설정
app.use(express.static('static'));

// mongodb 연결 
mongodb.connect();

// redirect HTTP to HTTPS 
/*app.all('*', (request, response, next) => { 
	let protocol = request.headers['x-forwarded-proto'] || request.protocol; 
	if(protocol == 'https') { 
		next(); 
	}else { 
		let from = `${protocol}://${request.hostname}${request.url}`; 
		let to = `https://'${request.hostname}${request.url}`; 
		// log and redirect 
		console.log(`[${request.method}]: ${from} -> ${to}`); 
		response.redirect(to); 
	} 
});*/

// 라우터
app.use('/', require('./routers/global'));
app.use('/test', require('./routers/test'));
app.use('/api', require('./routers/api'));
app.use('/synology', require('./routers/synology'));

// 서버 실행
//app.listen(env.port, () => console.log(`app is working at http://localhost:${env.port}`));
const httpServer = http.createServer(app);
httpServer.listen(env.port, () => {
	console.log('Newbie Server', env.port);
});
if(fs.existsSync(path.resolve(__dirname, '../.key/ssl.json'))) {
	const ssl = require(path.resolve(__dirname, '../.key/ssl.json'));
	if(ssl && typeof ssl === 'object' && fs.existsSync(ssl.pathKey) && fs.existsSync(ssl.pathCert)) {
		const credentials = {
			key: fs.readFileSync(ssl.pathKey), // 키 파일의 경로
			cert: fs.readFileSync(ssl.pathCert), // 인증서 파일의 경로
		};
		const httpsServer = https.createServer(credentials, app);
		httpsServer.listen(env.portSSL, () => {
			console.log('Newbie Server SSL', env.portSSL);
		});
	}
}
