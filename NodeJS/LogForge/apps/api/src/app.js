const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const env = require('./config/env');
const userRoutes = require('./routes/userRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
const logApiRequest = require('./middlewares/logApiRequest');

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.dashboardOrigin,
    credentials: true
  })
);
app.use(logApiRequest);
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

if (env.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/users', userRoutes);
app.use('/api/applications', applicationRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
