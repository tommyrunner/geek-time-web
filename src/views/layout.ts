/*
 * @Descripttion:
 * @version:
 * @Author: tommy
 * @Date: 2021-09-03 12:00:26
 * @LastEditors: tommy
 * @LastEditTime: 2021-09-03 16:02:36
 */
var _domHight: number
var _isSr: boolean
var _isDowSr: boolean
var _nowScroll: number
var _Fun: Function
var _InItFun: Function
export class WindowListening {
  constructor(Fun: Function, InItFun: Function) {
    _isSr = true
    _isDowSr = false
    _nowScroll = 0
    _Fun = Fun
    _InItFun = InItFun
    //初始化-加载后的高度
    _domHight = _InItFun()
  }
  initDomHight(domHight: number) {
    _domHight = domHight
  }
  stop() {
    window.removeEventListener('scroll', this.testScroll, false)
  }
  start() {
    // win的滚动监听底部
    window.addEventListener('scroll', this.testScroll) //监听页面滚动
    // return this
  }
  testScroll() {
    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    // let domHight = document.getElementsByClassName('history-list')[0].clientHeight - 700
    // 是否是下滚动
    if (scrollTop > _nowScroll) {
      _nowScroll = scrollTop //更新-下滚动;
      _isDowSr = true
    }
    if (scrollTop < _nowScroll) {
      _nowScroll = scrollTop //更新-上滚动;
      _isDowSr = false
    }
    if (_domHight < scrollTop && _isSr && _isDowSr) {
      _isSr = false

      // 拉到底回调
      const fun = _Fun()
      if (fun instanceof Promise) {
        // 如果是异步的
        fun
          .then((res) => {
            _isSr = true
            //初始化
            _domHight = _InItFun()
          })
          .catch((e) => {
            _isSr = true
            //初始化
            _domHight = _InItFun()
          })
      } else {
        // 如果不是异步,模拟异步-节流
        setTimeout(() => {
          _isSr = true
          //初始化
          _domHight = _InItFun()
        }, 1000)
      }
    }
  }
}
