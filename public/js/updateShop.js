function UpdataShop(){
	this.init();
	
}

UpdataShop.prototype={
	init(){
			this.spanClick();
			
	},
	spanClick(){
		
		$('.edit').on('click',$.proxy(this.handleSpanClickSuccess))
		this.updataClick();
	},
	handleSpanClickSuccess(){
		 var adshopTel = $(this).parent().prev();
		 var adshopAdress = adshopTel.prev();
		 var adshopUpPrice =adshopAdress.prev();
		 var adshopName =adshopUpPrice.prev();
		 var adshopLogo = adshopName.prev().children().attr("src");
		 
		 var id = $(this).parents().eq(1).attr('data-id');
		 $('#upshopName').val(adshopName.text());
$('#upshopUpPrice').val(parseFloat(adshopUpPrice.text()));
		$('#upshopAdress').val(adshopAdress.text());
		$('#upshopTel').val(adshopTel.text());
$('.upshopfrom').attr('data-id',id);
	
 $('.updata').css('display','block');
 		
 		
	},
	updataClick(){
		$('#upshop').on('click',$.proxy(this.handleUpClickSuccess))
	},
	handleUpClickSuccess(){
//		var formData = new FormData();
//		formData.append("_id",$('.upshopfrom').attr("data-id"));
//		formData.append("shopName",$('#upshopName').val());
//		formData.append("shopUpPrice",$('#upshopUpPrice').val());
//		formData.append("shopAdress",$('#upshopAdress').val());
//		formData.append("shopTel",$('#upshopTel').val());
//		
//		formData.append("shopLogo",$('#upshopLogo')[0].files[0]);
//		console.log($('.upshopfrom').attr("data-id"),$('#upshopUpPrice').val(),$('#upshopAdress').val(),$('#upshopTel').val(),$('#upshopLogo')[0].files[0])
		var _id =$('.upshopfrom').attr("data-id");
		var shopName =$('#upshopName').val();
		var shopUpPrice =$('#upshopUpPrice').val();
		var shopAdress =$('#upshopAdress').val();
		var shopshopTel =$('#upshopTel').val();
		$.ajax({
            type: "post",
            url: "/shop/updataShop",
            data: {_id,shopName,shopUpPrice,shopAdress,shopshopTel},
//          contentType: false,
//          processData: false,
            success: function(data){
            	if(data.successInfo){
					alert('修改成功');
					$('.updata').css('display','none');
					$('.upshopfrom').attr("data-id",'');
					$('#upshopName').val('');
					$('#upshopUpPrice').val('');
					$('#upshopAdress').val('');
					$('#upshopTel').val('');
					location.reload(true);
				}
            }
        	});	
		
	},
//	handleUpSucc(data){
//		if(data.successInfo){
//			alert('修改成功');
//		}
//	}

}

