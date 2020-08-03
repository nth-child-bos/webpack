const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');
const postcssCssnext = require('postcss-cssnext');

module.exports = {
  plugins: [
    autoprefixer({
      grid: true,
      // browsers: [
      //   'last 10 Chrome versions',
      //   'last 5 Firefox versions',
      //   'Safari >= 6',
      //   'ie> 8',
      // ]
    }),
    stylelint({
      config: {
        rules: {
          'declaration-no-important': true,
        }
      }
    }),
    postcssCssnext({
      browsers: [
        '> 1%',
        'last 2 versions',
      ]
    })
  ]
};