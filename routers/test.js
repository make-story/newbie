const path = require('path'); 
//const fs = require('fs');
//const url = require('url');
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Test = require(path.resolve(__dirname, '../models/test'));
const { ObjectId } = mongoose.Types;

const mariadb = require(path.resolve(__dirname, '../databases/mariadb'));

// test
router.get('/mongo', (request, response, next) => {
	const { params, query, body, } = request;
	//const {  } = params;
	//let findQuery = {};
	//let findProjection = { host: 1 };
	//let sort = { _date: -1 };

	const getData = async () => {
		//response.set('Content-Type', 'application/x-www-form-urlencoded');
		//response.end(`payload=${JSON.stringify({ text: 'test' })}`);
		//response.json({"text": "test"});
		//response.json(await Test.find(findQuery, findProjection).sort(sort).exec());
		response.json(await Test.find({}).exec());
	};
	getData();
});

router.get('/sql', (request, response, next) => {
	const { params, query, body, } = request;
	//const {  } = params;
	//let findQuery = {};
	//let findProjection = { host: 1 };
	//let sort = { _date: -1 };

	const getData = async function() {
		let connect = null;
		let result = {};
		try {
			connect = await mariadb.pool.getConnection();
			result = await connect.query("select * from test");
		}catch(err) {
			throw err;
		}finally {
			connect && connect.release(); //release to pool
		}
		/*mariadb.pool.getConnection()
		.then(async connection => {
			console.log("connected ! connection id is " + connection.threadId);
			console.log(await connection.query("select * from test"));
			connection.release(); //release to pool
		})
		.catch(err => {
			console.log("not connected due to error: " + err);
		});*/
		response.json(result);
	};
	getData();
});

module.exports = router;