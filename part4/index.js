const mongoose = require('mongoose');
const config = require('./utils/config');
const app = require('./app');
const log = require('./utils/logger');

mongoose.connect(config.MONGODB_URL);
app.listen(config.PORT, () => log.info(`Server running on port ${config.PORT}`));
