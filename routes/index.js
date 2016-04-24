var express = require('express');
var router = express.Router();


var sms_config = require('../config/sms');
var App = require('alidayu-node');
var app = new App(sms_config.app_key, sms_config.app_secret);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// 注册路由
router.post('/send', function(req, res, next) {
  var phone = req.body.phone;
  var code = req.body.code;
  // todo 判断手机号格式
  if (!phone) {
    // error phone, reutrn error message
    return res.json({
      code: 1,
      msg: 'error phone'
    });
  }

  // todo code
  // 判断 验证码是否正确
  if (!(code == req.session.code &&  phone == req.session.phone)) {
    return res.json({
      code: 2,
      msg: 'error verify code'
    });
  }

  // 判断 name,等字段是否为空...

  // 全部正确之后,存入数据库
  //req.getCon ....

  // 存入成功
  return res.json({
    code: 0,
    msg: 'success'
  })

});



/**

// 发送短信验证码
router.post('/sms', function(req, res, next) {
  var phone = req.body.phone;
  // 生成4位随机短信验证码
  var code = Math.random().toString().substr(2,6);

  app.smsSend({
    sms_free_sign_name: sms_config.sms_free_sign_name, //短信配置
    sms_param: {
      "code": code, //验证码内容
      "product": sms_config.product  //短信配置
    },
    rec_num: phone, // 目标手机号
    sms_template_code: sms_config.sms_template_code  //短信配置
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
