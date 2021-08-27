const webpack = require('webpack')

module.exports = function override(config, env) {
  config.module.rules[1].oneOf[2].options.plugins.push(
    require.resolve('@babel/plugin-proposal-class-properties'),
  )
  config.plugins.push(
    new webpack.DefinePlugin({ __DEV__: env !== 'production' }),
  )

  return config
}
