var goodsModel = require("../model/goods");
var AuthToken = require("../utils/Auth");

var addGoods =(req,res)=>{
	var {goodsName,goodsPrice,goodsInfo}=req.body;
	var urlPath = req.files.goodsImg[0].path.replace(/\\/g,"/").replace(/public/,"");
	goodsModel.addGoods({
		goodsName,
		goodsPrice,
		goodsInfo,
		goodsImg:urlPath
	},(result)=>{
		if(result){
			res.json({
				successInfo:true,
				info:"添加成功"
			})
		}else{
			res.json({
				successInfo:false,
				info:"添加失败"
			})
		}
	})
}

//商品列表
function goodsList(req,res){
			var {page,limit}=req.query;
			goodsModel.findGoods({page,limit},(data)=>{
				if(data.length>0){
					console.log(data.length);
					goodsModel.findGoodsCount((result)=>{
						var count = result.length;
						res.json({
							successInfo:true,
							data:data,
							count
						})
					})
				}
			})
		

}

//删除商品
function removeGoods(req,res){
	var{_id} = req.body;
	console.log(_id);
	goodsModel.RemoveGoods({_id},(result)=>{
		if(result){
			res.json({
				successInfo:true,
				info:"删除成功"
			})
		}else{
			res.json({
				successInfo:false,
				info:"删除失败"
			})
		}
	})
}



module.exports={
	addGoods,
	goodsList,
	removeGoods
}
