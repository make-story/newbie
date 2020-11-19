/*
-
request.params -> :type
request.query.xxx -> GET 파라미터
request.body.xxx -> POST 파라미터
*/
const path = require('path'); 
const interfaceResponse = require(path.resolve(__dirname, './interface/response'));

exports.insert = (request, response, next) => {
	//const { params, query } = request;
	//const {  } = params;
	response.json({ ...interfaceResponse, });
};
exports.select = (request, response, next) => {
	//const { params, query } = request;
	//const {  } = params;
	response.json({ ...interfaceResponse, });
};
exports.update = (request, response, next) => {
	//const { params, query } = request;
	//const {  } = params;
	response.json({ ...interfaceResponse, });
};
exports.delete = (request, response, next) => {
	//const { params, query } = request;
	//const {  } = params;
	response.json({ ...interfaceResponse, });
};