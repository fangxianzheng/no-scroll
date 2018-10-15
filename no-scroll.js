/**
 * 参数
 * childEl 滚动子的元素
 * parentEl 也会滚动的父级元素
 * preventEls 要特别对待的滚动子元素的一些父级元素
 * *************************** */

class noScroll {
  constructor(childEl, parentEl, preventEls) {
    this.childEl = childEl
    this.parentEl = parentEl
    this.preventEls = preventEls
    this.maxscroll = null
    this.atTop = false
    this.atBottom = false
    this.startY = 0
    this.endY = 0
    this.dir = 1                                         // 1 向上滑动， 2 向下滑动
    this.touchstart = this.touchstart.bind(this)                  
    this.touchmove = this.touchmove.bind(this)     
    this.prevent = this.prevent.bind(this)   
    this.init()
  }

  init () {
    this.childEl.addEventListener('touchstart', this.touchstart)
    this.childEl.addEventListener('touchmove', this.touchmove)
    this.childEl.addEventListener('scroll', this.scrol)
    if (this.preventEls && this.preventEls.length > 0) {
      this.preventEls.forEach((cell) => {
        cell.addEventListener('touchmove', this.prevent)
      })
    }
  }

  touchstart (event) {
    event.stopPropagation()
    let events = event.touches[0] || event
    let clientHeight = this.childEl.clientHeight
    let scrollHeght = this.childEl.scrollHeight 
    let scrollTop = this.childEl.scrollTop

    this.maxscroll = scrollHeght - clientHeight
    this.atTop = (scrollTop === 0)
    this.atBottom = (scrollHeght === (clientHeight + scrollTop))
    this.startY = events.pageY
  }

  touchmove (event) {
    event.stopPropagation()
    let events = event.touches[0] || event
    if (this.maxscroll <= 0 ) { event.preventDefault() }
    if (events.pageY < this.startY) {
      this.dir = 1
    } else {
      this.dir = 2
    }
    
    if(this.atBottom && this.dir === 1) {
      event.preventDefault()
    }

    if(this.atTop && this.dir === 2) {
      event.preventDefault()
    }
  }

  scrol (event) {
    event.stopPropagation()
    event.preventDefault()
  }

  prevent (event) {
    event.stopPropagation()
    event.preventDefault()
  }

  remove () {
    this.childEl.removeEventListener('touchstart', this.touchstart)
    this.childEl.removeEventListener('touchmove', this.touchmove)
    if (this.preventEls && this.preventEls.length > 0) {
      this.preventEls.forEach((cell) => {
        cell.removeEventListener('touchmove', this.prevent)
      })
    }
  }
}

let win = document.querySelector('#win')
let body = document.body
let gogogo = new noScroll(win, body, [document.querySelector('.win-wrap')])
//gogogo.remove()



