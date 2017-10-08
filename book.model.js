let mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true, //not required by default
		unique: true, // defaults to false
		default: Date.now //default date
	},
	author: {
		type: Schema.Objectid, //other schema object
		ref: 'User' //user model
	},
	keywords: Array,
	published: Boolean
});


// (unofficial name, name)

module.exports = mongoose.model('Book',BookSchema);