const express = require('express');
const log = require('./utils/logger');
const { cors, morgan } = require('./utils/middleware');
const blogListRouter = require('./controllers/blogs');

const app = express();

app.use(cors());
app.use(morgan('tiny'));

app.use('/api/blogs', blogListRouter);
const PORT = 3003;
app.listen(PORT, () => log.info(`Server running on port ${PORT}`));
