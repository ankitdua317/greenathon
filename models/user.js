var mongoose  = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
  name : {type : String , required : true},
  gender : {type : String , required : true},
  email :  {type : String , required : true},
  age :  {type : Number , required : true},
  password : {type : String , required : true},
  rewardCoins : {type : Number},
  ItemsSearched : {type : Number},
  items : {type : Schema.Types.ObjectId , ref :"Product"}
});

userSchema.methods.encryptPassword = function(password){
  return bcrypt.hashSync(password , bcrypt.genSaltSync(5) , null);
};

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
