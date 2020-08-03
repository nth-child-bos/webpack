import './style.css'
import './foo.css'
import React from 'react'

import addContent from './add-content.js';
import testHtmlLoader from './htmlLoader.html'
import contentTemplate from './content.handlebars'
import Image from './image/黄博声-平台事业部-1237.jpg'
import UrlImage from './image/tabbar_icon_my.png'
import VueTemp from './vueTemp.vue'
document.write('My first Webpack app.<br />');
document.write(React.version);
addContent();

console.log('testHtmlLoader', testHtmlLoader)

const handleBarStr = contentTemplate({
  title: 'HaHa'
})

console.log('handleBarStr', handleBarStr)
console.log('Image', Image)
console.log('UrlImage', UrlImage)
console.log('VueTemp', VueTemp)
console.log('React', React)
