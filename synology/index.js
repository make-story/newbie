/*
시놀리지 연동을 위한 파일

-
시놀리지 webhook 설명
https://www.synology.com/ko-kr/knowledgebase/DSM/tutorial/Collaboration/How_to_configure_webhooks_and_slash_commands_in_Chat_Integration

- 
일반 메시지
payload={"text": "First line of message to post in the channel.\nAlso you can have a second line of message."}

-
링크 메시지
payload={"text": "<https://www.synology.com>"}
payload={"text": "Check this!! <https://www.synology.com|Click here> for details!"}
*/
const fs = require('fs');
const path = require('path'); 
const axios = require('axios');
const paths = require(path.resolve(__dirname, '../config/paths'));
const env = require(path.resolve(__dirname, '../config/env'));

// 시놀리저 연결 정보
const synology = require('../.key/synology.json');
/*if(fs.existsSync('../.key/synology.json')) {
	//synology = require('../.key/synology.json');
	try {
		synology = JSON.parse(fs.readFileSync('../.key/synology.json').toString() || '{}'); 
	}catch(e) {}
}*/

// payload
// application/x-www-form-urlencoded
const send = (url="") => async (text="test message") => {
	// 유효성 검사
	if(!url) {
		return false;
	}

	// encode
	text = encodeURIComponent(text);
	
	// 전송
	console.log(`[synology] ${text}`);
	const response = await axios({
		method: 'post',
		url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data: `payload=${JSON.stringify({ text })}`,
	});

	return response;
};

// test
if(process.argv.includes(`--test`)) {
	if(!synology['synology-send-url']) {
		console.log('[synology] synology-send-url 확인이 필요합니다.');
	}else {
		send(synology['synology-send-url'])('Test!!!');
	}
}

module.exports = {
	uit: send(synology['synology-send-url']),
};