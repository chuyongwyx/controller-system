function AddShop(){
	this.init();
	
}
AddShop.template=`<div class="addshop">
						<form class="addshopfrom">
							  <div class="form-group">
							    <label for="shopName">添加商家</label>
							    <input type="text" class="form-control" id="shopName" placeholder="商家名称">
							  </div>
							  <div class="form-group">
							    <label for="shopUpPrice">商家起送价格</label>
							    <input type="text" class="form-control" id="shopUpPrice" placeholder="商家起送价格">
							  </div>
							   <div class="form-group">
							    <label for="shopAdress">商家地址</label>
							    <input type="text" class="form-control" id="shopAdress" placeholder="商家地址">
							  </div>
							   <div class="form-group">
							    <label for="">商家电话</label>
							    <input type="text" class="form-control" id="shopTel" placeholder="商家电话">
							  </div>
							  <div class="form-group">
							    <label for="shopLogo">商家logo</label>
							    <input type="file" id="shopLogo">
							    <p class="help-block"></p>
							  </div>
				
						</form>
							<button type="button" class="btn btn-default" id="adds">添加</button>		  	
						 
					</div>`

AddShop.prototype ={
			init(){
					this.addShop();
					
					
			},
			addShop(){
				$('.addshops').on('click',$.proxy(this.handleAddshopsClick,this))
				
			},
			handleAddshopsClick(){
					$('#map').css('display','none');
					$('.common').html('');
					$('.common').html(AddShop.template);
					this.submitClick();
			},
			submitClick(){
				
				$('#adds').on('click',$.proxy(this.handleAddsClick,this))
				
			},
			handleAddsClick(){
				
				
				
				this.shopName = $('#shopName');
				this.shopUpPrice=$('#shopUpPrice');
				this.shopAdress= $('#shopAdress');
				this.shopTel = $('#shopTel');
				this.shopLogo =$('#shopLogo');
				if(this.shopName.val()==''||this.shopUpPrice.val()==''||this.shopAdress.val()==''||this.shopTel.val()==''||this.shopLogo.val()==''){
					alert('请将表单填写完整')
				}else{
					var formData = new FormData();
			
				formData.append("shopName",this.shopName.val());
				formData.append("shopUpPrice",this.shopUpPrice.val());
				formData.append("shopAdress",this.shopAdress.val());
				formData.append("shopTel",this.shopTel.val());
				formData.append("shopLogo",this.shopLogo[0].files[0]);
				console.log(formData);
			$.ajax({
            type: "post",
            url: "/shop/addShop",
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
					localtion.reload(true);
				}
			}


}


new AddShop();