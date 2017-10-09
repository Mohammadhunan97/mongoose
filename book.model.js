let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BookSchema = new Schema({
	title: {
		type: String,
		required: true, //not required by default
		unique: true, // defaults to false
		default: Date.now //default date
	},
	keywords: Array,
	published: Boolean
});


// (unofficial name, name)

module.exports = mongoose.model('Book',BookSchema);