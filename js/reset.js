var baseUrl = 'http://testback.fjzkcloud.cn/'

//改变html的fontSize以适配rem
let screenWidth = window.screen.width
screenWidth = screenWidth < 320 ? 320 : (screenWidth > 750 ? 750 : screenWidth)
let ua = navigator.userAgent
if (ua.indexOf('Android') == -1 && ua.indexOf('Linux') == -1 && ua.indexOf('iPhone') == -1) {
  screenWidth = 375
}
document.getElementsByTagName('html')[0].style.fontSize = (screenWidth / 10) * (1000 / 750) + 'px'

// 增加时间戳处理缓存问题
if (GetQueryString('v')) {
  replaceParamVal("v", new Date().getTime())
} else {
  if (location.href.indexOf("?") != -1) {
    history.pushState("", "", location.href + "&v=" + new Date().getTime());
  } else {
    history.pushState("", "", location.href + "?v=" + new Date().getTime());
  }
}

function replaceParamVal(paramName, replaceWith) {
  var oUrl = this.location.href.toString();
  var re = eval('/(' + paramName + '=)([^&]*)/gi');
  var nUrl = oUrl.replace(re, paramName + '=' + replaceWith);
  history.pushState("", "", nUrl)
}

//图片加载失败显示的默认图
function loadError(e) {
  e.src = './static/error_200x140.png'
}

// 获取地址栏上的参数
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};

// 部分苹果手机input失焦不回弹
function inputBlur() {
  let u = navigator.userAgent,
    isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isIOS) { //判断是 iOS
    setTimeout(() => {
      const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
      window.scrollTo(0, Math.max(scrollHeight - 1, 0)) // 归位
    }, 20)
  }
}

//使用方法
// example regularList['iphone'].rule.test(phone)
const regularList = {
  'iphone': {
    rule: /^1[3456789]\d{9}$/,
    text: '请正确输入您的手机号'
  },
  'password': {
    rule: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
    text: '请正确输入6-16位字符的密码(数字和字母组成)'
  },
  'IdCard': {
    rule: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    text: '请正确输入您的身份证号码'
  },
  'email': {
    rule: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
    text: '请正确输入您的邮箱地址'
  },
  'msgCode': {
    rule: /^\d{6}$/,
    text: '请正确输入短信验证码'
  },
  'qq': {
    rule: /^\d{5,13}$/,
    text: '请正确输入您的QQ号'
  },
  'weixin': {
    rule: /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/,
    text: '请正确输入您的微信号'
  },
  'positiveInteger': { // 正整数（不含0）
    rule: /^[1-9]*[1-9][0-9]*$/,
    text: '请输入正整数'
  },
  'naturalNumber': { // 自然数（含0）
    rule: /^\d+$/,
    text: '请输入非负整数'
  },
  'plateNumber': {
    rule: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
    text: '请正确输入您的车牌号'
  },
  'ChineseName': {
    rule: /[\u4E00-\u9FA5]/,
    text: '请正确输入您的真实姓名'
  },
  'taxNumber': {
    rule: /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/,
    text: '请输入正确的企业税号'
  }
}