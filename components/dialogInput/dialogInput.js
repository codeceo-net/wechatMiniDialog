
const defaultOptions = {
  show: false,
  selector: '#cus-dialog-input',
  message: "标题",
  confirmButtonText: '确认',
  cancelButtonText: '取消',
  confirmCallback: null,
  cancelCallback: null,
};
let currentOptions = Object.assign({}, defaultOptions);
function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}
const Dialog = (options) => {
  options = Object.assign(Object.assign({}, currentOptions), options);
  const context = options.context || getContext();
  const dialog = context.selectComponent(options.selector);
  delete options.context;
  delete options.selector;
  if (dialog) {
      dialog.setData(options);
      wx.nextTick(() => {
          dialog.setData({ show: true });
          dialog.refresh()//初始化刷新
      });
  }
  else {
      console.warn('未找到 cus-dialog-input节点，请确认 selector 及 context 是否正确');
  }
};
Dialog.confirm = (options) => Dialog(Object.assign({}, options));

export default Dialog;


 //在代码中调用
//  Dialog.confirm({
//   message: '弹窗内容',
//   selector: '#cus-dialog',
//   confirmCallback: function() {
//       console.log('确认啦');
//   }
// });
