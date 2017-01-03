// ========================================================
// Configuration for Mongo
// ========================================================

module.exports = {
  uri: 'mongodb://localhost/allNote',
  options: {
    server: {
      socketOptions: {
        keepAlive: 300000,
        connectTimeoutMS: 30000
      }
    },
    replset: {
      socketOptions: {
        keepAlive: 300000,
        connectTimeoutMS: 30000
      }
    }
  }
}

