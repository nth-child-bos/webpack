import style from './style.css'

import addContent from './add-content.js';
import testHtmlLoader from './htmlLoader.html'
import contentTemplate from './content.handlebars'
import Image from './image/黄博声-平台事业部-1237.jpg'
import UrlImage from './image/tabbar_icon_my.png'
import VueTemp from './vueTemp.vue'
import './index.scss'

// import ('./foo.js') // 异步加载， 会产生新的js和css
import './foo.js'; // 非异步加载， 打包在bundle内
document.write('My first Webpack app222.<br />');
addContent();

console.log('testHtmlLoader', testHtmlLoader)

const handleBarStr = contentTemplate({
  title: 'HaHa'
})

console.log('handleBarStr', handleBarStr)
console.log('Image', Image)
console.log('UrlImage', UrlImage)
console.log('VueTemp', VueTemp)
console.log('style', style)
console.log('TEST_ENV', TEST_ENV)


if (module.hot) {
  module.hot.accept()
}