module.exports = {
    pluginOptions: {
      electronBuilder: {
        preload: 'src/preload.js',
        builderOptions: {
          publish: [{
            "provider": "generic",
            "url": "https://crewroom.mcdgente.com/releases/"
          }]
        }
      }
    }
  }