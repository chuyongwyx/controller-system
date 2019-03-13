var shopModel = require("../model/shops");
var AuthToken = require("../utils/Auth");
var addShop =(req,res)=>{
	var {shopName,shopUpPrice,shopAdress,shopTel}=req.body;
	var urlPath = req.files.shopLogo[0].path.replace(/\\/g,"/").replace(/public/,"");
	shopModel.addShop({
		shopName,
		shopUpPrice,
		shopAdress,
		shopTel,
		shopLogo:urlPath
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
function shopList(req,res){
	var token = req.headers["x-token"];
		
	AuthToken.getToken(token,"newyear",(err)=>{
		
		if(err){
			
			res.json({
				successInfo:false,
				info:"令牌失效"
			})
		}else{
			var {page,limit}=req.query;
			shopModel.findShop({page,limit},(data)=>{
				if(data.length>0){
					console.log(data.length);
					shopModel.findShopCount((result)=>{
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
	})
}

//修改商品信息
const upShopInfo =(req,res)=>{
		
	let{_id,shopName,shopUpPrice,shopAdress,shopshopTel}=req.body;
	console.log({_id,shopName,shopUpPrice,shopAdress,shopshopTel})
	
//	let urlPath=req.files.shopLogo[0].path.replace(/\\/g,"/").replace(/public/,"");
	shopModel.updateShop({_id},{shopName,shopUpPrice,shopAdress,shopshopTel},(data)=>{
		if(data){
			res.json({
				successInfo:true,
				info:"修改成功"
			})
		}
	})
}
module.exports={
	addShop,
	shopList,
	upShopInfo
}
