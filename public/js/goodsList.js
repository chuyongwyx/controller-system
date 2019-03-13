function GoodsList(){
	this.init();
	this.page = 1;
}
GoodsList.template =`<div class="goodslist">
					 		<table class="goodsTab">
 								<tr class="title1-capt"><td>商品图片</td><td>商品名称</td><td>商品价格</td><td>商品描述</td><td>操作</td></tr>			
							</table>
					 	</div>`;
GoodsList.prototype={
	init(){
			this.GoodsListClick();
	},
	GoodsListClick(){
		
		
		$('.search_goods').on('click',this.handleGetGoodsSucc,$.proxy(this.handleGoodsClickSuccess,this));
	},
	handleGoodsClickSuccess(params){
		$('.goodslist_content').css('display','block');
		$('.goodslist_content').html(GoodsList.template);
		$.ajax({
			type:"get",
			url:"/goods/goodsList",
			data:{
				page:this.page,
				limit:8
			},
			success:$.proxy(Object.prototype.toString.call(params)=="[object Function]"?params:params.data,this)
		});
	},
	handleGetGoodsSucc(data){
		if(data.successInfo){
			this.render(data);
		new LayPage2().init(this,data);
		}else{
			
			alert(data.info);
		}
	},
	handleGetGoodsPageSucc(data){
		if(data.successInfo){
			 this.render(data);
		}else{
			alert(data.info)
		}
	},
	render(data){
		var str ="";
		for(var i =0;i<data.data.length;i++){
			str =`<td><img src="../${data.data[i].goodsImg}" alt="" /></td><td>${data.data[i].goodsName}</td><td>${data.data[i].goodsPrice}<span>元</span></td><td>${data.data[i].goodsInfo}</td><td><span class="delete">删除</span></td>`
			var trs=$("<tr class='goods_item' data-id="+data.data[i]._id+"></tr>").html(str);
			$('.goodsTab').append(trs);
		}
		
	 	new RemoveGoods();
		
	}
	
}


