var mongoose = require("../utils/database").mongoose;

var Goods = mongoose.model("goods",{
	"goodsName":String,
	"goodsPrice":String,
	"goodsInfo":String,
	"goodsImg":String,
})
function addGoods(goodsInfo,cb){
	var goods = new Goods(goodsInfo);
	goods.save().then((result)=>{
		cb(result)
	})
}


//分页
function findGoods(goodsInfo,cb){
	Goods.find().skip((goodsInfo.page-1)*goodsInfo.limit).limit(Number(goodsInfo.limit)).then((data)=>{
		cb(data);
	})
}
//总数
function findGoodsCount(cb){
		Goods.find().then((data)=>{
			cb(data);
		})
}

//删除
function RemoveGoods(id,cb){
		Goods.remove({_id:id}).then((result)=>{
			cb(result);
		})
}

module.exports={
	addGoods,
	findGoods,
	findGoodsCount,
	RemoveGoods
}
