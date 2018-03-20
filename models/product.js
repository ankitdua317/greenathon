var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	imagePath : {type : String, required : true},
	name : {type : String, required : true},
	type : {type : String, required : true}
});

module.exports = mongoose.model('Product',schema); //Product is the name of the model.
