function LayPage2(){
	
}
LayPage2.prototype={
	init(that,data){
		layui.use('laypage',function(){
			var laypage = layui.laypage;
			laypage.render({
				elem:"countPage2",
				count:data.count,
				limit:8,
				jump:function(obj,first){
					if(!first){
						that.page =obj.curr;
					that.handleGoodsClickSuccess(that.handleGetGoodsPageSucc);
					}
				}
			})
		})
	}
}
