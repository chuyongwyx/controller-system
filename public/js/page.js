function Page(){
	this.init();
	
}

Page.prototype ={
	init:function(){
		  this.mainLeftMouseover();
		  this.mainLeftMouseout();
		  this.mainLeftClick();
		  this.mainLeftULHover();
		  this.user();
		  this.loginout();
		  this.userlogin();
		  this.indexPageClick();
		  
	},
	mainLeftMouseover(){
		$('.list p').on('mouseover',$.proxy(this.handleMouseoverSucc))
	},
	handleMouseoverSucc(){
		$(this).css('background','#48576a');
	},
	mainLeftMouseout(){
		$('.list p').on('mouseout',$.proxy(this.handleMouseout))
	},
	handleMouseout(event){
			$(this).css('background','');
	},
	mainLeftClick(){
		$('.shopList').on('click',$.proxy(this.handleClickSucc));
	},
	handleClickSucc(){
		$('.ShopInfo').slideToggle('normal',function(){
//			console.log($('.ShopInfo')[0].style.display);
			if($('.ShopInfo')[0].style.display == 'none'){
				$('.iconrg').html('&#xe66c;');	
			}else{

				$('.iconrg').html('&#xe504;');
			}	
		});
		
	},
	mainLeftULHover(){
		$('.ShopInfo li').hover($.proxy(this.handleHoverSucc),$.proxy(this.handleHoverOut))
	},
	handleHoverSucc(){
		$(this).css('background','#48576a');
	},
	handleHoverOut(){
		$(this).css('background','');
	},
	user(){
				var user =Cookies.get("user");
				var token =Cookies.get('token');
				
				if(user && token){
					$('#username').text(user);
					$('#loginout').text('退出');
				}else{
					$('#username').text('');
					$('#userlogin').text('登录');
				}
			},
			loginout(){
				 $('#loginout').on('click',$.proxy(this.handleOutSuccess,this))
			},
			handleOutSuccess(){
				if(confirm("你确定要退出登录?")){
					Cookies.remove('user');
					Cookies.remove('token');
					$('#loginout').css('display','none');
				
					location.reload(true);
					
				}
				
				
			},
			userlogin(){
				$('#userlogin').on('click',$.proxy(this.handleClickuserlogin))
			},
			handleClickuserlogin(){
					location.href='../index.html';
			},
			indexPageClick(){
				
				
				$('.indexbox').on('click',function(){
					
					location.reload(true);
				})
			}
	
}

new Page();
