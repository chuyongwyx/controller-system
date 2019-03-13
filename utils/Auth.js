//请求token模块
var JWT = require('jsonwebtoken');

function setToken(payload,secret){
	return JWT.sign(payload,secret,{expiresIn:"1h"})
}

function getToken(token,secret,cb){
	//token验证如果err存在token验证失败 如果不存在验证成功
	JWT.verify(token,secret,function(err){
		cb(err);
	});
}

module.exports ={
	setToken,
	getToken
}
