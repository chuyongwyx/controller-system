function ShopList(){
	this.init();
	this.page = 1;
}
ShopList.template =`<div class="shoplist">
					 		<table class="shopTab">
 								<tr class="title-capt"><td>商家Logo</td><td>商家名称</td><td>起送金额</td><td>商家地址</td><td>联系电话</td><td>操作</td></tr>			
							</table>
					 	</div>`;
ShopList.prototype={
	init(){
			this.shopListClick();
	},
	shopListClick(){
		$('.shopLister').on('click',this.handleGetShopSucc,$.proxy(this.handleClickSuccess,this));
	},
	handleClickSuccess(params){
		$('#map').css('display','none')
		$('.common').html('');
		$('.common').html(ShopList.template);
		$.ajax({
			type:"get",
			url:"/shop/shopList",
			headers:{
				"X-Token":Cookies.get("token")
			},
			data:{
				page:this.page,
				limit:8
			},
			success:$.proxy(Object.prototype.toString.call(params)=="[object Function]"?params:params.data,this)
		});
	},
	handleGetShopSucc(data){
		if(data.successInfo){
			this.render(data);
			new LayPage().init(this,data);
		}else{
			
			alert(data.info);
		}
	},
	handleGetShopPageSucc(data){
		if(data.successInfo){
			 this.render(data);
		}else{
			alert(data.info)
		}
	},
	render(data){
		var str ="";
		for(var i =0;i<data.data.length;i++){
			str =`<td><img src="../${data.data[i].shopLogo}" alt="" /></td><td>${data.data[i].shopName}</td><td>${data.data[i].shopUpPrice}<span>元</span></td><td>${data.data[i].shopAdress}</td><td>${data.data[i].shopTel}</td><td><span class="search_goods">查看</span><span class="edit">编辑</span><span class="add-goods">增加</span></td>`
			var trs=$("<tr class='shop_item' data-id="+data.data[i]._id+"></tr>").html(str);
			$('.shopTab').append(trs);
		}
		
	 
		new UpdataShop();
		new AddGoods();
		new GoodsList();
	}
	
}


new ShopList();