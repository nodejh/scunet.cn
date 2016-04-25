/***************** Waypoints ******************/

$(document).ready(function() {

	$('.wp1').waypoint(function() {
		$('.wp1').addClass('animated fadeInLeft');
	}, {
		offset: '75%'
	});
	$('.wp2').waypoint(function() {
		$('.wp2').addClass('animated fadeInUp');
	}, {
		offset: '75%'
	});
	$('.wp3').waypoint(function() {
		$('.wp3').addClass('animated fadeInDown');
	}, {
		offset: '55%'
	});
	$('.wp4').waypoint(function() {
		$('.wp4').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});
	$('.wp5').waypoint(function() {
		$('.wp5').addClass('animated fadeInUp');
	}, {
		offset: '75%'
	});
	$('.wp6').waypoint(function() {
		$('.wp6').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});

});

/***************** Slide-In Nav ******************/

$(window).load(function() {

	$('.nav_slide_button').click(function() {
		$('.pull').slideToggle();
	});

});

/***************** Smooth Scrolling ******************/

$(function() {

	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 2000);
				return false;
			}
		}
	});

});

/***************** Nav Transformicon ******************/

document.querySelector("#nav-toggle").addEventListener("click", function() {
	this.classList.toggle("active");
});

/***************** Overlays ******************/

$(document).ready(function(){
    if (Modernizr.touch) {
        // show the close overlay button
        $(".close-overlay").removeClass("hidden");
        // handle the adding of hover class when clicked
        $(".img").click(function(e){
            if (!$(this).hasClass("hover")) {
                $(this).addClass("hover");
            }
        });
        // handle the closing of the overlay
        $(".close-overlay").click(function(e){
            e.preventDefault();
            e.stopPropagation();
            if ($(this).closest(".img").hasClass("hover")) {
                $(this).closest(".img").removeClass("hover");
            }
        });
    } else {
        // handle the mouseenter functionality
        $(".img").mouseenter(function(){
            $(this).addClass("hover");
        })
        // handle the mouseleave functionality
        .mouseleave(function(){
            $(this).removeClass("hover");
        });
    }
});

/***************** Flexsliders ******************/

$(window).load(function() {

	$('#introSlider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: true,
		touch: false,
		pauseOnHover: true,
		start: function() {
			$.waypoints('refresh');
		}
	});

	$('#portfolioSlider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: true,
		touch: false,
		pauseOnHover: true,
		start: function() {
			$.waypoints('refresh');
		}
	});

	$('#servicesSlider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: true,
		touch: true,
		pauseOnHover: true,
		start: function() {
			$.waypoints('refresh');
		}
	});

	$('#teamSlider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: true,
		touch: true,
		pauseOnHover: true,
		start: function() {
			$.waypoints('refresh');
		}
	});




	/***************** Flexsliders ******************/




	function get_name() {
		var name = $('#name').val();
		if (name) {
			return name;
		} else {
			sweetAlert("Oops...", "Something went wrong with your name!", "error");
			return false;
		}
	}


	function get_gender() {
		var gender = $('#gender[name="gender"] option:selected').val();
		console.log(gender);
		if (gender && gender != 0) {
			return gender;
		} else {
			sweetAlert("Oops...", "Please tell use you are boy or girl!", "error");
			return false;
		}
	}


	function get_college() {
		var college = $('#college[name="college"] option:selected').val();
		if (college && college !=0 ) {
			return college;
		} else {
			sweetAlert("Oops...", "Something went wrong with your college!", "error");
			return false;
		}
	}


	function get_phone() {
		var phone = $('#phone').val();
		var reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
		if (reg.test(phone)) {
			return phone;
		} else {
			sweetAlert("Oops...", "Something went wrong with your phone!", "error");
			return false;
		}
	}


	function get_sms() {
		var sms = $('#sms').val();
		if (sms.length == 6) {
			return sms;
		} else {
			sweetAlert("Oops...", "Something went wrong with your verify code!", "error");
			return false;
		}
	}

	$('#send_sms').click(function(){
		var phone = get_phone();
		if(!phone){
			sweetAlert("Oops...", "Something went wrong with your phone!", "error");
		} else{
			var data ={
				phone: phone
			};

			$.post('/send_sms', data, function (res) {
				if(res.code == 0){
					console.log(res.msg);
					$('#send_sms').addClass("sms_active");
					$('#send_sms').text(count +"s后重新获取验证码");
					//setTimeout(function(){
					//	var count = 60;
					//	if(count == 0){
					//		$('#send_sms').removeClass("sms_active");
					//		$('#send_sms').text("获取验证码");
					//		count = 60;
					//	} else{
					//		$('#send_sms').text(count +"s后重新获取验证码");
					//		count--;
					//	}
					//}, 1000);
				} else{
					console.log(res.msg);
					sweetAlert("Oops...", "Something went wrong with your phone!","error" );
				}

			});

		}

	});

/**
 // 发送短信后,给发送按钮题添加 "sms_active" 样式
	// 并提示60s后重新获取验证码, 60s 后,删除 "sms_active" 样式
	var wait = 60;
	function sms_time(obj) {
		if (wait == 0) {
			$(obj).removeClass('sms_active');
			$(obj).text('获取验证码');
			wait = 60;
		} else {
			$(obj).text(wait + 's后重新获取');
			wait--;
			setTimeout(function(){
				sms_time(obj)
			}, 1000);
		}
	}


	// 获取短信验证码
	$('#send_sms').click(function() {
		var phone = get_phone();
		var $send_sms = $('#send_sms');

		// 判断电话号码是否正确
		if (!phone) {
			sweetAlert("Oops...", "Something went wrong with your phone!", "error");
			return false;
		}

		// 电话号码输入正确
		var data = {
			phone: phone
		};
		//向 /sms 路由发送 post 请求
		$.post('/sms', data, function(res) {
			if (res.code == 0) {
				// 短信发送成功
				$send_sms.addClass('sms_active');
				sms_time('#send_sms');
			} else {
				// 短信发送失败
				sweetAlert("Oops...", "Something went wrong with your phone!", "error");
				return false;
			}
		});
	});

*/

	// 注册,提交注册信息
	$('#send').click(function () {
		var name = get_name();
		if (!name) return false;
		var gender = get_gender();
		if (!gender) return false;
		var college = get_college();
		if (!college) return false;
		var phone = get_phone();
		if (!phone) return false;
		var sms = get_sms();
		if (!sms) return false;

		var data = {
			name: name,
			gender: gender,
			college: college,
			phone: phone,
			sms: sms
		};

		//swal("Good job!", "You clicked the button!", "success")
		// 发送注册信息到后台

		$.post('/sendAll', data, function(res) {
			console.log(data);
			if (res.code == 0) {
				swal("Good job!",  "<strong>" + name + "</strong>您好, 感谢您的耐心填写, 您已成功报名, 我们将随后与您联系!", "success")
			}
			if(res.code == 1) {
				sweetAlert("Oops...", "格式错误!", "error"); //我觉得不需要显示具体是哪个格式错误，因为这是针对不经过表单填写直接发送数据的
			}
			if(res.code == 2){
				sweetAlert("Oops...", "短信验证码错误!", "error");
			}
			if(res.code == 3 || res.code == 4){
				sweetAlert("Oops...", "连接数据库失败!", "error");
			}
		});

	});

});