module.exports = {
    pluginOptions: {
      electronBuilder: {
        preload: 'src/preload.js',
        builderOptions: {
          appId: "com.mcdonalds.crewroom",
          mac: {
            "target": "dmg",
            "category": "public.app-category.utilities"
          },
          publish: [{
            "provider": "generic",
            "url": "https://crewroom.mcdgente.com/releases/"
          }],
        }
      }
    }
  }