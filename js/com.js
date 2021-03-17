$('body').on('click','.triangle-close',function () {
  $(this).removeClass('triangle-close')
  $(this).addClass('triangle-open')
  $(this).html('收起')
})
$('body').on('click','.triangle-open',function () {
  $(this).removeClass('triangle-open')
  $(this).addClass('triangle-close')
  $(this).html('展开')
})
$('.sms-send-btn').on('click',function () {
  let time = $(this).data('time') || 60;
  let index = setInterval( ()=> {
    $(this).html(time--+'s')
    $(this).attr('disabled',true)
    if(time==0){
      $(this).attr('disabled',false)
      clearInterval(index)
      $(this).html('重新获取')
    }
  },1000)
})
function xhDialog() {
  this.index = 0;
  this.clearToast = function () {
    $('body div').remove('.xh-toast')
  }
  this.toast =  (msg,time) => {
    this.clearToast()
    $('body').append('<div class="xh-toast">'+msg+'</div>')
    let timeOut = setTimeout(function () {
        $('.xh-toast').stop().fadeOut("slow")
      },time || 1000)
  }
  this.confirm = function (confirmBody){
    $('body').append('<div class="xh-mask"></div>\
    <div class="xh-confirm" id="xh-confirm-'+this.index+'">\
      <div class="xh-dialog-title">'+(confirmBody.title || '提示')+'</div>\
      <div class="xh-dialog-content">'+(confirmBody.content || '')+'</div>\
      <div class="xh-dialog-btn">\
        <div class="left" id="xh-confirm-left-'+this.index+'">'+(confirmBody.confirmText || '确认')+'</div>\
        <div class="right" id="xh-confirm-right-'+this.index+'">'+(confirmBody.cancleText || '取消')+'</div>\
      </div>\
    </div>')
   $('#xh-confirm-left-'+this.index).click(function () {
      confirmBody.confirm()
    })
    $('body').on('click','#xh-confirm-right-'+this.index+'"',()=> {
      $('body div').remove('.xh-mask')
      $('body div').remove('#xh-confirm-'+this.index+'')
    })
    return this.index;
  }
  this.alert =  (alertBody) => {
    $('body').append('<div class="xh-mask"></div>\
    <div class="xh-alert" id="xh-alert-'+this.index+'">\
      <div class="xh-dialog-title">'+(alertBody.title || '提示')+'</div>\
      <div class="xh-dialog-content">'+(alertBody.content || '')+'</div>\
      <div class="xh-dialog-btn">\
        <div class="center" id="xh-alert-center-'+this.index+'">'+(alertBody.alertText || '确认')+'</div>\
      </div>\
    </div>')
    $('body').on('click','#xh-alert-center-'+this.index+'"',()=> {
      $('body div').remove('.xh-mask')
      $('body div').remove('#xh-alert-'+this.index+'')
    })
  }
  this.drawCon = ()=>{
    $('body').append('<div class="xh-mask"></div>\
    <div class="draw-con-bottom">\
      <div class="title"><span>确认信息</span><span class="close-btn">×</span></div>\
      <div class="content"></div>\
      <div class="footer-btn">\
        <div class="btn">确认</div>\
      </div>\
    </div>')
    $('.draw-con-bottom .footer-btn').click(function () {
      $('body div').remove('.xh-mask')
      $('body div').remove('.draw-con-bottom')
    })
    $('.close-btn').click(function () {
      $('body div').remove('.xh-mask')
      $('body div').remove('.draw-con-bottom')
    })
  }
}
function request(params) {
  return new Promise((resolve,reject)=>{
    $.ajax({
      url:baseUrl + params.url,
      type:(typeof params.method)==undefined? 'POST':params.method,
      data:params.ajaxData,
      success:(res)=>{
        resolve(res)
      },
      error:(err)=>{
        reject(err)
      }
    })
  })
}
let YDPlugs = new xhDialog()