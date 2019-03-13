const  mongoose = require('../utils/database').mongoose;

const User = mongoose.model("user",{
		userName:String,
		passWord:String
})

function userFind(userInfo,cb){
	User.findOne(userInfo).then(result=>{
		cb(result)
	})
	
}

function userSave(userInfo,cb){
  var user =new User(userInfo);
  user.save().then(result=>{
  		console.log(result);
  		cb(result)
  })
	
}

module.exports ={
	userFind,
	userSave
}
