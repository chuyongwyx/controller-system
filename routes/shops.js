var express = require('express');
var router = express.Router();
var shopController = require('../controller/shops');
var multer =require("multer");

var storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,'./public/img')
	},
	filename:function(req,file,cb){
		cb(null,Date.now()+'-'+file.originalname)
	}
})
var upload = multer({storage:storage})
var cpUpload = upload.fields([{name:'shopLogo',maxCount:1}])
/* GET users listing. */
router.post('/addShop',cpUpload,shopController.addShop);

router.get('/shopList',shopController.shopList);

router.post('/updataShop',shopController.upShopInfo);
module.exports = router;
