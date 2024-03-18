module.exports = {
    publishers: [
      {
        name: '@electron-forge/publisher-github',
        config: {
          repository: {
            owner: 'cleamoon',
            name: 'Elim-Electron_Image_Viewer'
          },
          prerelease: false,
          draft: true
        }
      }
    ]
  }