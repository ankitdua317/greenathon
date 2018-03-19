var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
	searchedBy : {type : Schema.Types.ObjectId, ref : 'User'},
	type : {type : String}
});

module.exports = mongoose.model('item',itemSchema);
