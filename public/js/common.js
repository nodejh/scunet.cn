




(function($){

	$.extend({extendPost:function(){

    var user_name = $("#user_name").val();
		var user_password = $("#user_password").val();
		var signin_hash = $("#signin_hash").val();
		var submit_signin = $("#submit_signin").val();

		if(user_name!="" && user_password!="" && signin_hash!=""){
	      $("#submit_signin").attr("disabled","disabled");
	      $("#submit_signin").text("load...");
	      $.post("__APP__/Home/Account/signin",{user_name:user_name,user_password:user_password,signin_hash:signin_hash,submit_signin:submit_signin},
	        function(data_json){
	          if(data_json.status == 1001){
	            $("#submit_signin").text(data_json.info);
	             window.location.href = data_json.return; 
	          }else if(data_json.status == 1002){
	            //$("#signin_error").show();
	            $("#signin_error").text(data_json.info).show();
	            $("#submit_signin").text("注 册");
	            $("#submit_signin").removeAttr("disabled");
	          }else{
	            $("#signin_error").text("注册失败,请重试").show();
	            $("#submit_signin").text("注 册");
	            $("#submit_signin").removeAttr("disabled");
	          }
	      });
      
    	}

  }});

	
	$("#signin_error").hide();
	$("#submit_signin").click(function(){
		
			$.extendPost();
		
	});

	$("body").keypress(function(keynumber){
      if(keynumber.which == 13){
      	$.extendPost();
      }
    });

	

})(jQuery);




