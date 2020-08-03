// var loaderUtils = require("loader-utils")

module.exports = function (content) {
  // if(this.cacheable){
  //   this.cacheable();
  // }
  // var options = loaderUtils.getOptions(this) || {};
  console.log('this',this)
  // console.log('options',options)
  var useStrictPrefix = '';
  return useStrictPrefix + content;
}