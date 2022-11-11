// pages/setting/setting.js
import dialogInput from '../../components/dialogInput/dialogInput'
import Dialog from '../../components/confirmBox/dialog'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "19999999999",
    nickName: "codeceo",
    phone: "19999999999",
    userId: "1000",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },
  //更新姓名
  updateNickNameClick(e) {
    var that = this
    dialogInput.confirm({
      dataList: [{
        key: "nickName",
        title: "姓名:",
        hint: "请输入姓名，方便医生识别",
        value: that.data.nickName,
        type: "text",
      }],
      message: "更新姓名",
      confirmCallback: function (dataValue) {
        that.selectComponent("#cus-dialog-input").close( false )
        app.globalData.httpApi.updateuser(app, {
          nickName: dataValue.nickName,
          id: that.data.userId
        }).then(res => {
          app.globalData.util.toast.success("更新姓名成功")
          setTimeout(()=>{
            that.refresh()
          },1500)
        });
      }
    });
  },
  //更新手机
  updatePhoneClick(e) {
    var that = this
    dialogInput.confirm({
      dataList: [{
        key: "phone",
        title: "手机:",
        hint: "请输入手机号码",
        value: that.data.phone,
        type: "number",
        rules: [{
          rule: /^1\d{10}$/,
          hint: "格式错误，手机号码为11位数"
        }]
      }],
      message: "绑定手机",
      confirmCallback: function (dataValue) {
        that.selectComponent("#cus-dialog-input").close( false )
        app.globalData.httpApi.updatephone(app, {
          phoneNumber: dataValue.phone,
          id: that.data.userId
        }).then(res => {
          app.globalData.util.toast.success("绑定手机号成功")
          setTimeout(()=>{
            that.refresh()
          },1500)
        });
      }
    });
    that.selectComponent("#cus-dialog-input").refresh()
  },
  //修改密码
  updatePassWordClick(e) {
    var that = this
    dialogInput.confirm({
      dataList: [{
        key: "oldPassword",
        title: "旧密码:",
        hint: "请输入旧密码",
        value: "",
        type: "text",
        rules: [{
          rule: /.{6,16}/,
          hint: "格式错误，密码格式为6~16位数"
        }]
      },{
        key: "newPassword",
        title: "新密码:",
        hint: "请输入新密码",
        value: '',
        type: "text",
        rules: [{
          rule: /.{6,16}/,
          hint: "格式错误，密码格式为6~16位数"
        }]
      },
      {
        key: "confirmNewPassword",
        title: "重复新密码:",
        hint: "请重复新密码",
        value: '',
        type: "text",
        rules: [{
          rule: /.{6,16}/,
          hint: "格式错误，密码格式为6~16位数"
        }]
      }
    ],
      message: "修改密码",
      confirmCallback: function (dataValue) {
        if( dataValue.newPassword  != dataValue.confirmNewPassword ){
          app.globalData.util.toast.success("新密码两次输入不一致")
          return 
        }
        app.globalData.httpApi.changepassword(app, {
          oldPassword: dataValue.oldPassword,
          newPassword: dataValue.newPassword,
          confirmNewPassword: dataValue.confirmNewPassword,
        }).then(res => {
          app.globalData.util.toast.success("修改密码成功")
          that.selectComponent("#cus-dialog-input").close( false )
          setTimeout(()=>{
            //关闭页面跳转登录
            wx.setStorageSync('pass',  "")
            app.globalData.util.route.reLaunch( '/pages/login/login?model=logout' )
          },1500)
        });
      }
    });
    //that.selectComponent("#cus-dialog-input").refresh()
  },
  //退出登录
  logoutClick(e) {
    Dialog.confirm({
          message: '确定退出登录？',
          confirmCallback: function() {
            
          }
        });
  },
  //刷新资料
  refresh() {
    var that = this
    app.doProfile(() => {
      that.initValue()
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})