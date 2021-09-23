const app = require('./app');
const log = require('./utils/logger');

const PORT = 3003;
app.listen(PORT, () => log.info(`Server running on port ${PORT}`));
