const mongoose = require('mongoose'); // MongoDB 기반 ODM(Object Data Modelling)

const { Schema } = mongoose;
const TestSchema = new Schema({
	_title: String,
	_date: String,
});

module.exports = mongoose.model('Test', TestSchema); // tests