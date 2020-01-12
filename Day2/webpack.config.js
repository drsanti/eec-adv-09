// const __exdir__  = 'ex01-getting-started';
// const __exdir__  = 'ex02-engine-callback';
// const __exdir__  = 'ex03-user-init-function';
// const __exdir__  = 'ex04-configuration-options';
// const __exdir__  = 'ex05-initialization-options';
// const __exdir__  = 'ex06-mesh-manipulation';
// const __exdir__  = 'ex07-body-manipulation';
// const __exdir__  = 'ex08-keyboard-input';
// const __exdir__  = 'ex09-force-impulse';
// const __exdir__  = 'ex10-local-force-impulse';
// const __exdir__  = 'ex11-physics-materials';
// const __exdir__  = 'ex12-show-hide-debug-labels';
// const __exdir__  = 'ex13-raycast-force-impulse';
// const __exdir__  = 'ex14-models-assets-loading';
// const __exdir__  = 'ex15-distance-constraint';
// const __exdir__  = 'ex16-point2point-constraint';
// const __exdir__  = 'ex17-point2point-line-buffer-geometry';
// const __exdir__  = 'ex18-using-web-gui';
// const __exdir__  = 'ex19-object-cloning-child-parant';
// const __exdir__  = 'ex20-asset-loading-cloning';
// const __exdir__  = 'ex21-asset-complex-loader';
// const __exdir__  = 'ex22-rigid-body-cloning-chain-constraints';
// const __exdir__  = 'ex23-hinge-constraint-4-wheels';
// const __exdir__  = 'ex24-wheels-motors-driving';
// const __exdir__  = 'ex25-car-turning-camera-tracking';
// const __exdir__  = 'ex26-robot-arm-particles-demo';
// const __exdir__  = 'ex27-simple-robot-arm-control';
// const __exdir__  = 'ex28-wheel-bot-project-day';
// const __exdir__  = 'ex29-racing-car-drive';
// const __exdir__  = 'ex30-vihicle-loading-driving';
// const __exdir__  = 'ex31-particles-raycasting'
// const __exdir__ = 'ex32-animations'
// const __exdir__ = 'ex33-simple-arm'


const __exdir__ = "GameAnimation";


//!!
//!!
const __mode__ = 'app' /*  'dev' OR 'app';  */
//!!
//!!


const config = {
  app: {
    root: 'apps',
    main: __exdir__ + '/index.js'
  },
  dev: {
    main: 'index.js'
  }
}

const path = require('path');

module.exports = {
  entry: (__mode__ === 'app') ? './' + config.app.root + '/src/' + config.app.main : './src/' + config.dev.main,
  mode: 'development',
  output: {
    path: path.resolve(__dirname, config.app.root + '/public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, config.app.root + '/public'),
    compress: true,
    port: 9001,
  },
  module: {
    rules: [{
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
    ]
  },
};
