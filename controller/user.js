var userModel = require('../model/user');
//加密模块
var crypto = require('crypto');

var AuthToken = require('../utils/Auth');

function register(req,res){
	 let{userName,passWord}=req.body;
	//判断用户名是否存在
	userModel.userFind({userName},function(result){
		if(result){
			res.json({
				successInfo:false,
				Info:"用户名已存在"
			})
		}else{
			var hash = crypto.createHash('sha256');
			hash.update(passWord);
			userModel.userSave({userName,passWord:hash.digest('hex')},function(result){
				if(result){
					res.json({
						successInfo:true,
						Info:"注册成功"
					})
				}
			})
			
		}
	})
}

function login(req,res){
	let{userName,passWord}=req.body;
	userModel.userFind({userName},function(result){
		if(result){
			var hash= crypto.createHash('sha256');
			hash.update(passWord);
			if(result.passWord == hash.digest('hex')){
				var payload ={
					userName
				}
				var secret ='newyear';
			res.cookie('token',AuthToken.setToken(payload,secret));
			res.cookie('user',userName);
				res.json({
					successInfo:true,
					info:"登录成功",
					user:userName
				})
			
			}else{
				res.json({
					successInfo:false,
					info:"密码错误"
				})
			}
		}else{
			res.json({
				successInfo:false,
				info:"用户名不存在"
			})
		}
	})
}


module.exports ={
	register,
	login
}
