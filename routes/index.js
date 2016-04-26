var express = require('express');
var router = express.Router();


var sms_config = require('../config/sms');
var App = require('alidayu-node');
var app = new App(sms_config.app_key, sms_config.app_secret);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/send_sms', function(req, res){
  var phone = req.body.phone;
  var code = Math.random().toString().substr(2,6);
  //console.log(sms_config);
  app.smsSend({
    sms_free_sign_name:'注册验证',
    sms_param:{"code": code, "product": '.NET协会'},
    rec_num:phone,
    sms_template_code: 'SMS_7221331'
  }, function( response){
    if(!response) {
      console.log(response);
      console.log("11");
      return res.json({
        "code":"1",
        "msg":"error1"
      });
    }
    if(response.error_response){
      console.log(response);
      return res.json({
        "code":"2",
        "msg":"error2"
      });
    }
    console.log(response);
    req.session.phone = phone;
    req.session.code = code;
    return res.json({
      "code":"0",
      "msg":"success"
    });

  });

});

// 注册路由
router.post('/sendAll', function(req, res) {
  var phone = req.body.phone;
  var code = req.body.code;
  var name = req.body.name;
  var gender = req.body.gender;
  var college = req.body.college;
  console.log(req.body);
  // todo 判断手机号格式
  function test_phone() {
    var reg = /^(13[0-9)|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test(phone)) {
      return true;
    } else {
      return false;
    }
  }

  function test_name() {
    if (name) {
      return true;
    } else {
      return false;
    }
  }

  function test_gender() {
    if (gender && gender != 0) {
      return true;
    } else {
      return false;
    }
  }

  function test_college() {
    if (college && college != 0) {
      return true;
    } else {
      return false;
    }
  }

  function test_code() {
    if (code.length == 6) {
      return true;
    } else {
      return false;
    }
  }

  console.log(test_phone());
  // 判断 name,等字段格式是否正确...
  if (!(test_phone()&& test_name() && test_college() && test_gender()&& test_code()) ){
    console.log('test');
    return res.json({
      code: 1,
      msg: 'error'
    });
  }

  // todo code
  // 判断 验证码是否正确
  //if (!(code == req.session.code && phone == req.session.phone)) {
  //  return res.json({
  //    code: 2,
  //    msg: 'error code'
  //  });
  //}

  console.log('form success');
  // 全部正确之后,存入数据库
  //连接数据库
  req.getConnection(function (err, connection) {
    console.log('get connection error : ', err);
    if (err) {
      return res.json({
        code: 3,
        msg: 'error connection'
      });
    }

    //插入数据
    var post = {
      name:'name',
      gender:'gender',
      college:'college',
      phone:'phone'
    };
    var insert = 'INSERT INTO session_code SET ? ';
    connection.query(insert,post,  function (err) {
      console.log('insert error: ', err);
      if (err) {
        return res.json({
          code: 4,
          msg: 'error insert'
        });
      } else {
        // 存入成功
        return res.json({
          code: 0,
          msg: 'success'
        });
      }
    });
  });

});


/*
// 发送短信验证码
router.post('/send_sms', function(req, res, next) {
  var phone = req.body.phone;
  // 生成4位随机短信验证码
  var code = Math.random().toString().substr(2,6);

  app.smsSend({
   // sms_free_sign_name: sms_config.sms_free_sign_name, //短信配置
   // sms_param: {
    //  "code": code, //验证码内容
     // "product": sms_config.product  //短信配置
    //},
    //rec_num: phone, // 目标手机号
    //sms_template_code: sms_config.sms_template_code  //短信配置

    sms_free_sign_name:'注册验证',
    sms_param:{"code": "1234", "product": '.NET协会'},
    rec_num:18224026886,
    sms_template_code: 'SMS_7221331'

  }, function(response) {
    // 短信发送后的回调函数

    console.log('===send sms result ', response);

    // 1.如果回调函数中,没有得到返回的 respone 参数,则说明发送失败
    if (!response) {
      return res.json({
        code: 1,
        msg: 'send fail'
      });
    }
    // 2.如果 response 参数中, response 的 error_response 属性存在,也说明发送失败
    if (response.error_response) {
      return res.json({
        code: 2,
        msg: 'send fail'
      });
    }

    // 发送短信验证码成功,将验证码和电话号码都存入session,供之后注册的时候判断
    req.session.verify_sms = code;
    req.session.verify_phone = phone;

    // 返回发送成功的 json
    return res.json({
      code: 0,
      msg: 'send success'
    });
  });
});

*/



module.exports = router;