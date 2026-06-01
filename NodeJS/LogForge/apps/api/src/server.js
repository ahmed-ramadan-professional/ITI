const app = require('./app');
const env = require('./config/env');
const { connectDb, disconnectDb } = require('./config/db');
const { initializeApiLogger, writeApiLog } = require('./services/apiLogger');

let server;
let stopping = false;

async function start() {
  try {
    await connectDb();
    const loggerEnabled = await initializeApiLogger();

    server = app.listen(env.port, () => {
      console.log(`API listening on http://localhost:${env.port}`);
      if (loggerEnabled) {
        void writeApiLog('INFO', `API server started on port ${env.port}`);
      }
    });
  } catch (error) {
    console.error('Failed to start API', error);
    process.exit(1);
  }
}

async function stop(signal) {
  if (stopping) return;
  stopping = true;

  console.log(`${signal} received. Shutting down API.`);

  if (!server) {
    await disconnectDb();
    process.exit(0);
  }

  server.close(async () => {
    await disconnectDb();
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Forced API shutdown after timeout.');
    process.exit(1);
  }, 10000).unref();
}

process.on('SIGINT', () => void stop('SIGINT'));
process.on('SIGTERM', () => void stop('SIGTERM'));

start();
