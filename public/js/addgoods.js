function AddGoods(){
	this.init();
}
AddGoods.template=`
<div class="add-content">
						<form class="addshopfrom">
							  <div class="form-group">
							    <label for="goodsName">添加商品</label>
							    <input type="text" class="form-control" id="goodsName" placeholder="商品名称">
							  </div>
							  <div class="form-group">
							    <label for="goodsPrice">商品价格</label>
							    <input type="text" class="form-control" id="goodsPrice" placeholder="商品价格">
							  </div>
							   <div class="form-group">
							    <label for="goodsInfo">商品描述</label>
							    <input type="text" class="form-control" id="goodsInfo" placeholder="商品描述">
							  </div>
							  
							  <div class="form-group">
							    <label for="goodsImg">商品图片</label>
							    <input type="file" id="goodsImg">
							    <p class="help-block"></p>
							  </div>
				
						</form>
							<button type="button" class="btn btn-default" id="addgoods">添加</button>		  	
						 
					</div>
`
AddGoods.prototype={
	init(){
		this.addGoodClick()
		
	},
	addGoodClick(){
		$('.add-goods').on('click',$.proxy(this.handleClickSuccess,this));
	},
	handleClickSuccess(){
				var main =$('.addgoods_main');
				main.css('display','block');
				main.html(AddGoods.template);
		this.goodsSubmitClick();	
	},
	goodsSubmitClick(){
		$('#addgoods').on('click',$.proxy(this.handleAddgoodClick,this))
	},
	handleAddgoodClick(){
		this.goodsName = $('#goodsName');
				this.goodsPrice=$('#goodsPrice');
				this.goodsInfo= $('#goodsInfo');
				
				this.goodsImg=$('#goodsImg');
				if(this.goodsName.val()==''||this.goodsPrice==''||this.goodsInfo==''){
					alert('请将表单填写完整')
				}else{
						var formData = new FormData();
			
				formData.append("goodsName",this.goodsName.val());
				formData.append("goodsPrice",this.goodsPrice.val());
				formData.append("goodsInfo",this.goodsInfo.val());
				formData.append("goodsImg",this.goodsImg[0].files[0]);
				console.log(formData);
			$.ajax({
            type: "post",
            url: "/goods/addgoods",
            data: formData,
            contentType: false,
            processData: false,
            success: $.proxy(this.handleAddSucc, this)
        	});	

				}
	},
	handleAddSucc(data){
				if(data.successInfo){
					alert('添加成功');
					location.reload(true);
				}
			}
}

