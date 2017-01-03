const mongoose = require('mongoose');
const config = require('../config/db.config');

mongoose.connect(config.uri, config.options);

module.exports = mongoose;
