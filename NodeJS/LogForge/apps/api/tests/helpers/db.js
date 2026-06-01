const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

async function connectTestDb() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
}

async function cleanupTestDb() {
  await mongoose.connection.dropDatabase();
}

async function disconnectTestDb() {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
}

module.exports = {
  connectTestDb,
  cleanupTestDb,
  disconnectTestDb
};