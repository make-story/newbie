/*
-
request.params -> :type
request.query.xxx -> GET 파라미터
request.body.xxx -> POST 파라미터
*/
const path = require('path'); 
const mecab = require(path.resolve(__dirname, '../mecab/middleware'));
const interfaceResponse = require(path.resolve(__dirname, './interface/response'));

exports.type = (request, response, next) => {
	const { params={}, query={} } = request;
	const { type="pos"  } = params;
	const { text=""  } = query;
	let result = []; // 배열

	try {
		switch(type) {
			case 'pos':
				result = mecab.pos(decodeURIComponent(text));
				break;
			case 'morphs':
				result = mecab.morphs(decodeURIComponent(text));
				break;
			case 'nouns':
				result = mecab.nouns(decodeURIComponent(text));
				break;
		}
	}catch(e) {
		// mecab 설치되지 않은 곳에서 에러가 발생할 수 있다.
	}

	response.json({ ...interfaceResponse, result: result, });
};