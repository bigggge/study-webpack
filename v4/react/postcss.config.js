/**
 * postcss.config.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2018/7/30.
 */

module.exports = () => ({
  plugins: {
    autoprefixer: { browsers: ['last 5 version', '>1%', 'ie >=8'] },
  }
});