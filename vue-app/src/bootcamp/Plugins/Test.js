let TestPlugins = {}

TestPlugins.install = function(Vue, options) {
  // 原型链继承方法
  Vue.prototype.$test = function() {
    console.log("testing...")
    console.log(options)
    return "test successed"
  }

  // 全局注册方法
  Vue.globalTest = function() {
    console.log("global test function")
  }

  // 全局注册指令
  Vue.directive("focus", {
    inserted: function(el) {
      el.focus()
    }
  })
}

export default TestPlugins
