function Register(){
	
	this.init();
}

Register.prototype={
	init(){
		
		//对表单进行正则操作
		this.userNameTest();
		//*密码请输入6~12字母数字下划线
		this.userPasswordTest();
		//确认密码
		this.userReaPasswordTest();
		//随机生成验证码
		this.createCode();
		//点击更换验证码
		this.replaceCode();
		//验证输入的验证码
		this.codeTest();
		//点击注册后向后台提交数据
		this.registerClick();
		
	}, 
	userNameTest(){
		$('#reg-username').on('focus',$.proxy(this.handleUserNameFocus));
		$('#reg-username').on('blur',$.proxy(this.handleUserNameBlur));
	},
	handleUserNameFocus(){
		$('.reg-useTip').css('visibility','hidden');
	},
	handleUserNameBlur(){
		//正则验证
		//用户名请输入6~12位中文字母下划线数字

		var reg = /^[\w\u4e00-\u9fa5]{2,9}$/
		var str = $('#reg-username').val();
		if(reg.test(str)){
		}else{
			$('.reg-useTip').css('visibility','visible');
		}

	},
	userPasswordTest(){
		$('#reg-password').on('focus',$.proxy(this.handlePasswordFocus));
		$('#reg-password').on('blur',$.proxy(this.handlePasswordBlur));
	},
	handlePasswordFocus(){
		$('.reg-passwordTip').css('visibility','hidden');
		
	},
	handlePasswordBlur(){
		//验证用户密码正则
		var reg= /^\w{6,12}$/;
		var str = $('#reg-password').val();
		if(reg.test(str)){
			
		}else{
			$('.reg-passwordTip').css('visibility','visible');
		}
	},
	userReaPasswordTest(){
		$('#reg-repeat-password').on('focus',$.proxy(this.handleRepeatPasswordFocus));
		$('#reg-repeat-password').on('blur',$.proxy(this.handleRepeatPasswordBlur));
	},
	handleRepeatPasswordFocus(){
		$('.reg-repeat-passwordTip').css('visibility','hidden');
	},
	handleRepeatPasswordBlur(){
	  var Password = $('#reg-password').val();
	  var repeatPassword =$('#reg-repeat-password').val();
	  if(Password === repeatPassword){
	  	
	  }else{
	  	$('.reg-repeat-passwordTip').css('visibility','visible');
	  }
	  
	},
	createCode(){
		var  r = Math.floor(Math.random()*256);
		var  g = Math.floor(Math.random()*256);
		var  b =Math.floor(Math.random()*256);
		$('.reg-code').css('background','rgb('+r+','+g+','+b+')');
		var  code = Math.floor(Math.random()*900000+100000);
		$('.reg-code').text(code);
	},
	replaceCode(){
		$('.reg-code-swap').on('click',$.proxy(this.handleReplaceCode));
	},
	handleReplaceCode(){
		var  r = Math.floor(Math.random()*256);
		var  g = Math.floor(Math.random()*256);
		var  b =Math.floor(Math.random()*256);
		var  code = Math.floor(Math.random()*900000+100000);
		$('.reg-code').text(code);
		$('.reg-code').css('background','rgb('+r+','+g+','+b+')');
	},
	codeTest(){
		$('.reg-code-input').on('focus',$.proxy(this.handleCodeFocus));
		$('.reg-code-input').on('blur',$.proxy(this.handleCodeBlur));
		
		
	},
	handleCodeFocus(){
		$('.reg-code-wr-tip').css('visibility','hidden');
	},
	handleCodeBlur(){
		var str1 = $('.reg-code-input').val();
		var str2 = $('.reg-code').text();
		if(str1 === str2){
			
		}else{
		   $('.reg-code-wr-tip').css('visibility','visible');	
		}
	},
	registerClick(){
			$('.user-reg').on('click',$.proxy(this.handleRegisterSucc))	
	},
	handleRegisterSucc(){
				if($('#reg-username').val()==''||$('#reg-password').val()==''||$('#reg-repeat-password').val()==''||$('.reg-code-input').val()==''||$('.reg-useTip').css('visibility')=='visible'||$('.reg-passwordTip').css('visibility')=='visible'||$('.reg-repeat-passwordTip').css('visibility')=='visible'){
					   alert('表单注册的格式有误重新注册');
	
				}else{
						var userName = $('#reg-username').val();
						var passWord = $('#reg-password').val();
						$.ajax({
							type:"post",
							url:"/user/register",
							data:{userName,passWord},
							success: function(data){
								if(data.successInfo){
									alert('注册成功');
									$('#reg-username').val('');
									$('#reg-password').val('');
									$('#reg-repeat-password').val('');
									$('.reg-code-input').val('');
									$('.register').css('display','none');
									$('.login').css('display','block');
								}else{
									alert('用户名被注册');
								}
							}
						});
						
				}
				
	},
	
	
}

new Register();