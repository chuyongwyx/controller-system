var mongoose = require("../utils/database").mongoose;

var Shop = mongoose.model("shop",{
	"shopName":String,
	"shopUpPrice":String,
	"shopAdress":String,
	"shopTel": String,
	"shopLogo":String,
})
function addShop(shopInfo,cb){
	var shop = new  Shop(shopInfo);
	shop.save().then((result)=>{
		cb(result)
	})
}

//分页
function findShop(shopInfo,cb){
	Shop.find().skip((shopInfo.page-1)*shopInfo.limit).limit(Number(shopInfo.limit)).then((data)=>{
		cb(data);
	})
}
//总数
function findShopCount(cb){
		Shop.find().then((data)=>{
			cb(data);
		})
}

//修改商品信息
function updateShop(conpanyId,upShop,cb){
	Shop.update(conpanyId,{$set:upShop}).then((result)=>{
		cb(result)
	})
}
module.exports={
	addShop,
	findShop,
	findShopCount,
	updateShop
	
}
