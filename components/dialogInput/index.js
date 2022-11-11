// components/confirmBox/index.js
const app = getApp()
Component({
  options: {
    /**
        styleIsolation 选项从基础库版本 2.6.5 开始支持。它支持以下取值：
            isolated 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）；
            apply-shared 表示页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面；
            shared 表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置了 apply-shared 或 shared 的自定义组件。（这个选项在插件中不可用。）
     */
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
    },
    message: {
      type: String,
      value: ''
    },
    cancelButtonText: {
      type: String,
      value: '取消'
    },
    confirmButtonText: {
        type: String,
        value: '确定'
    },
    confirmCallback: null,
    cancelCallback: null,
    //初始化数据
    dataList: { 
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    windowWidth: 0,
    windowHeight: 0,
    dataValue:{}
  },
  /**
   * 生命周期函数
   */
  ready: function () {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
        });
      }
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    refresh(){
      var that = this 
      //console.log("========初始化====="+JSON.stringify(this.data.dataList))
      //赋值初始化的值
      var dataValue = {}
      that.data.dataList.forEach( item =>{
        dataValue[item.key] = item.value
      })
      that.setData({
        dataValue : dataValue
      })
    },
    //关闭与显示
    close( isShow ){
      this.setData({
        show : isShow
      })
    },
    //文本输入
    textInput(e){
      console.log(e.currentTarget.dataset.key)
      console.log(e.detail.value)
      var key = e.currentTarget.dataset.key
      var value = e.detail.value
      this.data.dataValue[key] = value
      console.log( JSON.stringify(this.data.dataValue) )
    },
    onConfirm(e) {
      var that = this
      var isSuccess = true
      this.data.dataList.forEach( item=>{
        var value = that.data.dataValue[item.key]
        if( !value ){
          app.globalData.util.toast.error(item.hint,false)
          isSuccess = false
          return 
        }
        var rules = item.rules
        if( rules && rules.length > 0 ){
          rules.forEach( child=>{
            if( !child.rule.test( value ) ){
              app.globalData.util.toast.error(child.hint,false)
              isSuccess = false
              return 
            }
          })
          if( !isSuccess ){
            return
          }
        }
      } )
      if( !isSuccess ) return

      if (this.properties.confirmCallback) {
        this.properties.confirmCallback( this.data.dataValue );
      }
      // this.setData({
      //   show: false
      // });
    },
    onCancel() {
      if (this.properties.cancelCallback) {
        this.properties.cancelCallback();
      }
      this.setData({
        show: false
      });
    },
    onClose(){
      this.onCancel()
    }
  }
})