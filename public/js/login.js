function Login(){
	this.init()
}

Login.prototype ={
	init(){
			//随机生成验证码
			this.randomCode();
			//点击更换一张随机生成验证码
			this.replaceCode();
			//点击没有账号注册一个跳到注册测框
			this.hrefRegister();
			//验证验证码的正误
			this.CodeTest();
			//点击登录向后台提交数据
			this.submitSuccess();
			//登录后的表单中的输入框得焦失焦
			this.userNameOnOff();
			this.userPasswordOn();
			
	},
	randomCode(){
		var  r = Math.floor(Math.random()*256);
		var  g = Math.floor(Math.random()*256);
		var  b =Math.floor(Math.random()*256);
		$('.code').css('background','rgb('+r+','+g+','+b+')');
		var  code = Math.floor(Math.random()*900000+100000);
		$('.code').text(code);
		
	},
	replaceCode(){
		$('.code-swap').on('click',$.proxy(this.handleSwapSuccess,this));
	},
	handleSwapSuccess(){
		var  r = Math.floor(Math.random()*256);
		var  g = Math.floor(Math.random()*256);
		var  b =Math.floor(Math.random()*256);
		var  code = Math.floor(Math.random()*900000+100000);
		$('.code').text(code);
		$('.code').css('background','rgb('+r+','+g+','+b+')');
	},
	hrefRegister(){
		$('.reg').on('click',$.proxy(this.handleHrefSuccess,this));
	},
	handleHrefSuccess(){
		$('.login').css('display','none');
		$('.register').css('display','block');
	},
	CodeTest(){
		$('.code-input').on('focus',$.proxy(this.handleFocusSuccess,this));
		$('.code-input').on('blur',$.proxy(this.handleBlurSuccess,this));
	},
	handleFocusSuccess(){
		$('.code-wr-tip').css('visibility','hidden');
	},
	handleBlurSuccess(){
		var str = $('.code-input').val();
		var str1 = $('.code').text();
		if(str !== str1){
			$('.code-wr-tip').css('visibility','visible');
		}
	},
	submitSuccess(){
		
			$('.userlogin').on('click',$.proxy(this.handleLogin,this));
			
	},
	handleLogin(){
		if($('#username').val() ==''||$('#password').val()==''||$('.code-input').val()==''||$('.code-wr-tip').css('visibility')=='visible'){
			alert('请把登录信息填完整');
		}else{
			var  userName = $('#username').val();	
			var  passWord =$('#password').val();
			$.ajax({
				type:"post",
				url:"user/login",
				data:{
						userName,
						passWord
				},
				success: function(data){
					console.log(data);
					if(data.info=='登录成功'){
						alert('登录成功');
						location.href='./html/main.html';
					}
					if(data.info =='密码错误'){
						$('.passwordTip').css('visibility','visible')
					}
					if(data.info =='用户名不存在'){
						$('.useTip').css('visibility','visible')
					}
				}
			})
		}
	},
	
	userNameOnOff(){
		$('#username').on('focus',$.proxy(this.handleFocusSuccess))
	},
	handleFocusSuccess(){
		$('.useTip').css('visibility','hidden');
	},
	userPasswordOn(){
		$('#password').on('focus',$.proxy(this.handlePswSuccess))
	},
	handlePswSuccess(){
		$('.passwordTip').css('visibility','hidden');
	}
	
}


new Login();
