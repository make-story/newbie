
const path = require('path'); 
const mariadb = require('mariadb'); // https://www.npmjs.com/package/mariadb
const env = require(path.resolve(__dirname, '../config/env'));

// Connection
/*pool.getConnection()
.then(connection => {
	connection.query("SELECT 1 as val")
	.then(rows => { // rows: [ {val: 1}, meta: ... ]
		return connection.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
	})
	.then(res => { // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
		connection.release(); // release to pool
	})
	.catch(err => {
		connection.release(); // release to pool
	})
}).catch(err => {
	// not connected
});*/

// Connection Pool
const pool = mariadb.createPool({
	host: env.mariaHost, 
	user: env.mariaUser,
	password: env.mariaPassword,
	database: env.mariaDB, 
	connectionLimit: 5
});

// test
function test() {
	pool.getConnection()
	.then(async connection => {
		console.log("connected ! connection id is " + connection.threadId);
		console.log(await connection.query("select * from test"));
		connection.release(); //release to pool
	})
	.catch(err => {
		console.log("not connected due to error: " + err);
	});
}
async function asyncFunction() {
	let connection;
	let rows;
	try {
		connection = await pool.getConnection();
		rows = await connection.query("SELECT 1 as val");
		// rows: [ {val: 1}, meta: ... ]
		rows = await connection.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
		// rows: { affectedRows: 1, insertId: 1, warningStatus: 0 }
	}catch(err) {
		throw err;
	}finally {
		if(connection) connection.release(); //release to pool
	}
}

module.exports = {
	pool,
};