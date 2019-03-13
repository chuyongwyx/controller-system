function RemoveGoods(){
	this.init();
}

RemoveGoods.prototype={
	init(){
		this.deleteClick();
	},
	deleteClick(){
		$('.delete').on('click',$.proxy(this.handleClickSuccess));
	},
	handleClickSuccess(){
		var _id =$(this).parent().parent().attr('data-id');
		$.ajax({
            type: "post",
            url: "/goods/removegoods",
            data: {_id},
            success: function(data){
            	if(data.successInfo){
					alert('删除成功');
					location.reload(true);
					
				}
            }
        	});	
	}
	
}
