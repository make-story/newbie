const path = require('path'); 
const fs = require('fs');
//const url = require('url');
const axios = require('axios');
const express = require('express');
const router = express.Router();

// mecab
const mecab = require(path.resolve(__dirname, '../mecab/middleware'));

router.all('/newbie', (request, response, next) => {
	const { params={}, query={}, body={}, } = request;
	//const {  } = params;
	let pos = [];
	let morphs = [];
	let nouns = [];
	let text = [];

	// 로그 쓰기
	try {
		const pathLog = path.resolve(__dirname, "../logs/synology.log");
		fs.openSync(pathLog, 'a+');
		fs.appendFileSync(pathLog, [new Date(), `query : ${JSON.stringify(query)}`, `body : ${JSON.stringify(body)}`, '', ].join('\n'));
	}catch(e) {
		console.log(e);
	}

	// 형태소
	if(typeof body === 'object' && body && typeof body.text === 'string' && body.text) {
		// 트리거 명령어 제거 
		/*if(body.text.split(' ')[0] === body.trigger_word) {

		}*/
		pos = mecab.pos(body.text);
		morphs = mecab.morphs(body.text);
		nouns = mecab.nouns(body.text);
		if(body.username) {
			text.push(`@${body.username}`);
		}
		text.push(`[${morphs.splice(1).join(' / ')}] 메시지를 분석합니다.`);
	}

	// 반환
	response.writeHead(200, { 'Content-Type': 'application/json' });
	response.write(JSON.stringify({"text": text.join(' ')}));
	response.end();
});

router.all('/newbie/outgoing', (request, response, next) => {
	/*
	(async () => {
		await axios({
			method: 'post',
			url: '',
			//headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			headers: {'Content-Type': 'application/json'},
			data: `payload=${JSON.stringify({})}`,
		});
		response.end('TEST');
	})();
	*/
});

module.exports = router;