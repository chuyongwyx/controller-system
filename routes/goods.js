var express = require('express');
var router = express.Router();
var multer =require("multer");
var goodsController = require('../controller/goods');
var storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,'./public/img')
	},
	filename:function(req,file,cb){
		cb(null,Date.now()+'-'+file.originalname)
	}
})
var upload = multer({storage:storage})
var cpUpload = upload.fields([{name:'goodsImg',maxCount:1}])
router.post('/addgoods',cpUpload,goodsController.addGoods);
router.get('/goodslist',goodsController.goodsList);
router.post('/removegoods',goodsController.removeGoods);
module.exports =router;