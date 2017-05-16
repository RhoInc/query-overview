import babel from 'rollup-plugin-babel';

module.exports = {
  moduleName: 'queryOverview',
  entry: './src/wrapper.js',
  dest: './build/queryOverview.js',
  format: 'iife',
  globals: {
    d3: 'd3',
    webcharts: 'webCharts'
  },
  external: (function() {
    var dependencies = require('./package.json').dependencies;

    return Object.keys(dependencies);
  }()),
  plugins: [
    babel(
      {
        "presets": [
          [
            "es2015",
            {
              "modules": false
            }
          ]
        ],
        "plugins": [
          "external-helpers"
        ],
        "exclude": "node_modules/**"
      })
  ]
};
